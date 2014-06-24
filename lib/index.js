/**
 * @module affinity
 */
module.exports;

/// Defining Types

/**
 * @type {TType}
 */
module.exports.Type = require('./types/Type.js');

/**
 * @type {Set}
 */
module.exports.Set = require('./Set.js');

/**
 * @type {Relation}
 */
module.exports.Relation = require('./Relation.js');

/**
 * @type {Tuple}
 */
module.exports.Tuple = require('./Tuple.js');

/**
 * @type {Header}
 */
module.exports.Header = require('./Header.js');

/**
 * @type {Attribute}
 */
module.exports.Attribute = require('./Attribute.js');

/**
 * @type {TInteger}
 */
module.exports.Integer = require('./types/Integer');

/**
 * @type {TString}
 */
module.exports.String = require('./types/String');

/**
 * @type {TBoolean}
 */
module.exports.Boolean = require('./types/Boolean');

/**
 * @type {TDate}
 */
module.exports.Date = require('./types/Date');


/// Defining Functions

/**
 * @type {Function}
 */
module.exports.Function = require('./Function.js');

// Connective Functions

/**
 * @type {And}
 */
module.exports.And = require('./functions/operator/And.js');

/**
 * @type {Or}
 */
module.exports.Or = require('./functions/operator/Or.js');

/**
 * @type {Not}
 */
module.exports.Not = require('./functions/operator/Not.js');

// Comparatives Functions

/**
 * @type {FEqual}
 */
module.exports.Equal = require('./functions/comparable/Equal.js');

module.exports.eq = function(attr1, attr2){
    return new module.exports.Equal(attr1, attr2);
};

// Numeric Functions

/**
 * @type {FAbsolute}
 */
module.exports.Absolute = require('./functions/numeric/Absolute.js');

/**
 * @type {FCeil}
 */
module.exports.Ceil = require('./functions/numeric/Ceil.js');

/**
 * @type {FCos}
 */
module.exports.Cos = require('./functions/numeric/Cos.js');

/**
 * @type {FDivision}
 */
module.exports.Division = require('./functions/numeric/Division.js');

/**
 * @type {FExp}
 */
module.exports.Exp = require('./functions/numeric/Exp.js');

/**
 * @type {FMinus}
 */
module.exports.Minus = require('./functions/numeric/Minus.js');

/**
 * @type {FModulo}
 */
module.exports.Modulo = require('./functions/numeric/Modulo.js');

/**
 * @type {FMultiplication}
 */
module.exports.Multiplication = require('./functions/numeric/Multiplication.js');

/**
 * @type {FPlus}
 */
module.exports.Plus = require('./functions/numeric/Plus.js');

/**
 * @type {FPow}
 */
module.exports.Pow = require('./functions/numeric/Pow.js');

/**
 * @type {FRound}
 */
module.exports.Round = require('./functions/numeric/Round.js');

/**
 * @type {FSin}
 */
module.exports.Sin = require('./functions/numeric/Sin.js');

/**
 * @type {FSquareRoot}
 */
module.exports.Sqrt = require('./functions/numeric/Sqrt.js');

/**
 * @type {FTan}
 */
module.exports.Tan = require('./functions/numeric/Tan.js');

/**
 * @param attr
 * @returns {Absolute}
 */
module.exports.abs = function(attr){
    return new module.exports.Absolute(attr);
};

/**
 * @param attr
 * @returns {Ceil}
 */
module.exports.ceil = function(attr){
    return new module.exports.Ceil(attr);
};

/**
 * @param attr
 * @returns {Cos}
 */
module.exports.cos = function(attr){
    return new module.exports.Cos(attr);
};

/**
 * @param attr1
 * @param attr2
 * @returns {Division}
 */
module.exports.div = function(attr1, attr2){
    return new module.exports.Division(attr1, attr2);
};

/**
 * @param attr
 * @returns {Exp}
 */
module.exports.exp = function(attr){
    return new module.exports.Exp(attr);
};

/**
 * @param attr1
 * @param attr2
 * @returns {Minus}
 */
module.exports.minus = function(attr1, attr2){
    return new module.exports.Minus(attr1, attr2);
};

/**
 * @param attr1
 * @param attr2
 * @returns {Modulo}
 */
module.exports.mod = function(attr1, attr2){
    return new module.exports.Modulo(attr1, attr2);
};

/**
 * @param attr1
 * @param attr2
 * @returns {Multiplication}
 */
module.exports.times = function(attr1, attr2){
    return new module.exports.Multiplication(attr1, attr2);
};

/**
 * @param attr1
 * @param attr2
 * @returns {Plus}
 */
