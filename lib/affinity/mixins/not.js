/**
 * @class Mixins.Negatable
 */

/**
 * @member Mixins.Negatable
 */
module.exports.not = function (attr) {

    this._negated = true;
    return this;

};