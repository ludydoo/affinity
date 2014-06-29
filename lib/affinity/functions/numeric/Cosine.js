var Function = require('./../../Function.js');
var Numeric = require('./../../types/Numeric.js');
var value = require('./../../helpers/value');

var Cosine = Function.extend(
    {

        /**
         * @class Functions.Numeric.Cosine
         * @extends Function
         *
         * Function that returns the cosine of a number
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
         *      var B = relation.extend([{ B : A.cos() }]);
         *
         *      // or
         *
         *      var B = relation.extend([{ B : new affinity.Cosine(A) }]);
         *
         *      B.print();
         *
         *      //+---------------+---------------+
         *      //| A : Integer   | B : Integer   |
         *      //+===============+===============+
         *      //| 0             | 1             |
         *      //+---------------+---------------+
         *      //| PI/2          | 0             |
         *      //+---------------+---------------+
         *      //| π             | -1            |
         *      //+---------------+---------------+
         *      //| 3π/2          | 0             |
         *      //+---------------+---------------+
         *      //| 2π            | 1             |
         *      //+---------------+---------------+
         *
         */
        constructor: function () {

            Function.apply(this, Array.prototype.slice.call(arguments, 0));

            this.type(Numeric);

            this.name = 'Cos';

        },

        /**
         * Gets the function result
         * @returns {Number}
         */
        value: function () {

            return Math.cos(value(this.parameters[0]));

        }

    });

Cosine.mixin(require('./../../mixins/numeric'));
Cosine.mixin(require('./../../mixins/comparable'));
Cosine.mixin(require('./../../mixins/size-comparable'));

module.exports = Cosine;