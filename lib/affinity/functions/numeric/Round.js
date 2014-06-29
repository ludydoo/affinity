var Function = require('./../../Function.js');
var TNumeric = require('./../../types/Numeric.js');
var value = require('./../../helpers/value');

var Round = Function.extend(
    {

        /**
         * @class Functions.Numeric.Round
         * @extends Function
         *
         * Rounds a number to its closest whole number
         *
         * example :
         *
         *     var relation = new affinity.Relation([
         *          { A : { type : affinity.Integer}}
         *     ],[
         *          [-10],[-5],[-2],[-1],[0],[1],[2],[5],[10]
         *     ]);
         *
         *     var A = relation.get('A');
         *
         *     var extended = relation.extend([{"A.sqrt()" : A.sqrt()}, {"A.sqrt().round()" : A.sqrt().round()}]);
         *
         *     // or
         *
         *     var extended = relation.extend([
         *         {"A.sqrt()"         : new affinity.SquareRoot(A)},
         *         {"A.sqrt().round()" : new affinity.Round(new affinity.SquareRoot(A))}
         *     ]);
         *
         *     extended.print();
         *
         *     // +---------------+----------------------+------------------------------+
         *     // | A : Integer   | A.sqrt() : Numeric   | A.sqrt().round() : Numeric   |
         *     // +===============+======================+==============================+
         *     // | -10           | NaN                  | NaN                          |
         *     // +---------------+----------------------+------------------------------+
         *     // | -5            | NaN                  | NaN                          |
         *     // +---------------+----------------------+------------------------------+
         *     // | -2            | NaN                  | NaN                          |
         *     // +---------------+----------------------+------------------------------+
         *     // | -1            | NaN                  | NaN                          |
         *     // +---------------+----------------------+------------------------------+
         *     // | 0             | 0                    | 0                            |
         *     // +---------------+----------------------+------------------------------+
         *     // | 1             | 1                    | 1                            |
         *     // +---------------+----------------------+------------------------------+
         *     // | 2             | 1.4142135623730951   | 1                            |
         *     // +---------------+----------------------+------------------------------+
         *     // | 5             | 2.23606797749979     | 2                            |
         *     // +---------------+----------------------+------------------------------+
         *
         */
        constructor: function () {

            Function.apply(this, Array.prototype.slice.call(arguments, 0));

            this.type(TNumeric);

            this.name = 'Round';

        },

        /**
         * Gets the function's return value
         * @returns {number}
         */
        value: function () {

            return Math.round(value(this.parameters[0]));

        }

    });

Round.mixin(require('./../../mixins/numeric'));
Round.mixin(require('./../../mixins/comparable'));
Round.mixin(require('./../../mixins/size-comparable'));

module.exports = Round;