module.exports.plus = function(attr1, attr2){
    return new module.exports.Plus(attr1, attr2);
};

/**
 * @param attr1
 * @param attr2
 * @returns {Pow}
 */
module.exports.pow = function(attr1, attr2){
    return new module.exports.Pow(attr1, attr2);
};

/**
 * @param attr
 * @returns {Round}
 */
module.exports.round = function(attr){
    return new module.exports.Round(attr);
};

/**
 * @param attr
 * @returns {Sin}
 */
module.exports.sin = function(attr){
    return new module.exports.Sin(attr);
};

/**
 * @param attr
 * @returns {Sqrt}
 */
module.exports.sqrt = function(attr){
    return new module.exports.Sqrt(attr);
};

/**
 * @param attr
 * @returns {Tan}
 */
module.exports.tan = function(attr){
    return new module.exports.Tan(attr);
};

// String Functions

/**
 * @type {Length}
 */
module.exports.Length = require('./functions/string/Length.js');

/**
 * @type {Length}
 */
module.exports.Lowercase = require('./functions/string/Lowercase.js');

/**
 * @type {Matching}
 */
module.exports.Matching = require('./functions/string/Matching.js');

/**
 * @type {Substring}
 */
module.exports.Substring = require('./functions/string/Substring.js');

/**
 * @type {Uppercase}
 */
module.exports.Uppercase = require('./functions/string/Uppercase.js');

/**
 * @param attr
 * @returns {Length}
 */
module.exports.length = function(attr){
    return new module.exports.Length(attr);
};

/**
 * @param attr
 * @returns {Lowercase}
 */
module.exports.lowercase = function(attr){
    return new module.exports.Lowercase(attr);
};

/**
 * @param attr
 * @param regex
 * @returns {Matching}
 */
module.exports.matching = function(attr, regex){
    return new module.exports.Matching(attr, regex);
};

/**
 * @param attr
 * @param start
 * @param length
 * @returns {Length}
 */
module.exports.substr = function(attr, start, length){
    return new module.exports.Length(attr, start, length);
};

/**
 * @param attr
 * @returns {Length}
 */
module.exports.uppercase = function(attr){
    return new module.exports.Length(attr);
};

// Tuple functions

/**
 * @type {TupleAttribute}
 */
module.exports.TupleValue = require('./functions/tuple/Attribute.js');

/**
 * @param relation
 * @param attributeName
 * @returns {TupleValue}
 */
module.exports.value = function(relation, attributeName){
    var result = new module.exports.TupleValue(attributeName);
    result.type(relation.header().get(attributeName));
    return result;
};


/// Defining relational operators

/**
 * @type {RCompose}
 */
module.exports.Compose = require('./algebra/Compose.js');

/**
 * @type {RDifference}
 */
module.exports.Difference = require('./algebra/Difference.js');

/**
 * @type {RExtend}
 */
module.exports.Extend = require('./algebra/Extend.js');

/**
 * @type {RGroup}
 */
module.exports.Group = require('./algebra/Group.js');

/**
 * @type {RIntersection}
 */
module.exports.Intersection = require('./algebra/Intersection.js');

/**
 * @type {RJoin}
 */
module.exports.Join = require('./algebra/Join.js');

/**
 * @type {RProduct}
 */
module.exports.Product = require('./algebra/Product.js');

/**
 * @type {RProjection}
 */
module.exports.Projection = require('./algebra/Projection.js');

/**
 * @type {RRename}
 */
module.exports.Rename = require('./algebra/Rename.js');

/**
 * @type {RRestriction}
 */
module.exports.Restriction = require('./algebra/Restriction.js');

/**
 * @type {RSemiDifference}
 */
module.exports.SemiDifference = require('./algebra/SemiDifference.js');

/**
 * @type {RSemiJoin}
 */
module.exports.SemiJoin = require('./algebra/SemiJoin.js');

/**
 * @type {RUngroup}
 */
module.exports.Ungroup = require('./algebra/Ungroup.js');

/**
 * @type {RUnion}
 */
module.exports.Union = require('./algebra/Union.js');

/**
 * @type {RUnwrap}
 */
module.exports.Unwrap = require('./algebra/Unwrap.js');

/**
 * @type {RWrap}
 */
module.exports.Unwrap = require('./algebra/Wrap.js');


/// Defining constants

/**
 * @type {Relation}
 */
module.exports.TABLE_DUM = new module.exports.Relation([]);

/**
 * @type {Relation}
 */
module.exports.TABLE_DEE = new module.exports.Relation([], [
    []
]);

