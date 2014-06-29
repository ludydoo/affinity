var Function = require('./../../Function.js');
var TNumeric = require('./../../types/Numeric.js');
var value = require('./../../helpers/value');

var FPow = Function.extend(
    {

        /**
         * @class Functions.Numeric.Plus
         * @extends Function
         *
         * Returns a number to the power of another number
         *
         * example :
         *
         *     var relation = new affinity.Relation([
         *          { A : { type : affinity.Integer}},
         *          { B : { type : affinity.Integer}},
         *     ],[
         *          [1, -1],
         *          [-1, 1],
         *          [0, 10],
         *          [1, 10],
         *          [2, -10],
         *     ])
         *
         *     var A = relation.get('A')
         *     var B = relation.get('B')
         *
         *     var extended = relation.extend([{ C : A.pow(B)}])
         *
         *     // or
         *
         *     var extended = relation.extend([{ C : new affinity.Pow(A, B)}])
         *
         *     extended.print()
         *
         *     // +---------------+---------------+----------------+
         *     // | A : Integer   | B : Integer   | C : Numeric    |
         *     // +===============+===============+================+
         *     // | 1             | -1            | 1              |
         *     // +---------------+---------------+----------------+
         *     // | -1            | 1             | -1             |
         *     // +---------------+---------------+----------------+
         *     // | 0             | 10            | 0              |
         *     // +---------------+---------------+----------------+
         *     // | 1             | 10            | 1              |
         *     // +---------------+---------------+----------------+
         *     // | 2             | -10           | 0.0009765625   |
         *     // +---------------+---------------+----------------+
         *
         */
        constructor: function () {

            Function.apply(this, Array.prototype.slice.call(arguments, 0));

            this.type(TNumeric);

            this.name = 'Power';

        },

        /**
         * Gets the function's return value;
         * @returns {number}
         */
        value: function () {

            return Math.pow(value(this.parameters[0]),value(this.parameters[1]));

        }

    });

FPow.mixin(require('./../../mixins/numeric'));
FPow.mixin(require('./../../mixins/comparable'));
FPow.mixin(require('./../../mixins/size-comparable'));

module.exports = FPow;