# Yang 2020 Policies [![Build Status](https://travis-ci.com/brh55/yang-2020-policies.svg?branch=master)](https://travis-ci.com/brh55/yang-2020-policies) [![codecov](https://codecov.io/gh/brh55/yang-2020-policies/badge.svg?branch=master)](https://codecov.io/gh/brh55/yang-2020-policies?branch=master) ![Yang Gang Badge](https://img.shields.io/badge/-Yang%20Gang-blue)

> A consumable JSON list of Andrew Yang's 2020 policies found on [yang2020.com](https://www.yang2020.com/policies/)

Given the tremendous amount of policies around Andrew Yang's campaigin, I couldn't manage to find any API's providing this information. So I built this JSON list which crawls and scrapes yang2020.com to create an updated JSON consumable list of Andrew Yang's policies for any potential software projects.

## Install

```
$ npm install yang-2020-policies
```

## Usage

```js
const yangPolicies = require('yang-2020-policies');

yangPolicies[0] // First Policy is The Freedom Dividend
```

## API

### yangPolicies

*Returns* `JSON` list of all policies

### yangPolicies.count

*Returns* number of Andrew Yang's policies

### yangPolicies.featured()

*Returns* Andrew Yang's 3 big policies

## Policy Object

| Key                   | Type      | Description                                         | Example                                                      |
| --------------------- | --------- | --------------------------------------------------- | ------------------------------------------------------------ |
| title                 | *string*  | Title of the policy                                 | The Freedom Dividend                                         |
| url                   | *string*  | Url to the policy page                              | https://www.yang2020.com/policies/the-freedom-dividend/      |
| description           | *string*  | Description of policy                               | Andrew would implement the Freedom Dividend, a universal basic income of $1,000/month,... |
| problems_to_be_solved | *array*   | A list of problems to be solved by policy           | [ "Approx. 40 million Americans live below the poverty line.", "       "It is necessary to support and preserve a robust consumer economy."] |
| goals                 | *array*   | Goals to accomplish by policy                       | ["End poverty in the most direct manner possible: giving people money",  "Allow people the freedom to switch jobs, move, innovate, and contribute to society"] |
| as_president          | *string * | Andrew Yang's as president message regarding policy | "As President, I will…\n\n Implement the Freedom Dividend, providing Universal Basic Income of $1,000/month to all American adults over the age of 18 so that we may all share in the prosperity we have contributed to and participate in the new economy."" |
| citations             | *array*   | A list of additional citations                      | [{}]                                                         |
| citations[0].author   | *string*  | Author of Citation                                  | Thomas Paine, 1796                                           |
| citations[0].quote    | *string*  | Quote of citation                                   | "Out of a collected fund from landowners, “there shall be paid to every person…"..." |
| excerpt               | *string*  | Excerpt regarding policy                            | "Universal Basic Income, or UBI, is a version of Social Security where all citizens..." |

*Note, some fields are null or empty if not available.*

**Policy Example**:

```json
 {
    "title": "Promote Vocational Education",
    "url": "https://www.yang2020.com/policies/promoting-vocational-education/",
    "description": "It seems we’re preparing our children for college earlier and earlier. College readiness is a driving force behind many educational decisions in this country. This has resulted in only 6% of American high school students being enrolled in a vocational program (in 2013), whereas comparable European nations have numbers closer to 50%.\nFor those that do start college, graduating isn’t a sure thing. 6 years after first enrolling, fewer than 60% of students have attained a degree. If you look at only open-admissions schools, the number drops to 32%. That represents a huge investment of money and time on the part of Americans that doesn’t lead them to a positive outcome.\nOn the other side, the underemployment rate for recent college grads is approaching 44%, and one-third end up in jobs that don’t require the degree they earned.\n\n College is being over-prescribed in this country. Not everyone has an interest in obtaining a college degree, and there are many jobs out there that don’t require it. Georgetown has estimated that there are 30 million good-paying jobs that don’t require a college degree. Most require some type of specialized training.\nAs a country, we need to dramatically increase our investment in vocational training, providing a viable career path for those students who are more interested in starting their careers immediately after high school instead of continuing with an education they don’t want but feel obligated to get.",
    "problems_to_be_solved": [
      "Too many students invest in college when it’s not the right investment for them.",
      "Too few students are aware of alternative career paths, or lack access to training for those paths.",
      "Some feel there is a stigma attached to vocational jobs."
    ],
    "main_quote": "There are tens of millions of jobs that will be with us for decades that don’t require a college degree: machinists, line repair, air-conditioning repair, exterminator, high-end manufacturing, and so on. We need to remove any stigma from vocational education and dramatically increase its visibility and availability. Apprenticeships should be a big part of the future of education for millions of Americans that would give them a runway to a fulfilling livelihood.",
    "goals": [
      "Increase vocational training options in public schools",
      "Counsel students on the right path for them based on their interests and career goals"
    ],
    "as_president": "As President, I will…\n\n Increase funding to vocational programs within public schools.\nDirect the Dept. of Education to provide materials to all public schools about career paths that don’t require a college degree.\nPrioritize career paths that students express interest in rather than giving blanket advice that college is the right/only option.\nBegin a public education campaign championing vocational jobs and education, “I Work With My Hands – And It’s Awesome.”",
    "excerpt": null,
    "citations": []
}
```

## Contribute

Open to PR's to improve the JSON formatting, code quality, and anything else to help the overall Yang Gang.

## License
The use of this module falls under MIT, use it to build and progress the Yang Gang. 

If it isn't apparent, actual policy content belongs to [yang2020.com](https://www.yang2020.com/).
