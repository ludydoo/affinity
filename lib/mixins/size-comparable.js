var GreaterThan = require('./../functions/comparable/LargerThan.js');
var GreaterThanEqual = require('./../functions/comparable/LargerThanEqual.js');
var SmallerThan = require('./../functions/comparable/SmallerThan.js');
var SmallerThanEqual = require('./../functions/comparable/SmallerThanEqual.js');

module.exports.gt = function (attr) {
    return new GreaterThan(this, attr);
};

module.exports.gte = function (attr) {
    return new GreaterThanEqual(this, attr);
};

module.exports.st = function (attr) {
    return new SmallerThan(this, attr);
};

module.exports.ste = function (attr) {
    return new SmallerThanEqual(this, attr);
};