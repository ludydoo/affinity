var Function = require('./../../Function.js');
var TNumeric = require('./../../types/Numeric.js');
var value = require('./../../helpers/value');

var FSquareRoot = Function.extend(
    /**
     * @lends FSquareRoot.prototype
     */
    {

        /**
         * @class Functions.Numeric.SquareRoot
         * @extends Function
         *
         *
         * Returns the square root of a number
         *
         * example :
         *
         *     var relation = new affinity.Relation([
         *          { A : { type : affinity.Integer}}
         *     ],[
         *          [-10],[-5],[-2],[-1],[0],[1],[2],[5],[10]
         *     ])
         *
         *     var A = relation.get('A')
         *
         *     var extended = relation.extend([{B : A.sqrt()}]);
         *
         *     // or
         *
         *     var extended = relation.extend([{ B : new affinity.Sqrt(A)}])
         *
         *     extended.print();
         *
         *     // +---------------+----------------------+
         *     // | A : Integer   | B : Numeric          |
         *     // +===============+======================+
         *     // | -10           | NaN                  |
         *     // +---------------+----------------------+
         *     // | -5            | NaN                  |
         *     // +---------------+----------------------+
         *     // | -2            | NaN                  |
         *     // +---------------+----------------------+
         *     // | -1            | NaN                  |
         *     // +---------------+----------------------+
         *     // | 0             | 0                    |
         *     // +---------------+----------------------+
         *     // | 1             | 1                    |
         *     // +---------------+----------------------+
         *     // | 2             | 1.4142135623730951   |
         *     // +---------------+----------------------+
         *     // | 5             | 2.23606797749979     |
         *     // +---------------+----------------------+
         *
         */
        constructor: function () {

            Function.apply(this, Array.prototype.slice.call(arguments, 0));

            this.type(TNumeric);

            this.name = 'Square Root';

        },

        value: function () {

            return Math.sqrt(value(this.parameters[0]));

        }

    });

FSquareRoot.mixin(require('./../../mixins/numeric'));
FSquareRoot.mixin(require('./../../mixins/comparable'));
FSquareRoot.mixin(require('./../../mixins/size-comparable'));

module.exports = FSquareRoot;