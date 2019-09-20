import test from 'ava';
import yangPolicies from '.';

test('Valid JSON', t => {
	t.is(typeof yangPolicies, 'object');
	console.log(yangPolicies)
});

test('.featured()', t => {
	const featuredPolicies = yangPolicies.featured();
	t.is(featuredPolicies.length, 3);
	t.is(featuredPolicies[0].title, 'The Freedom Dividend');
	t.is(featuredPolicies[1].title, 'Medicare for All');
	t.is(featuredPolicies[2].title, 'Human-Centered Capitalism');
});
