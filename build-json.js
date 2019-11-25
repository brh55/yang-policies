const fs = require('fs');
const rp = require('request-promise-native');
const cheerio = require('cheerio');
const uniq = require('lodash.uniq');
const ora = require('ora');
const chalk = require('chalk');

const cleanBreaks = text => {
	return text.replace(/\s?\n\s?$|^\s?\n\s?/g, '').replace(/\s?\n\s+/g, '\n\n ').replace(/\n+$/g, '');
};

const format = text => cleanBreaks(text.trim());

const parsePolicy = (policyPage, url) => {
	const html = policyPage;
	const $ = cheerio.load(html);
	const title = $('.entry-title').text();
	const description = $('.brief').text();
	const problemsToBeSolved = $('.problems-to-be-solved .grid .column li').map((i, el) => $(el).text()).get();
	const goals = $('.goals li').map((i, el) => $(el).text()).get();
	const mainQuote = $('blockquote').text();
	const asPresident = $('.as-president').text();
	const excerpt = $('.excerpt p').map((i, el) => {
		if ($(el).find('cite').length > 0) {
			return null;
		}

		return $(el).text();
	}).get().join('');
	// Exception, format here

	const citations = $('.excerpt p').map((i, el) => ({
		author: format($(el).find('cite').text().replace(':', '')),
		quote: format($(el).find('q').text())
	})).get().filter(citation => citation.author && citation.quote);

	/* eslint-disable camelcase */
	const policy = {
		title,
		url,
		description,
		problems_to_be_solved: problemsToBeSolved,
		main_quote: mainQuote || null,
		goals: goals || null,
		as_president: asPresident || null,
		excerpt: excerpt || null,
		citations: citations || null
	};
	/* eslint-enable */

	Object.keys(policy).forEach(key => {
		const value = policy[key];
		if (typeof value === 'string') {
			policy[key] = format(value);
		}

		// Arrays of Keys
		if (['goals', 'problems_to_be_solved'].indexOf(key) > -1) {
			policy[key] = value.map(format);
		}
	});

	return policy;
};

const getPolicyOrder = policies => Object.fromEntries(policies.map((p, i) => [p.title, i]));
const getPolicyMap = policies => Object.fromEntries(policies.map(p => [p.title, p]));

const mergePolicies = (newPolicies, oldPolicies) => {
	const titleToPolicy = {
		...getPolicyMap(newPolicies),
		// Newer policies get higher ordering priority
		...getPolicyMap(oldPolicies)
	};

	const newPolicyOrder = getPolicyOrder(newPolicies);
	const oldPolicyOrder = getPolicyOrder(oldPolicies);
	const titleToOrder = {
		...newPolicyOrder,
		// Older policies get higher ordering priority
		...oldPolicyOrder
	};

	const orderTitles = (t1, t2) => {
		const t2Old = t2 in oldPolicyOrder;
		switch (t1 in oldPolicyOrder) {
			case true:
				switch (t2Old) {
					case true:
						// Both policies are old, so use previous order
						return oldPolicyOrder[t1] - oldPolicyOrder[t2];
					/* First title was previously parsed,
					   and the second title was not,
					   then the first title should go first
					*/
					default:
						return -1;
				}

			default:
				switch (t2Old) {
					case true:
						/* Second was previously parsed,
						   and first was not,
						   so second goes first
						*/
						return 1;
					default:
						// Sort by ordering from this parse
						return newPolicyOrder[t1] - newPolicyOrder[t2];
				}
		}
	};

	return Object.keys(titleToOrder).sort(orderTitles).map(title => titleToPolicy[title]);
};

const main = async () => {
	const spinner = ora('Fetching Policies').start();
	spinner.color = 'magenta';

	const BASE_URL = 'https://www.yang2020.com';
	const POLICY_MAIN_URL = `${BASE_URL}/policies`;
	try {
		const oldPolicies = JSON.parse(fs.readFileSync('policies.json'));
		const mainPolicyPage = await rp(POLICY_MAIN_URL);
		const $ = cheerio.load(mainPolicyPage);
		const getPolicyLink = (i, el) => $(el).attr('href');
		const featuredPolicies = $('.featured-policies a').map(getPolicyLink).get().map(relativeLink => `${BASE_URL}${relativeLink}`);
		const otherPolicies = $('.policies a').map(getPolicyLink).get();
		const policyLinks = uniq([...featuredPolicies, ...otherPolicies]);
		spinner.succeed(`Found Andrew Yang's ${policyLinks.length} Policies`);

		spinner.start(`Fetching Andrew Yang's ${policyLinks.length} Policies`);
		const fetchPoliciesPromise = policyLinks.map(rp);
		const policyPages = await Promise.all(fetchPoliciesPromise);
		spinner.succeed(`Loaded ${policyLinks.length} Pages`);

		spinner.start(`Parsing Andrew Yang's ${policyLinks.length} Policies`);
		const policies = policyPages.map((html, index) => {
			return parsePolicy(html, policyLinks[index]);
		});
		const orderPreservedPolicies = mergePolicies(policies, oldPolicies);
		fs.writeFileSync('policies.json', JSON.stringify(orderPreservedPolicies, null, 2));
		spinner.succeed(`${orderPreservedPolicies.length} Andrew Yang's Policies Saved in /policies.json`);
		console.log(chalk.green('Commit the latest policies.json file, and publish on npm'));
	} catch (error) {
		console.error(error);
	}
};

main();
