/**
 * @class Mixins.Comparable
 */


/**
 * @member Mixins.Comparable
 */
module.exports.equals = function (attr) {

    var Equal = require('./../functions/comparable/Equal.js');

    if (this._checkNegatedAttribute) {
        return this._checkNegatedAttribute(new Equal(this, attr));
    }

    return new Equal(this, attr);

};

/**
 * @member Mixins.Comparable
 */
module.exports.eq = function(attr){
    return module.exports.equals.call(this, attr);
};