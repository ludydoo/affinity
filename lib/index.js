/// Defining Types

/**
 * @type {Index}
 */
module.exports.Index = require('./affinity/Index.js');

/**
 * @type {Types.Type}
 */
module.exports.Type = require('./affinity/types/Type.js');

/**
 * @type {Set}
 */
module.exports.Set = require('./affinity/Set.js');

/**
 * @type {Relation}
 */
module.exports.Relation = require('./affinity/Relation.js');

/**
 * @type {Tuple}
 */
module.exports.Tuple = require('./affinity/Tuple.js');

/**
 * @type {Header}
 */
module.exports.Header = require('./affinity/Header.js');

/**
 * @type {Attribute}
 */
module.exports.Attribute = require('./affinity/Attribute.js');

/**
 * @type {Types.Object}
 */
module.exports.Object = require('./affinity/types/Object');

/**
 * @type {Types.Integer}
 */
module.exports.Integer = require('./affinity/types/Integer');

/**
 * @type {Types.String}
 */
module.exports.String = require('./affinity/types/String');

/**
 * @type {Types.Boolean}
 */
module.exports.Boolean = require('./affinity/types/Boolean');

/**
 * @type {Types.Date}
 */
module.exports.Date = require('./affinity/types/Date');


/// Defining Functions

/**
 * @type {Function}
 */
module.exports.Function = require('./affinity/Function.js');

// Connective Functions

/**
 * @type {Functions.Connective.And}
 */
module.exports.And = require('./affinity/functions/connective/And.js');

/**
 * @type {Functions.Connective.Or}
 */
module.exports.Or = require('./affinity/functions/connective/Or.js');

/**
 * @type {Functions.Connective.Not}
 */
module.exports.Not = require('./affinity/functions/connective/Not.js');

// Comparatives Functions

/**
 * @type {Functions.Comparable.Equal}
 */
module.exports.Equal = require('./affinity/functions/comparable/Equal.js');

/**
 * @type {Functions.Comparable.Equal}
 */
module.exports.eq = function(attr1, attr2){
    return new module.exports.Equal(attr1, attr2);
};

// Numeric Functions

/**
 * @type {Functions.Numeric.Absolute}
 */
module.exports.Absolute = require('./affinity/functions/numeric/Absolute.js');

/**
 * @type {Functions.Numeric.Ceil}
 */
module.exports.Ceil = require('./affinity/functions/numeric/Ceil.js');
/**
 * @type {Functions.Numeric.Cosine}
 */
module.exports.Cosine = require('./affinity/functions/numeric/Cosine.js');

/**
 * @type {Functions.Numeric.Division}
 */
module.exports.Division = require('./affinity/functions/numeric/Division.js');

/**
 * @type {Functions.Numeric.Exponential}
 */
module.exports.Exponential = require('./affinity/functions/numeric/Exponential.js');

/**
 * @type {Functions.Numeric.Floor}
 */
module.exports.Floor = require('./affinity/functions/numeric/Floor.js');


/**
 * @type {Functions.Numeric.Minus}
 */
module.exports.Minus = require('./affinity/functions/numeric/Minus.js');

/**
 * @type {Functions.Numeric.Modulo}
 */
module.exports.Modulo = require('./affinity/functions/numeric/Modulo.js');

/**
 * @type {Functions.Numeric.Multiplication}
 */
module.exports.Multiplication = require('./affinity/functions/numeric/Multiplication.js');

/**
 * @type {Functions.Numeric.Plus}
 */
module.exports.Plus = require('./affinity/functions/numeric/Plus.js');

/**
 * @type {Functions.Numeric.Power}
 */
module.exports.Power = require('./affinity/functions/numeric/Power.js');

/**
 * @type {Functions.Numeric.Round}
 */
module.exports.Round = require('./affinity/functions/numeric/Round.js');

/**
 * @type {Functions.Numeric.Sine}
 */
module.exports.Sine = require('./affinity/functions/numeric/Sine.js');

/**
 * @type {Functions.Numeric.SquareRoot}
 */
module.exports.SquareRoot = require('./affinity/functions/numeric/SquareRoot.js');

/**
 * @type {Functions.Numeric.Tangent}
 */
module.exports.Tangent = require('./affinity/functions/numeric/Tangent.js');

/**
 * @param attr
 * @returns {Functions.Numeric.Absolute}
 */
module.exports.abs = function(attr){
    return new module.exports.Absolute(attr);
};

/**
 * @param attr
 * @returns {Functions.Numeric.Ceil}
 */
module.exports.ceil = function(attr){
    return new module.exports.Ceil(attr);
};

/**
 * @param attr
 * @returns {Functions.Numeric.Floor}
 */
module.exports.floor = function(attr){
    return new module.exports.Floor(attr);
};

/**
 * @param attr
 * @returns {Functions.Numeric.Cosine}
 */
module.exports.cos = function(attr){
    return new module.exports.Cosine(attr);
};

/**
 * @param attr1
 * @param attr2
 * @returns {Functions.Numeric.Division}
 */
module.exports.div = function(attr1, attr2){
    return new module.exports.Division(attr1, attr2);
};

/**
 * @param attr
 * @returns {Functions.Numeric.Exponential}
 */
module.exports.exp = function(attr){
    return new module.exports.Exponential(attr);
};

/**
 * @param attr1
 * @param attr2
 * @returns {Functions.Numeric.Minus}
 */
module.exports.minus = function(attr1, attr2){
    return new module.exports.Minus(attr1, attr2);
};

