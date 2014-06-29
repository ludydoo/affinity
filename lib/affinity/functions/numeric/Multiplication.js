var Function = require('./../../Function.js');
var TNumeric = require('./../../types/Numeric.js');
var value = require('./../../helpers/value');

var FMultiplication = Function.extend(
    {

        /**
         * @class Functions.Numeric.Multiplication
         * @extends Function
         *
         * Multiplies two numbers
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
         *     var extended = relation.extend([{ "A x B" : A.times(B)}])
         *
         *     // or
         *
         *     var extended = relation.extend([{ "A x B" : new affinity.Multiplication(A, B)}])
         *
         *     extended.print()
         *
         *     // +---------------+---------------+-----------------+
         *     // | A : Integer   | B : Integer   | A x B : Numeric |
         *     // +===============+===============+=================+
         *     // | 1             | -1            | -1              |
         *     // +---------------+---------------+-----------------+
         *     // | -1            | 1             | -1              |
         *     // +---------------+---------------+-----------------+
         *     // | 0             | 10            | 0               |
         *     // +---------------+---------------+-----------------+
         *     // | 1             | 10            | 10              |
         *     // +---------------+---------------+-----------------+
         *     // | 2             | -10           | -20             |
         *     // +---------------+---------------+-----------------+
         *
         *
         */
        constructor: function () {

            Function.apply(this, Array.prototype.slice.call(arguments, 0));

            this.type(TNumeric);

            this.name = 'Multiplication';

        },

        value : function () {

            return value(this.parameters[0])*value(this.parameters[1]);

        }

    });

FMultiplication.mixin(require('./../../mixins/numeric'));
FMultiplication.mixin(require('./../../mixins/comparable'));
FMultiplication.mixin(require('./../../mixins/size-comparable'));

module.exports = FMultiplication;