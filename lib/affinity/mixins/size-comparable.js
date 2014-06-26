/**
 * @class Mixins.SizeComparable
 */

/**
 * @member Mixins.SizeComparable
 */
module.exports.gt = function (attr) {
    var GreaterThan = require('./../functions/comparable/LargerThan.js');
    return new GreaterThan(this, attr);
};

/**
 * @member Mixins.SizeComparable
 */
module.exports.gte = function (attr) {
    var GreaterThanEqual = require('./../functions/comparable/LargerThanEqual.js');
    return new GreaterThanEqual(this, attr);
};

/**
 * @member Mixins.SizeComparable
 */
module.exports.st = function (attr) {
    var SmallerThan = require('./../functions/comparable/SmallerThan.js');
    return new SmallerThan(this, attr);
};

/**
 * @member Mixins.SizeComparable
 */
module.exports.ste = function (attr) {
    var SmallerThanEqual = require('./../functions/comparable/SmallerThanEqual.js');
    return new SmallerThanEqual(this, attr);
};