var Function = require('./../../Function.js');
var TNumeric = require('./../../types/Numeric.js');
var value = require('./../../helpers/value');

var FModulo = Function.extend(
    {

        /**
         * @class Functions.Numeric.Modulo
         * @extends Function
         *
         * Gets the modulo of two numbers
         *
         * Example :
         *
         *     var relation = new affinity.Relation([
         *              {A : {type : affinity.Integer}},
         *              {B : {type : affinity.Integer}}
         *          ],[
         *              [1, 2],
         *              [0, 0],
         *              [10, 1],
         *              [10, 2]
         *          ]);
         *
         *     var A = relation.get('A');
         *     var B = relation.get('B');
         *
         *     var extended = relation.extend([{"A % B" : A.mod(B)}]);
         *
         *     // or equivalent
         *
         *     var extended = relation.extend([{"A % B" : new affinity.Modulo(A, B)}]);
         *
         *     extended.print();
         *
         *     // +---------------+---------------+--------------------+
         *     // | A : Integer   | B : Integer   | A % B : Numeric    |
         *     // +===============+===============+====================+
         *     // | 1             | 2             | 1                  |
         *     // +---------------+---------------+--------------------+
         *     // | 0             | 0             | NaN                |
         *     // +---------------+---------------+--------------------+
         *     // | 10            | 1             | 0                  |
         *     // +---------------+---------------+--------------------+
         *     // | 10            | 2             | 0                  |
         *     // +---------------+---------------+--------------------+
         *
         */
        constructor: function () {

            Function.apply(this, Array.prototype.slice.call(arguments, 0));

            this.type(TNumeric);

            this.name = 'Modulo';

        },

        /**
         * Gets the function return value
         * @returns {number}
         */
        value : function () {

            return value(this.parameters[0])%value(this.parameters[1]);

        }

    });

FModulo.mixin(require('./../../mixins/numeric'));
FModulo.mixin(require('./../../mixins/comparable'));
FModulo.mixin(require('./../../mixins/size-comparable'));

module.exports = FModulo;