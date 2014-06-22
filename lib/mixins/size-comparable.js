module.exports.gt = function (attr) {
    var GreaterThan = require('./../functions/comparable/LargerThan.js');
    return new GreaterThan(this, attr);
};

module.exports.gte = function (attr) {
    var GreaterThanEqual = require('./../functions/comparable/LargerThanEqual.js');
    return new GreaterThanEqual(this, attr);
};

module.exports.st = function (attr) {
    var SmallerThan = require('./../functions/comparable/SmallerThan.js');
    return new SmallerThan(this, attr);
};

module.exports.ste = function (attr) {
    var SmallerThanEqual = require('./../functions/comparable/SmallerThanEqual.js');
    return new SmallerThanEqual(this, attr);
};