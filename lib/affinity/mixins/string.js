

module.exports.length = function () {
    var Length = require('./../functions/string/Length.js');
    if (this._checkNegatedAttribute) {
        return this._checkNegatedAttribute(new Length(this));
    }
    return new Length(this);
};

module.exports.lowercase = function () {
    var Lowercase = require('./../functions/string/Lowercase.js');
    if (this._checkNegatedAttribute) {
        return this._checkNegatedAttribute(new Lowercase(this));
    }
    return new Lowercase(this);
};

module.exports.test = function (regex) {
    var Test = require('./../functions/string/Test.js');
    if (this._checkNegatedAttribute) {
        return this._checkNegatedAttribute(new Test(this, regex));
    }
    return new Test(this, regex);
};

module.exports.substr = function (index, len) {
    var Substring = require('./../functions/string/Substring.js');
    if (this._checkNegatedAttribute) {
        return this._checkNegatedAttribute(new Substring(this, index, len));
    }
    return new Substring(this, index, len);
};

module.exports.uppercase = function () {
    var Uppercase = require('./../functions/string/Uppercase.js');
    if (this._checkNegatedAttribute) {
        return this._checkNegatedAttribute(new Uppercase(this));
    }
    return new Uppercase(this);
};