/**
 * @param attr1
 * @param attr2
 * @returns {Functions.Numeric.Modulo}
 */
module.exports.mod = function(attr1, attr2){
    return new module.exports.Modulo(attr1, attr2);
};

/**
 * @param attr1
 * @param attr2
 * @returns {Functions.Numeric.Multiplication}
 */
module.exports.times = function(attr1, attr2){
    return new module.exports.Multiplication(attr1, attr2);
};

/**
 * @param attr1
 * @param attr2
 * @returns {Functions.Numeric.Plus}
 */
module.exports.plus = function(attr1, attr2){
    return new module.exports.Plus(attr1, attr2);
};

/**
 * @param attr1
 * @param attr2
 * @returns {Functions.Numeric.Power}
 */
module.exports.pow = function(attr1, attr2){
    return new module.exports.Power(attr1, attr2);
};

/**
 * @param attr
 * @returns {Functions.Numeric.Round}
 */
module.exports.round = function(attr){
    return new module.exports.Round(attr);
};

/**
 * @param attr
 * @returns {Functions.Numeric.Sine}
 */
module.exports.sin = function(attr){
    return new module.exports.Sine(attr);
};

/**
 * @param attr
 * @returns {Functions.Numeric.SquareRoot}
 */
module.exports.sqrt = function(attr){
    return new module.exports.SquareRoot(attr);
};

/**
 * @param attr
 * @returns {Functions.Numeric.Tangent}
 */
module.exports.tan = function(attr){
    return new module.exports.Tangent(attr);
};

// String Functions

/**
 * @type {Functions.String.Length}
 */
module.exports.Length = require('./affinity/functions/string/Length.js');

/**
 * @type {Functions.String.Lowercase}
 */
module.exports.Lowercase = require('./affinity/functions/string/Lowercase.js');

/**
 * @type {Functions.String.Test}
 */
module.exports.Test = require('./affinity/functions/string/Test.js');

/**
 * @type {Functions.String.Substring}
 */
module.exports.Substring = require('./affinity/functions/string/Substring.js');

/**
 * @type {Functions.String.Uppercase}
 */
module.exports.Uppercase = require('./affinity/functions/string/Uppercase.js');

/**
 * @param attr
 * @returns {Functions.String.Length}
 */
module.exports.length = function(attr){
    return new module.exports.Length(attr);
};

/**
 * @param attr
 * @returns {Functions.String.Lowercase}
 */
module.exports.lowercase = function(attr){
    return new module.exports.Lowercase(attr);
};

/**
 * @param attr
 * @param regex
 * @returns {Functions.String.Test}
 */
module.exports.test = function(attr, regex){
    return new module.exports.Test(attr, regex);
};

/**
 * @param attr
 * @param start
 * @param length
 * @returns {Functions.String.Substring}
 */
module.exports.substr = function(attr, start, length){
    return new module.exports.Length(attr, start, length);
};

/**
 * @param attr
 * @returns {Functions.String.Uppercase}
 */
module.exports.uppercase = function(attr){
    return new module.exports.Length(attr);
};

// Tuple functions

/**
 * @type {Functions.Tuple.AttributeValue}
 */
module.exports.TupleValue = require('./affinity/functions/tuple/Attribute.js');

/**
 * @param relation
 * @param attributeName
 * @returns {Functions.Tuple.AttributeValue}
 */
module.exports.value = function(relation, attributeName){
    var result = new module.exports.TupleValue(attributeName);
    result.type(relation.header().get(attributeName));
    return result;
};


/// Defining relational operators

/**
 * @type {Operators.Composition}
 */
module.exports.Composition = require('./affinity/algebra/Composition.js');

/**
 * @type {Operators.Difference}
 */
module.exports.Difference = require('./affinity/algebra/Difference.js');

/**
 * @type {Operators.Extension}
 */
module.exports.Extension = require('./affinity/algebra/Extension.js');

/**
 * @type {Operators.Group}
 */
module.exports.Group = require('./affinity/algebra/Group.js');

/**
 * @type {Operators.Intersection}
 */
module.exports.Intersection = require('./affinity/algebra/Intersection.js');

/**
 * @type {Operators.Join}
 */
module.exports.Join = require('./affinity/algebra/Join.js');

/**
 * @type {Operators.Product}
 */
module.exports.Product = require('./affinity/algebra/Product.js');

/**
 * @type {Operators.Projection}
 */
module.exports.Projection = require('./affinity/algebra/Projection.js');

/**
 * @type {Operators.Rename}
 */
module.exports.Rename = require('./affinity/algebra/Rename.js');

/**
 * @type {Operators.Restriction}
 */
module.exports.Restriction = require('./affinity/algebra/Restriction.js');

/**
 * @type {Operators.SemiDifference}
 */
module.exports.SemiDifference = require('./affinity/algebra/SemiDifference.js');

/**
 * @type {Operators.SemiJoin}
 */
module.exports.SemiJoin = require('./affinity/algebra/SemiJoin.js');

/**
 * @type {Operators.Ungroup}
 */
module.exports.Ungroup = require('./affinity/algebra/Ungroup.js');

/**
 * @type {Operators.Union}
 */
module.exports.Union = require('./affinity/algebra/Union.js');

/**
 * @type {Operators.Unwrap}
 */
module.exports.Unwrap = require('./affinity/algebra/Unwrap.js');

/**
 * @type {Operators.Wrap}
 */
module.exports.Unwrap = require('./affinity/algebra/Wrap.js');


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
