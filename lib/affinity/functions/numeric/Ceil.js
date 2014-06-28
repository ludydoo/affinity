var Function = require('./../../Function.js');
var TNumeric = require('./../../types/Numeric.js');
var value = require('./../../helpers/value');

var FCeil = Function.extend(
    /**
     * @lends FCeil.prototype
     */
    {

        /**
         * @class Functions.Numeric.Ceil
         * @extends Function
         *
         * Function that rounds a number upwards
         *
         * Example with Extend operator :
         *
         *      var relation = new affinity.Relation([
         *          { A :  {type : affinity.Integer} },
         *      ],[
         *          [1.01], [-2.85], [3], [3.12], [10.2]]
         *      ])
         *
         *      var A = relation.get('A');
         *
         *
         *      var B = relation.extend([{ B : A.ceil() }]);
         *
         *      // or
         *
         *      var B = relation.extend([{ B : new affinity.Ceil(A) }]);
         *
         *      B.print();
         *
         *      //+---------------+---------------+
         *      //| A : Integer   | B : Integer   |
         *      //+===============+===============+
         *      //| 1.01          | 2             |
         *      //+---------------+---------------+
         *      //| -2.85         | 2             |
         *      //+---------------+---------------+
         *      //| 3             | 3             |
         *      //+---------------+---------------+
         *      //| 3.12          | 4             |
         *      //+---------------+---------------+
         *      //| 10.2          | 11            |
         *      //+---------------+---------------+
         *
         *
         */
        constructor: function () {

            Function.apply(this, Array.prototype.slice.call(arguments, 0));

            this.type(TNumeric);

            this.name = 'Ceil';

        },

        /**
         * Gets the function return value
         * @returns {number}
         */
        value: function () {

            return Math.ceil(value(this.parameters[0]));

        }

    });

FCeil.mixin(require('./../../mixins/numeric'));
FCeil.mixin(require('./../../mixins/comparable'));
FCeil.mixin(require('./../../mixins/size-comparable'));

module.exports = FCeil;