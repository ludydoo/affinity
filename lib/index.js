/**
 * @class Affinity
 * @type {Object} 
 * @member Affinity
 */
var affinity = {};

//region Types

/**
 * @member Affinity
 * @type {Index}
 */
affinity.Index = require('./affinity/Index.js');

/**
 * @type {Types.Type}  
 * @member Affinity
 */
affinity.Type = require('./affinity/types/Type.js');

/**
 * @type {Set} 
 * @member Affinity
 */
affinity.Set = require('./affinity/Set.js');

/**
 * @type {Relation} 
 * @member Affinity
 */
affinity.Relation = require('./affinity/Relation.js');

/**
 * @type {Tuple} 
 * @member Affinity
 */
affinity.Tuple = require('./affinity/Tuple.js');

/**
 * @type {Header} 
 * @member Affinity
 */
affinity.Header = require('./affinity/Header.js');

/**
 * @type {Attribute} 
 * @member Affinity
 */
affinity.Attribute = require('./affinity/Attribute.js');

/**
 * @type {Types.Object} 
 * @member Affinity
 */
affinity.Object = require('./affinity/types/Object');

/**
 * @type {Types.Integer} 
 * @member Affinity
 */
affinity.Integer = require('./affinity/types/Integer');

/**
 * @type {Types.Float} 
 * @member Affinity
 */
affinity.Float = require('./affinity/types/Float');

/**
 * @type {Types.String} 
 * @member Affinity
 */
affinity.String = require('./affinity/types/String');

/**
 * @type {Types.Boolean} 
 * @member Affinity
 */
affinity.Boolean = require('./affinity/types/Boolean');

/**
 * @type {Types.Date} 
 * @member Affinity
 */
affinity.Date = require('./affinity/types/Date');
//endregion

/**
 * @type {Function} 
 * @member Affinity
 */
affinity.Function = require('./affinity/Function.js');

//region Connective Functions

/**
 * @type {Functions.Connective.And} 
 * @member Affinity
 */
affinity.And = require('./affinity/functions/connective/And.js');

/**
 * @type {Functions.Connective.Or} 
 * @member Affinity
 */
affinity.Or = require('./affinity/functions/connective/Or.js');

/**
 * @type {Functions.Connective.Not} 
 * @member Affinity
 */
affinity.Not = require('./affinity/functions/connective/Not.js');
//endregion

//region Comparative Functions

/**
 * @type {Functions.Comparable.Equal} 
 * @member Affinity
 */
affinity.Equal = require('./affinity/functions/comparable/Equal.js');

/**
 * @type {Functions.Comparable.Equal} 
 * @member Affinity
 */
affinity.eq = function(attr1, attr2){
    return new affinity.Equal(attr1, attr2);
};


/**
 * @type {Functions.Comparable.GreaterThan} 
 * @member Affinity
 */
affinity.GreaterThan = require('./affinity/functions/comparable/GreaterThan.js');

/**
 * @type {Functions.Comparable.GreaterThan} 
 * @member Affinity
 */
affinity.gt = function(attr1, attr2){
    return new affinity.GreaterThan(attr1, attr2);
};


/**
 * @type {Functions.Comparable.GreaterThanEqual} 
 * @member Affinity
 */
affinity.GreaterThanEqual = require('./affinity/functions/comparable/GreaterThanEqual.js');

/**
 * @type {Functions.Comparable.GreaterThanEqual} 
 * @member Affinity
 */
affinity.gte = function(attr1, attr2){
    return new affinity.GreaterThanEqual(attr1, attr2);
};


/**
 * @type {Functions.Comparable.SmallerThan} 
 * @member Affinity
 */
affinity.SmallerThan = require('./affinity/functions/comparable/SmallerThan.js');

/**
 * @type {Functions.Comparable.SmallerThan} 
 * @member Affinity
 */
affinity.st = function(attr1, attr2){
    return new affinity.SmallerThan(attr1, attr2);
};


/**
 * @type {Functions.Comparable.SmallerThanEqual} 
 * @member Affinity
 */
affinity.SmallerThanEqual = require('./affinity/functions/comparable/SmallerThanEqual.js');

/**
 * @type {Functions.Comparable.SmallerThanEqual} 
 * @member Affinity
 */
affinity.ste = function(attr1, attr2){
    return new affinity.SmallerThanEqual(attr1, attr2);
};

//endregion

//region Numeric Functions

/**
 * @type {Functions.Numeric.Absolute} 
 * @member Affinity
 */
affinity.Absolute = require('./affinity/functions/numeric/Absolute.js');

/**
 * @type {Functions.Numeric.Ceil} 
 * @member Affinity
 */
affinity.Ceil = require('./affinity/functions/numeric/Ceil.js');
/**
 * @type {Functions.Numeric.Cosine} 
 * @member Affinity
 */
affinity.Cosine = require('./affinity/functions/numeric/Cosine.js');

/**
 * @type {Functions.Numeric.Division} 
 * @member Affinity
 */
affinity.Division = require('./affinity/functions/numeric/Division.js');

/**
 * @type {Functions.Numeric.Exponential} 
 * @member Affinity
 */
