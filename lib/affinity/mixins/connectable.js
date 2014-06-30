/**
 * @class Mixins.Chainable
 */

/**
 * @member Mixins.Chainable
 */
module.exports.and = function (param) {

    var And = require('./../functions/connective/And.js');

    if (this._checkNegatedAttribute) {
        return this._checkNegatedAttribute(new And(this, param));
    }

    return new And(this, param);

};

/**
 * @member Mixins.Chainable
 */
module.exports.or = function () {

    var Or = require('./../functions/connective/Or.js');

    if (this._checkNegatedAttribute) {
        return this._checkNegatedAttribute(new Or(this));
    }

    return new Or(this);

};