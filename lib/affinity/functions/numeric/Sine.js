var Function = require('./../../Function.js');
var TNumeric = require('./../../types/Numeric.js');
var value = require('./../../helpers/value');

var Sine = Function.extend(
    {

        /**
         * @class Functions.Numeric.Sine
         * @extends Function
         *
         * Function that returns the sine of a number
         *
         * Example with Extend operator :
         *
         *      var relation = new affinity.Relation([
         *          { A :  {type : affinity.Integer} },
         *      ],[
         *          [0], [Math.PI/2], [Math.PI], [3*Math.PI/2], [2*Math.PI]
         *      ])
         *
         *      var A = relation.get('A');
         *
         *
         *      var B = relation.extend([{ B : A.sin() }]);
         *
         *      // or
         *
         *      var B = relation.extend([{ B : new affinity.Sine(A) }]);
         *
         *      B.print();
         *
         *      //+---------------+---------------+
         *      //| A : Integer   | B : Integer   |
         *      //+===============+===============+
         *      //| 0             | 0             |
         *      //+---------------+---------------+
         *      //| PI/2          | 1             |
         *      //+---------------+---------------+
         *      //| π             | 0             |
         *      //+---------------+---------------+
         *      //| 3π/2          | 1             |
         *      //+---------------+---------------+
         *      //| 2π            | 0             |
         *      //+---------------+---------------+
         */
        constructor: function () {

            Function.apply(this, Array.prototype.slice.call(arguments, 0));

            this.type(TNumeric);

            this.name = 'Sine';

        },

        /**
         * Gets the function return value
         * @returns {number}
         */
        value: function () {

            return Math.sin(value(this.parameters[0]));

        }

    });

Sine.mixin(require('./../../mixins/numeric'));
Sine.mixin(require('./../../mixins/comparable'));
Sine.mixin(require('./../../mixins/size-comparable'));

module.exports = Sine;