/**
 * @module affinity
 */


/// Defining Types

module.exports.Type = require('./types/Type.js');

module.exports.Set = require('./Set.js');

module.exports.Relation = require('./Relation.js');

module.exports.Tuple = require('./Tuple.js');

module.exports.Header = require('./Header.js');

module.exports.Attribute = require('./Attribute.js');

module.exports.Integer = require('./types/Integer');

module.exports.String = require('./types/String');

module.exports.Boolean = require('./types/Boolean');


/// Defining Functions

module.exports.Function = require('./Function.js');

// Connective Functions

module.exports.And = require('./functions/operator/And.js');
module.exports.Or = require('./functions/operator/Or.js');
module.exports.Not = require('./functions/operator/Not.js');

// Comparatives Functions

module.exports.Equal = require('./functions/comparable/Equal.js');

module.exports.eq = function(attr1, attr2){
    return new module.exports.Equal(attr1, attr2);
};

// Numeric Functions

module.exports.Absolute = require('./functions/numeric/Absolute.js');
module.exports.Ceil = require('./functions/numeric/Ceil.js');
module.exports.Cos = require('./functions/numeric/Cos.js');
module.exports.Division = require('./functions/numeric/Division.js');
module.exports.Exp = require('./functions/numeric/Exp.js');
module.exports.Minus = require('./functions/numeric/Minus.js');
module.exports.Modulo = require('./functions/numeric/Modulo.js');
module.exports.Multiplication = require('./functions/numeric/Multiplication.js');
module.exports.Plus = require('./functions/numeric/Plus.js');
module.exports.Pow = require('./functions/numeric/Pow.js');
module.exports.Round = require('./functions/numeric/Round.js');
module.exports.Sin = require('./functions/numeric/Sin.js');
module.exports.Sqrt = require('./functions/numeric/Sqrt.js');
module.exports.Tan = require('./functions/numeric/Tan.js');

module.exports.abs = function(attr){
    return new module.exports.Absolute(attr);
};

module.exports.ceil = function(attr){
    return new module.exports.Ceil(attr);
};

module.exports.cos = function(attr){
    return new module.exports.Cos(attr);
};

module.exports.div = function(attr1, attr2){
    return new module.exports.Division(attr1, attr2);
};

module.exports.exp = function(attr){
    return new module.exports.Exp(attr);
};

module.exports.minus = function(attr1, attr2){
    return new module.exports.Minus(attr1, attr2);
};

module.exports.mod = function(attr1, attr2){
    return new module.exports.Modulo(attr1, attr2);
};

module.exports.times = function(attr1, attr2){
    return new module.exports.Multiplication(attr1, attr2);
};

module.exports.plus = function(attr1, attr2){
    return new module.exports.Plus(attr1, attr2);
};

module.exports.pow = function(attr1, attr2){
    return new module.exports.Pow(attr1, attr2);
};

module.exports.round = function(attr){
    return new module.exports.Round(attr);
};

module.exports.sin = function(attr){
    return new module.exports.Sin(attr);
};

module.exports.sqrt = function(attr){
    return new module.exports.Sqrt(attr);
};

module.exports.tan = function(attr){
    return new module.exports.Tan(attr);
};

// String Functions

module.exports.Length = require('./functions/string/Length.js');
module.exports.Lowercase = require('./functions/string/Lowercase.js');
module.exports.Matching = require('./functions/string/Matching.js');
module.exports.Substring = require('./functions/string/Substring.js');
module.exports.Uppercase = require('./functions/string/Uppercase.js');

module.exports.length = function(attr){
    return new module.exports.Length(attr);
};

module.exports.lowercase = function(attr){
    return new module.exports.Lowercase(attr);
};

module.exports.matching = function(attr, regex){
    return new module.exports.Matching(attr, regex);
};

module.exports.substr = function(attr, start, length){
    return new module.exports.Length(attr, start, length);
};

module.exports.uppercase = function(attr){
    return new module.exports.Length(attr);
};

// Tuple functions

module.exports.TupleValue = require('./functions/tuple/Attribute.js');

module.exports.value = function(relation, attributeName){
    var result = new module.exports.TupleValue(attributeName);
    result.type(relation.header().get(attributeName));
    return result;
};


/// Defining relational operators

module.exports.Compose = require('./algebra/Compose.js');
module.exports.Difference = require('./algebra/Difference.js');
module.exports.Extend = require('./algebra/Extend.js');
module.exports.Group = require('./algebra/Group.js');
module.exports.Intersection = require('./algebra/Intersection.js');
module.exports.Join = require('./algebra/Join.js');
module.exports.Product = require('./algebra/Product.js');
module.exports.Projection = require('./algebra/Projection.js');
module.exports.Rename = require('./algebra/Rename.js');
module.exports.Restriction = require('./algebra/Restriction.js');
module.exports.SemiDifference = require('./algebra/SemiDifference.js');
module.exports.SemiJoin = require('./algebra/SemiJoin.js');
module.exports.Ungroup = require('./algebra/Ungroup.js');
module.exports.Union = require('./algebra/Union.js');
module.exports.Unwrap = require('./algebra/Unwrap.js');
module.exports.Unwrap = require('./algebra/Wrap.js');


/// Defining constants

module.exports.TABLE_DUM = new module.exports.Relation([]);
module.exports.TABLE_DEE = new module.exports.Relation([], [
    []
]);