affinity.Exponential = require('./affinity/functions/numeric/Exponential.js');

/**
 * @type {Functions.Numeric.Floor} 
 * @member Affinity
 */
affinity.Floor = require('./affinity/functions/numeric/Floor.js');

/**
 * @type {Functions.Numeric.Minus} 
 * @member Affinity
 */
affinity.Minus = require('./affinity/functions/numeric/Minus.js');

/**
 * @type {Functions.Numeric.Modulo} 
 * @member Affinity
 */
affinity.Modulo = require('./affinity/functions/numeric/Modulo.js');

/**
 * @type {Functions.Numeric.Multiplication} 
 * @member Affinity
 */
affinity.Multiplication = require('./affinity/functions/numeric/Multiplication.js');

/**
 * @type {Functions.Numeric.Plus} 
 * @member Affinity
 */
affinity.Plus = require('./affinity/functions/numeric/Plus.js');

/**
 * @type {Functions.Numeric.Power} 
 * @member Affinity
 */
affinity.Power = require('./affinity/functions/numeric/Power.js');

/**
 * @type {Functions.Numeric.Round} 
 * @member Affinity
 */
affinity.Round = require('./affinity/functions/numeric/Round.js');

/**
 * @type {Functions.Numeric.Sine} 
 * @member Affinity
 */
affinity.Sine = require('./affinity/functions/numeric/Sine.js');

/**
 * @type {Functions.Numeric.SquareRoot} 
 * @member Affinity
 */
affinity.SquareRoot = require('./affinity/functions/numeric/SquareRoot.js');

/**
 * @type {Functions.Numeric.Tangent} 
 * @member Affinity
 */
affinity.Tangent = require('./affinity/functions/numeric/Tangent.js');

/**
 * @param attr
 * @returns {Functions.Numeric.Absolute}
 */
affinity.abs = function(attr){
    return new affinity.Absolute(attr);
};

/**
 * @param attr
 * @returns {Functions.Numeric.Ceil}
 */
affinity.ceil = function(attr){
    return new affinity.Ceil(attr);
};

/**
 * @param attr
 * @returns {Functions.Numeric.Floor}
 */
affinity.floor = function(attr){
    return new affinity.Floor(attr);
};

/**
 * @param attr
 * @returns {Functions.Numeric.Cosine}
 */
affinity.cos = function(attr){
    return new affinity.Cosine(attr);
};

/**
 * @param attr1
 * @param attr2
 * @returns {Functions.Numeric.Division}
 */
affinity.div = function(attr1, attr2){
    return new affinity.Division(attr1, attr2);
};

/**
 * @param attr
 * @returns {Functions.Numeric.Exponential}
 */
affinity.exp = function(attr){
    return new affinity.Exponential(attr);
};

/**
 * @param attr1
 * @param attr2
 * @returns {Functions.Numeric.Minus}
 */
affinity.minus = function(attr1, attr2){
    return new affinity.Minus(attr1, attr2);
};

/**
 * @param attr1
 * @param attr2
 * @returns {Functions.Numeric.Modulo}
 */
affinity.mod = function(attr1, attr2){
    return new affinity.Modulo(attr1, attr2);
};

/**
 * @param attr1
 * @param attr2
 * @returns {Functions.Numeric.Multiplication}
 */
affinity.times = function(attr1, attr2){
    return new affinity.Multiplication(attr1, attr2);
};

/**
 * @param attr1
 * @param attr2
 * @returns {Functions.Numeric.Plus}
 */
affinity.plus = function(attr1, attr2){
    return new affinity.Plus(attr1, attr2);
};

/**
 * @param attr1
 * @param attr2
 * @returns {Functions.Numeric.Power}
 */
affinity.pow = function(attr1, attr2){
    return new affinity.Power(attr1, attr2);
};

/**
 * @param attr
 * @returns {Functions.Numeric.Round}
 */
affinity.round = function(attr){
    return new affinity.Round(attr);
};

/**
 * @param attr
 * @returns {Functions.Numeric.Sine}
 */
affinity.sin = function(attr){
    return new affinity.Sine(attr);
};

/**
 * @param attr
 * @returns {Functions.Numeric.SquareRoot}
 */
affinity.sqrt = function(attr){
    return new affinity.SquareRoot(attr);
};

/**
 * @param attr
 * @returns {Functions.Numeric.Tangent}
 */
affinity.tan = function(attr){
    return new affinity.Tangent(attr);
};
//endregion

//region String Functions

/**
 * @type {Functions.String.Length} 
 * @member Affinity
 */
affinity.Length = require('./affinity/functions/string/Length.js');

/**
 * @type {Functions.String.Lowercase} 
 * @member Affinity
 */
affinity.Lowercase = require('./affinity/functions/string/Lowercase.js');

/**
 * @type {Functions.String.Test} 
 * @member Affinity
 */
affinity.Test = require('./affinity/functions/string/Test.js');

/**
 * @type {Functions.String.Substring} 
 * @member Affinity
 */
affinity.Substring = require('./affinity/functions/string/Substring.js');

/**
 * @type {Functions.String.Uppercase} 
 * @member Affinity
 */
