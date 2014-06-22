module.exports.abs = function () {
    var Absolute = require('./../functions/numeric/Absolute.js');
    if (this.checkNegate) {
        return this.checkNegate(new Absolute(this));
    }
    return new Absolute(this);
};

module.exports.ceil = function (attr) {
    var Ceil = require('./../functions/numeric/Ceil.js');
    if (this.checkNegate) {
        return this.checkNegate(new Ceil(this));
    }
    return Ceil(this);
};

module.exports.cos = function (attr) {
    var Cos = require('./../functions/numeric/Cos.js');
    if (this.checkNegate) {
        return this.checkNegate(new Cos(this));
    }
    return Cos(this);
};

module.exports.div = function (attr) {
    var Division = require('./../functions/numeric/Division.js');
    if (this.checkNegate) {
        return this.checkNegate(new Division(this, attr));
    }
    return Division(this, attr);
};


module.exports.exp = function () {
    var Exp = require('./../functions/numeric/Exp.js');
    if (this.checkNegate) {
        return this.checkNegate(new Exp(this));
    }
    return Exp(this);
};


module.exports.minus = function (attr) {
    var Minus = require('./../functions/numeric/Minus.js');
    if (this.checkNegate) {
        return this.checkNegate(new Minus(this, attr));
    }
    return Minus(this, attr);
};


module.exports.mod = function (attr) {
    var Modulo = require('./../functions/numeric/Modulo.js');
    if (this.checkNegate) {
        return this.checkNegate(new Modulo(this, attr));
    }
    return Modulo(this, attr);
};


module.exports.times = function (attr) {
    var Multiplication = require('./../functions/numeric/Multiplication.js');
    if (this.checkNegate) {
        return this.checkNegate(new Multiplication(this, attr));
    }
    return Multiplication(this, attr);
};


module.exports.plus = function (attr) {
    var Plus = require('./../functions/numeric/Plus.js');
    if (this.checkNegate) {
        return this.checkNegate(new Plus(this, attr));
    }
    return Plus(this, attr);
};


module.exports.pow = function (attr) {
    var Pow = require('./../functions/numeric/Pow.js');
    if (this.checkNegate) {
        return this.checkNegate(new Pow(this, attr));
    }
    return Pow(this, attr);
};


module.exports.round = function () {
    var Round = require('./../functions/numeric/Round.js');
    if (this.checkNegate) {
        return this.checkNegate(new Round(this));
    }
    return Round(this);
};


module.exports.sin = function () {
    var Sin = require('./../functions/numeric/Sin.js');
    if (this.checkNegate) {
        return this.checkNegate(new Sin(this));
    }
    return Sin(this);
};


module.exports.sqrt = function () {
    var Sqrt = require('./../functions/numeric/Sqrt.js');
    if (this.checkNegate) {
        return this.checkNegate(new Sqrt(this));
    }
    return Sqrt(this);
};


module.exports.tan = function () {
    var Tan = require('./../functions/numeric/Tan.js');
    if (this.checkNegate) {
        return this.checkNegate(new Tan(this));
    }
    return Tan(this);
};


