module.exports.abs = function () {
    var Absolute = require('./../functions/numeric/Absolute.js');
    if (this._checkNegatedAttribute) {
        return this._checkNegatedAttribute(new Absolute(this));
    }
    return new Absolute(this);
};

module.exports.ceil = function (attr) {
    var Ceil = require('./../functions/numeric/Ceil.js');
    if (this._checkNegatedAttribute) {
        return this._checkNegatedAttribute(new Ceil(this));
    }
    return new Ceil(this);
};

module.exports.floor = function (attr) {
    var Floor = require('./../functions/numeric/Floor.js');
    if (this._checkNegatedAttribute) {
        return this._checkNegatedAttribute(new Ceil(this));
    }
    return new Floor(this);
};

module.exports.cos = function (attr) {
    var Cos = require('./../functions/numeric/Cosine.js');
    if (this._checkNegatedAttribute) {
        return this._checkNegatedAttribute(new Cos(this));
    }
    return new Cos(this);
};

module.exports.div = function (attr) {
    var Division = require('./../functions/numeric/Division.js');
    if (this._checkNegatedAttribute) {
        return this._checkNegatedAttribute(new Division(this, attr));
    }
    return new Division(this, attr);
};


module.exports.exp = function () {
    var Exp = require('./../functions/numeric/Exponential.js');
    if (this._checkNegatedAttribute) {
        return this._checkNegatedAttribute(new Exp(this));
    }
    return new Exp(this);
};


module.exports.minus = function (attr) {
    var Minus = require('./../functions/numeric/Minus.js');
    if (this._checkNegatedAttribute) {
        return this._checkNegatedAttribute(new Minus(this, attr));
    }
    return new Minus(this, attr);
};


module.exports.mod = function (attr) {
    var Modulo = require('./../functions/numeric/Modulo.js');
    if (this._checkNegatedAttribute) {
        return this._checkNegatedAttribute(new Modulo(this, attr));
    }
    return new Modulo(this, attr);
};


module.exports.times = function (attr) {
    var Multiplication = require('./../functions/numeric/Multiplication.js');
    if (this._checkNegatedAttribute) {
        return this._checkNegatedAttribute(new Multiplication(this, attr));
    }
    return new Multiplication(this, attr);
};


module.exports.plus = function (attr) {
    var Plus = require('./../functions/numeric/Plus.js');
    if (this._checkNegatedAttribute) {
        return this._checkNegatedAttribute(new Plus(this, attr));
    }
    return new Plus(this, attr);
};


module.exports.pow = function (attr) {
    var Pow = require('./../functions/numeric/Power.js');
    if (this._checkNegatedAttribute) {
        return this._checkNegatedAttribute(new Pow(this, attr));
    }
    return new Pow(this, attr);
};


module.exports.round = function () {
    var Round = require('./../functions/numeric/Round.js');
    if (this._checkNegatedAttribute) {
        return this._checkNegatedAttribute(new Round(this));
    }
    return new Round(this);
};


module.exports.sin = function () {
    var Sin = require('./../functions/numeric/Sine.js');
    if (this._checkNegatedAttribute) {
        return this._checkNegatedAttribute(new Sin(this));
    }
    return new Sin(this);
};


module.exports.sqrt = function () {
    var Sqrt = require('./../functions/numeric/SquareRoot.js');
    if (this._checkNegatedAttribute) {
        return this._checkNegatedAttribute(new Sqrt(this));
    }
    return new Sqrt(this);
};


module.exports.tan = function () {
    var Tan = require('./../functions/numeric/Tangent.js');
    if (this._checkNegatedAttribute) {
        return this._checkNegatedAttribute(new Tan(this));
    }
    return new Tan(this);
};


