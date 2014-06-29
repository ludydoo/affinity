var Function = require('./../../Function.js');
var TNumeric = require('./../../types/Numeric.js');
var value = require('./../../helpers/value');
var type = require('./../../helpers/type');

var FMinus = Function.extend(
    {

        /**
         * @class Functions.Numeric.Minus
         * @extends Function
         *
         * Subtracts two numbers
         *
         * Example :
         *
         *     var relation = new affinity.Relation([
         *              {A : {type : affinity.Integer}},
         *              {B : {type : affinity.Integer}}
         *          ],[
         *              [1, 2],
         *              [0, 0],
         *              [10, 1]
         *          ]);
         *
         *     var A = relation.get('A');
         *     var B = relation.get('B');
         *
         *     var extended = relation.extend([{ minus : A.minus(B)}])
         *
         *     // or equivalent
         *
         *     var extended = relation.extend([{minus : new affinity.Minus(A, B)}])
         *
         *     extended.print();
         *
         *     // +---------------+---------------+-------------------+
         *     // | A : Integer   | B : Integer   | minus : Integer   |
         *     // +===============+===============+===================+
         *     // | 1             | 2             | -1                |
         *     // +---------------+---------------+-------------------+
         *     // | 0             | 0             | 0                 |
         *     // +---------------+---------------+-------------------+
         *     // | 10            | 1             | 9                 |
         *     // +---------------+---------------+-------------------+
         */
        constructor: function () {

            Function.apply(this, Array.prototype.slice.call(arguments, 0));

            this.type(type(this.parameters[0]));

            this.name = 'Minus';

        },

        /**
         * Gets the function return value
         * @returns {number}
         */
        value: function () {

            return this.type().coerce(value(this.parameters[0])-value(this.parameters[1]));

        }

    });

FMinus.mixin(require('./../../mixins/numeric'));
FMinus.mixin(require('./../../mixins/comparable'));
FMinus.mixin(require('./../../mixins/size-comparable'));

module.exports = FMinus;