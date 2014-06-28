var Function = require('./../../Function.js');
var TNumeric = require('./../../types/Numeric.js');
var value = require('./../../helpers/value');

var FExp = Function.extend(
    /**
     * @lends FExp.prototype
     */
    {

        /**
         * @class Functions.Numeric.Exponential
         * @extends Function
         *
         * Returns the exponential of a number (e^x)
         *
         * Example :
         *
         *     var relation = new affinity.Relation([{ A : {type : affinity.Integer} }],[[-2], [-1],[0],[1],[2]]);
         *
         *     var extended = relation.extend([{ B : relation.get('A').exp()}])
         *
         *     or equivalent
         *
         *     var extended = relation.extend([{ B : new affinity.Exp(A)}]);
         *
         *     extended.print();
         *
         *     // +---------------+-----------------------+
         *     // | A : Integer   | B : Numeric           |
         *     // +===============+=======================+
         *     // | -2            | 0.1353352832366127    |
         *     // +---------------+-----------------------+
         *     // | -1            | 0.36787944117144233   |
         *     // +---------------+-----------------------+
         *     // | 0             | 1                     |
         *     // +---------------+-----------------------+
         *     // | 1             | 2.718281828459045     |
         *     // +---------------+-----------------------+
         *     // | 2             | 7.38905609893065      |
         *     // +---------------+-----------------------+
         *
         *
         */
        constructor: function () {

            Function.apply(this, Array.prototype.slice.call(arguments, 0));

            this.type(TNumeric);

            this.name = 'Exponent';

        },

        value: function () {

            return Math.exp(value(this.parameters[0]));

        }

    });

FExp.mixin(require('./../../mixins/numeric'));
FExp.mixin(require('./../../mixins/comparable'));
FExp.mixin(require('./../../mixins/size-comparable'));

module.exports = FExp;