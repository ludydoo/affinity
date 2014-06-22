var affinity = {};


/// Defining Types

affinity.Type = require('./types/Type.js');

affinity.Set = require('./Set.js');
affinity.Relation = require('./Relation.js');
affinity.Tuple = require('./Tuple.js');
affinity.Header = require('./Header.js');
affinity.Attribute = require('./Attribute.js');

affinity.Integer = require('./types/Integer');
affinity.String = require('./types/String');
affinity.Boolean = require('./types/Boolean');


/// Defining Functions

affinity.Function = require('./Function.js');

// Connective Functions

affinity.And = require('./functions/operator/And.js');
affinity.Or = require('./functions/operator/Or.js');
affinity.Not = require('./functions/operator/Not.js');

// Comparatives Functions

affinity.Equal = require('./functions/comparable/Equal.js');

// Numeric Functions

affinity.Absolute = require('./functions/numeric/Absolute.js');
affinity.Ceil = require('./functions/numeric/Ceil.js');
affinity.Cos = require('./functions/numeric/Cos.js');
affinity.Division = require('./functions/numeric/Division.js');
affinity.Exp = require('./functions/numeric/Exp.js');
affinity.Minus = require('./functions/numeric/Minus.js');
affinity.Modulo = require('./functions/numeric/Modulo.js');
affinity.Multiplication = require('./functions/numeric/Multiplication.js');
affinity.Plus = require('./functions/numeric/Plus.js');
affinity.Pow = require('./functions/numeric/Pow.js');
affinity.Round = require('./functions/numeric/Round.js');
affinity.Sin = require('./functions/numeric/Sin.js');
affinity.Sqrt = require('./functions/numeric/Sqrt.js');
affinity.Tan = require('./functions/numeric/Tan.js');

affinity.abs = function(attr){
    return new affinity.Absolute(attr);
};

affinity.ceil = function(attr){
    return new affinity.Ceil(attr);
};

affinity.cos = function(attr){
    return new affinity.Cos(attr);
};

affinity.div = function(attr1, attr2){
    return new affinity.Division(attr1, attr2);
};

affinity.exp = function(attr){
    return new affinity.Exp(attr);
};

affinity.minus = function(attr1, attr2){
    return new affinity.Minus(attr1, attr2);
};

affinity.mod = function(attr1, attr2){
    return new affinity.Modulo(attr1, attr2);
};

affinity.times = function(attr1, attr2){
    return new affinity.Multiplication(attr1, attr2);
};

affinity.plus = function(attr1, attr2){
    return new affinity.Plus(attr1, attr2);
};

affinity.pow = function(attr1, attr2){
    return new affinity.Pow(attr1, attr2);
};

affinity.round = function(attr){
    return new affinity.Round(attr);
};

affinity.sin = function(attr){
    return new affinity.Sin(attr);
};

affinity.sqrt = function(attr){
    return new affinity.Sqrt(attr);
};

affinity.tan = function(attr){
    return new affinity.Tan(attr);
};

// String Functions

affinity.Length = require('./functions/string/Length.js');
affinity.Lowercase = require('./functions/string/Lowercase.js');
affinity.Matching = require('./functions/string/Matching.js');
affinity.Substring = require('./functions/string/Substring.js');
affinity.Uppercase = require('./functions/string/Uppercase.js');

affinity.length = function(attr){
    return new affinity.Length(attr);
};

affinity.lowercase = function(attr){
    return new affinity.Lowercase(attr);
};

affinity.matching = function(attr, regex){
    return new affinity.Matching(attr, regex);
};

affinity.substr = function(attr, start, length){
    return new affinity.Length(attr, start, length);
};

affinity.uppercase = function(attr){
    return new affinity.Length(attr);
};


/// Defining relational operators

affinity.Compose = require('./algebra/Compose.js');
affinity.Difference = require('./algebra/Difference.js');
affinity.Extend = require('./algebra/Extend.js');
affinity.Group = require('./algebra/Group.js');
affinity.Intersection = require('./algebra/Intersection.js');
affinity.Join = require('./algebra/Join.js');
affinity.Product = require('./algebra/Product.js');
affinity.Projection = require('./algebra/Projection.js');
affinity.Rename = require('./algebra/Rename.js');
affinity.Restriction = require('./algebra/Restriction.js');
affinity.SemiDifference = require('./algebra/SemiDifference.js');
affinity.SemiJoin = require('./algebra/SemiJoin.js');
affinity.Ungroup = require('./algebra/Ungroup.js');
affinity.Union = require('./algebra/Union.js');
affinity.Unwrap = require('./algebra/Unwrap.js');
affinity.Unwrap = require('./algebra/Wrap.js');


/// Defining constants

affinity.TABLE_DUM = new affinity.Relation([]);
affinity.TABLE_DEE = new affinity.Relation([], [
    []
]);

module.exports = affinity;