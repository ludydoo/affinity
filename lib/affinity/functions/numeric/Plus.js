var Function = require('./../../Function.js');
var TNumeric = require('./../../types/Numeric.js');
var value = require('./../../helpers/value');
var type = require('./../../helpers/type');

var Plus = Function.extend(
    {

        /**
         * @class Functions.Numeric.Plus
         * @extends Function
         *
         * Adds two numbers
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
         *     var extended = relation.extend([{ "A + B" : A.plus(B)}])
         *
         *     // or
         *
         *     var extended = relation.extend([{ "A + B" : new affinity.Plus(A, B)}])
         *
         *     extended.print()
         *
         *     // +---------------+---------------+-----------------+
         *     // | A : Integer   | B : Integer   | A + B : Numeric |
         *     // +===============+===============+=================+
         *     // | 1             | -1            | 0               |
         *     // +---------------+---------------+-----------------+
         *     // | -1            | 1             | 0               |
         *     // +---------------+---------------+-----------------+
         *     // | 0             | 10            | 10              |
         *     // +---------------+---------------+-----------------+
         *     // | 1             | 10            | 11              |
         *     // +---------------+---------------+-----------------+
         *     // | 2             | -10           | -18             |
         *     // +---------------+---------------+-----------------+
         *
         */
        constructor: function () {

            Function.apply(this, Array.prototype.slice.call(arguments, 0));

            this.type(this.parameters[0]);

            this.name = 'Plus';

        },

        /**
         * Gets the function return value
         * @returns {number}
         */
        value: function () {

            return this.type().coerce(value(this.parameters[0])+value(this.parameters[1]));

        }

    });

Plus.mixin(require('./../../mixins/numeric'));
Plus.mixin(require('./../../mixins/comparable'));
Plus.mixin(require('./../../mixins/size-comparable'));

module.exports = Plus;