affinity.Uppercase = require('./affinity/functions/string/Uppercase.js');

/**
 * @param attr
 * @returns {Functions.String.Length}
 */
affinity.length = function(attr){
    return new affinity.Length(attr);
};

/**
 * @param attr
 * @returns {Functions.String.Lowercase}
 */
affinity.lowercase = function(attr){
    return new affinity.Lowercase(attr);
};

/**
 * @param attr
 * @param regex
 * @returns {Functions.String.Test}
 */
affinity.test = function(attr, regex){
    return new affinity.Test(attr, regex);
};

/**
 * @param attr
 * @param start
 * @param length
 * @returns {Functions.String.Substring}
 */
affinity.substr = function(attr, start, length){
    return new affinity.Length(attr, start, length);
};

/**
 * @param attr
 * @returns {Functions.String.Uppercase}
 */
affinity.uppercase = function(attr){
    return new affinity.Length(attr);
};
//endregion

//region Tuple Functions

/**
 * @type {Functions.Tuple.AttributeValue} 
 * @member Affinity
 */
affinity.TupleValue = require('./affinity/functions/tuple/Attribute.js');

/**
 * @param relation
 * @param attributeName
 * @returns {Functions.Tuple.AttributeValue}
 */
affinity.value = function(relation, attributeName){
    var result = new affinity.TupleValue(attributeName);
    result.type(relation.header().get(attributeName));
    return result;
};
//endregion

//region Date Functions

affinity.DayOfMonth = require('./affinity/functions/date/DayOfMonth.js');
affinity.DayOfMonth = require('./affinity/functions/date/DayOfMonth.js');
affinity.DayOfWeek = require('./affinity/functions/date/DayOfWeek.js');
affinity.DayOfYear = require('./affinity/functions/date/DayOfYear.js');
affinity.Hours = require('./affinity/functions/date/Hours.js');
affinity.Milliseconds = require('./affinity/functions/date/Milliseconds.js');
affinity.Minutes = require('./affinity/functions/date/Minutes.js');
affinity.Month = require('./affinity/functions/date/Month.js');
affinity.Seconds = require('./affinity/functions/date/Seconds.js');
affinity.Timestamp = require('./affinity/functions/date/Timestamp.js');
affinity.WeekOfYear = require('./affinity/functions/date/WeekOfYear.js');
affinity.Year = require('./affinity/functions/date/Year.js');
//endregion

affinity.count = function(){
    return new (require('./affinity/functions/aggregate/Count.js'));
};

//region Relational Operators

/**
 * @type {Operators.Composition} 
 * @member Affinity
 */
affinity.Composition = require('./affinity/algebra/Composition.js');

/**
 * @type {Operators.Difference} 
 * @member Affinity
 */
affinity.Difference = require('./affinity/algebra/Difference.js');

/**
 * @type {Operators.Extension} 
 * @member Affinity
 */
affinity.Extension = require('./affinity/algebra/Extension.js');

/**
 * @type {Operators.Group} 
 * @member Affinity
 */
affinity.Group = require('./affinity/algebra/Group.js');

/**
 * @type {Operators.Intersection} 
 * @member Affinity
 */
affinity.Intersection = require('./affinity/algebra/Intersection.js');

/**
 * @type {Operators.Join} 
 * @member Affinity
 */
affinity.Join = require('./affinity/algebra/Join.js');

/**
 * @type {Operators.Product} 
 * @member Affinity
 */
affinity.Product = require('./affinity/algebra/Product.js');

/**
 * @type {Operators.Projection} 
 * @member Affinity
 */
affinity.Projection = require('./affinity/algebra/Projection.js');

/**
 * @type {Operators.Rename} 
 * @member Affinity
 */
affinity.Rename = require('./affinity/algebra/Rename.js');

/**
 * @type {Operators.Restriction} 
 * @member Affinity
 */
affinity.Restriction = require('./affinity/algebra/Restriction.js');

/**
 * @type {Operators.SemiDifference} 
 * @member Affinity
 */
affinity.SemiDifference = require('./affinity/algebra/Semidifference.js');

/**
 * @type {Operators.SemiJoin} 
 * @member Affinity
 */
affinity.SemiJoin = require('./affinity/algebra/SemiJoin.js');

/**
 * @type {Operators.Ungroup} 
 * @member Affinity
 */
affinity.Ungroup = require('./affinity/algebra/Ungroup.js');

/**
 * @type {Operators.Union} 
 * @member Affinity
 */
affinity.Union = require('./affinity/algebra/Union.js');

/**
 * @type {Operators.Unwrap} 
 * @member Affinity
 */
affinity.Unwrap = require('./affinity/algebra/Unwrap.js');

/**
 * @type {Operators.Wrap} 
 * @member Affinity
 */
affinity.Wrap = require('./affinity/algebra/Wrap.js');
//endregion

//region Constants

/**
 * @type {Relation} 
 * @member Affinity
 */
affinity.TABLE_DUM = new affinity.Relation([]);

/**
 * @type {Relation} 
 * @member Affinity
 */
affinity.TABLE_DEE = new affinity.Relation([], [
    []
]);
//endregion

module.exports = affinity;
