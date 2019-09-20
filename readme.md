# yang-2020-policies [![Build Status](https://travis-ci.com/brh55/yang-2020-policies.svg?branch=master)](https://travis-ci.com/brh55/yang-2020-policies) [![codecov](https://codecov.io/gh/brh55/yang-2020-policies/badge.svg?branch=master)](https://codecov.io/gh/brh55/yang-2020-policies?branch=master) ![Yang Gang Badge](https://img.shields.io/badge/-Yang%20Gang-blue)

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

Returns `JSON` list of all policies

### yangPolicies.count

Returns number of Andrew Yang's policies

### yangPolicies.featured()

Returns Andrew Yang's 3 big policies

## Contribute
Open to PR's to improve the JSON formatting, code quality, and anything else to help the overall Yang Gang.

## License
The use of this module falls under MIT, use it to build and progress the Yang Gang. 
Actual policy usages belongs to yang2020.com.

