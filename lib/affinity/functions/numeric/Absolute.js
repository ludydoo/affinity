var Function = require('./../../Function.js');
var TNumeric = require('./../../types/Numeric.js');
var value = require('./../../helpers/value');

var Absolute = Function.extend(
    {

        /**
         * @class Functions.Numeric.Absolute
         * @extends Function
         *
         * Function that extracts the Absolute value of a Number
         *
         * Example with Extend operator :
         *
         *      var relation = new affinity.Relation([
         *          { A :  {type : affinity.Integer} },
         *      ],[
         *          [-10], [-5], [0], [5], [10]]
         *      ])
         *
         *      var A = relation.get('A');
         *
         *
         *      var B = relation.extend([{ B : A.abs() }]);
         *
         *      // or
         *
         *      var B = relation.extend([{ B : new affinity.Absolute(A) }]);
         *
         *      B.print();
         *
         *      //+---------------+---------------+
         *      //| A : Integer   | B : Integer   |
         *      //+===============+===============+
         *      //| -10           | 10            |
         *      //+---------------+---------------+
         *      //| -5            | 5             |
         *      //+---------------+---------------+
         *      //| 0             | 0             |
         *      //+---------------+---------------+
         *      //| 5             | 5             |
         *      //+---------------+---------------+
         *      //| 10            | 10            |
         *      //+---------------+---------------+
         *
         */

        /**
         * @param {Number|Function|Attribute} param The number to absolucize
         *
         * Create a new Absolute function
         */
        constructor: function (param) {

            Function.apply(this, Array.prototype.slice.call(arguments, 0));

            this.type(TNumeric);

            this.name = 'Absolute';

        },

        /**
         * @returns {Number} The result
         *
         * Gets the function result
         */
        value: function () {

            return Math.abs(value(this.parameters[0]));

        }

    });

Absolute.mixin(require('./../../mixins/numeric'));
Absolute.mixin(require('./../../mixins/comparable'));
Absolute.mixin(require('./../../mixins/size-comparable'));

module.exports = Absolute;