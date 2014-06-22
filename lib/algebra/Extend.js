var Relation = require('./../Relation.js');
var Header = require('./../Header.js');
var Attribute = require('./../Attribute.js');
var Tuple = require('./../Tuple.js');
var _ = require('lodash');
var debug = require('./../helpers/debug');

var RExtend = Relation.extend(
    /** @lends RExtend.prototype */{

        /**
         * @typedef {Object} extendParameter
         * @property {String} name The name of the new attribute
         * @property {Function} expressions The expressions to evaluate when setting the attribute value
         */

        constructor: function (relation, expressions) {
            /**
             * @class RExtend
             * @augments Relation
             * @param {Relation} relation The relation from which to remove the tuples
             * @param {extendParameter[]} expression The arguments from which to calculate the new attribute value. It is an array of
             * @classdesc
             * The Extend operation allows the addition of calculated {@link Header} {@link Attribute}s
             * @example
             *
             * var relationA = new affinity.Relation([
             *          {name: { type: affinity.String}},
             *          {born: { type: affinity.Integer}},
             *          {died: { type: affinity.Integer}}
             *      ],[
             *          ['Aristotle', -384, -322],
             *          ['Plato',     -428, -348],
             *          ['Socrates',  -470, -399]
             *      ]);
             *
             * var born = relationA.get('born');
             * var died = relationA.get('died');
             *
             * var relationB = relationA.extend([{ lived : died.minus(born) }]);
             *
             * //or
             *
             * // LIVED = DIED - BORN
             *
             * var relationB = new affinity.Extend(relationA, [{ lived : died.minus(born) }]);
             *
             * //                                                       <-EXTENDED ATTR-->
             * // +----------------+-----------------+-----------------+------------------+
             * // | name : TString | born : TInteger | died : TInteger | lived : TInteger |
             * // +================+=================+=================+==================+
             * // | Aristotle      | -384            | -322            | 62               |
             * // +----------------+-----------------+-----------------+------------------+
             * // | Plato          | -428            | -348            | 80               |
             * // +----------------+-----------------+-----------------+------------------+
             * // | Socrates       | -470            | -399            | 71               |
             * // +----------------+-----------------+-----------------+------------------+
             * //
             *
             * // Possible to add multiple attributes in one call :
             *
             * // LIVED = DIED - BORN, SINCE = YEAR(NOW())-DIED
             *
             * var relationB = new affinity.Extend(relationA, [
             *      { lived : died.minus(born) },
             *      { since: affinity.year(affinity.now()).minus(died) }
             * ]);
             *
             * //                                                       <-EXTENDED ATTR--> <-EXTENDED ATTR-->
             * // +----------------+-----------------+-----------------+------------------+------------------+
             * // | name : TString | born : TInteger | died : TInteger | lived : TInteger | since : TInteger |
             * // +================+=================+=================+==================+==================+
             * // | Aristotle      | -384            | -322            | 62               | 2335             |
             * // +----------------+-----------------+-----------------+------------------+------------------+
             * // | Plato          | -428            | -348            | 80               | 2362             |
             * // +----------------+-----------------+-----------------+------------------+------------------+
             * // | Socrates       | -470            | -399            | 71               | 2413             |
             * // +----------------+-----------------+-----------------+------------------+------------------+
             * //
             *
             * // Possible to have custom defined functions
             * // Beware though to return the right data type (divisions by zero, tan(π/2), ...)
             *
             * // You may as well use this feature, but since affinity will later be a SQL parser too,
             * // it will obviously not support the translation of custom defined functions into SQL code.
             * // If you plan have use of affinity's future SQL parser, beware that these custom functions
             * // will only run in javascript.
             *
             * // I would have loved javascript to support overloading of operators, but that won't
             * // happen anytime soon.
             *
             * var relationB = relation.extend([
             *
             *      {'lived' : {function(tuple){
             *          return tuple.get('died')-tuple.get('born');
             *      }, type : affinity.Integer},
             *
             *      {'died' : {function(tuple){
             *          return 2014-tuple.get('died')
             *      }, type : affinity.Integer},
             *
             * ])
             *
             */

            debug.extend.trace('#constructor');

            this.relation = relation;
            this.expressions = expressions;

            Relation.call(this);

        },

        bindEvents: function () {

            debug.extend.trace('#bindEvents');

            // Calling the parent bindEvents
            RExtend.__super__.bindEvents.call(this);

            var that = this;

            /// BeforeGetHeader

            this.ee.once('beforeGetHeader', function () {

                debug.extend.trace('beforeGetHeader');

                // Add the attributes of the base relation

                that.relation().header().copy(that.relation.header());


                /// Parse extension attributes

                // Coerce the argument to an array if it is not already

                if(!_.isArray(that.expressions)){
                    that.expressions = [that.expressions];
                }

                _.forOwn(that.expressions, function(expression){

                    // Expression must be an object
                    if(!_.isObject(expression)){
                        throw new TypeError('Wrong expression format')
                    }

                    var keys = Object.keys(expression);

                    // Expression must have only one parameter
                    if(keys.count !== 1){
                        throw new SyntaxError('Unhandled expression declaration');
                    }

                    // This is the name of the attribute to add
                    var extensionName = keys[0];

                    // This is the expression
                    var extensionParam = expression[extensionName];

                    // Convert the attributes objects to functions that iterate through tuples
                    extensionParam.convertAttributeToTuple();

                    // Key must not already exist in the current header
                    if(that.header().get(extensionName) !== null){
                        throw new Error('Relation extension name already exists in the header');
                    }

                    // Get the return type of the expression
                    var type = extensionParam.type();

                    // Create the new header attribute
                    var extensionAttribute = new Attribute({type : type, name : extensionName});

                    // Add the attribute in the header
                    that.header().add(extensionAttribute);

                })

            });



            /// BeforeGetBody

            this.ee.once('beforeGetBody', function () {

                debug.extend.trace('beforeGetBody');

                that.relation.each(function(tuple){

                    // Create the tuple we are going to add
                    var newTuple = new Tuple();

                    // Copy the attributes from the base tuple
                    newTuple.copy(tuple);

                    _.forEach(that.expressions, function(expression){

                        // This is the new attribute name
                        var attributeName = Object.keys(expression)[0];

                        // This is the evaluation expression
                        var attributeExpression = expression[attributeName];

                        // This is the new value
                        var expressionValue = attributeExpression.value({tuple : newTuple});

                        // Let's set the new value in the tuple
                        newTuple.set(attributeName, expressionValue);

                    });

                    that.add(newTuple);

                })

            });

        }

    });

module.exports = RExtend;