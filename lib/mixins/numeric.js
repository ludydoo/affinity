var Absolute = require('./../functions/numeric/Absolute.js');
var Ceil = require('./../functions/numeric/Ceil.js');
var Cos = require('./../functions/numeric/Cos.js');
var Division = require('./../functions/numeric/Division.js');
var Exp = require('./../functions/numeric/Exp.js');
var Minus = require('./../functions/numeric/Minus.js');
var Modulo = require('./../functions/numeric/Modulo.js');
var Multiplication = require('./../functions/numeric/Multiplication.js');
var Plus = require('./../functions/numeric/Plus.js');
var Pow = require('./../functions/numeric/Pow.js');
var Round = require('./../functions/numeric/Round.js');
var Sin = require('./../functions/numeric/Sin.js');
var Sqrt = require('./../functions/numeric/Sqrt.js');
var Tan = require('./../functions/numeric/Tan.js');

module.exports.abs = function (attr) {
    return new Absolute(attr);
};

module.exports.ceil = function (attr) {
    return new Ceil(attr);
};

module.exports.cos = function(attr){
    return new Cos(attr);
};

module.exports.div = function(attr){
    return new Division(this, attr);
};


module.exports.exp = function(attr){
    return new Exp(attr);
};


module.exports.minus = function(attr){
    return new Minus(this, attr);
};


module.exports.mod = function(attr){
    return new Modulo(this, attr);
};


module.exports.times = function(attr){
    return new Multiplication(this, attr);
};


module.exports.plus = function(attr){
    return new Plus(this, attr);
};


module.exports.pow = function(attr){
    return new Pow(this, attr);
};


module.exports.round = function(attr){
    return new Round(attr);
};


module.exports.sin = function(attr){
    return new Sin(attr);
};


module.exports.sqrt = function(attr){
    return new Sqrt(attr);
};


module.exports.tan = function(attr){
    return new Tan(attr);
};


