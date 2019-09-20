'use strict';
const policies = require('./policies.json');

module.exports = policies;
module.exports.count = policies.length;
module.exports.featured = () => policies.slice(0, 3);
