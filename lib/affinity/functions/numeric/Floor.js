var Function = require('./../../Function.js');
var TNumeric = require('./../../types/Numeric.js');
var value = require('./../../helpers/value');

var Floor = Function.extend(
    {

        /**
         * @class Functions.Numeric.Floor
         * @extends Function
         *
         * Function that rounds a number downwards
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
         *      var B = relation.extend([{ B : A.Floor() }]);
         *
         *      // or
         *
         *      var B = relation.extend([{ B : new affinity.floor(A) }]);
         *
         *      B.print();
         *
         *      //+---------------+---------------+
         *      //| A : Integer   | B : Integer   |
         *      //+===============+===============+
         *      //| 1.01          | 1             |
         *      //+---------------+---------------+
         *      //| -2.85         | -3            |
         *      //+---------------+---------------+
         *      //| 3             | 3             |
         *      //+---------------+---------------+
         *      //| 3.12          | 3             |
         *      //+---------------+---------------+
         *      //| 10.2          | 10            |
         *      //+---------------+---------------+
         *
         *
         */
        constructor: function () {

            Function.apply(this, Array.prototype.slice.call(arguments, 0));

            this.type(TNumeric);

            this.name = 'Floor';

        },

        /**
         * Gets the function return value
         * @returns {number}
         */
        value: function () {

            return Math.floor(value(this.parameters[0]));

        }

    });

Floor.mixin(require('./../../mixins/numeric'));
Floor.mixin(require('./../../mixins/comparable'));
Floor.mixin(require('./../../mixins/size-comparable'));

module.exports = Floor;