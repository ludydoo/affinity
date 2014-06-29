var Function = require('./../../Function.js');
var TNumeric = require('./../../types/Numeric.js');
var value = require('./../../helpers/value');

var FDivision = Function.extend(
    {

        /**
         * @class Functions.Numeric.Division
         * @extends Function
         *
         * Function that returns the result of a division between two numbers
         *
         * Example with Extend operator :
         *
         *      var relation = new affinity.Relation([
         *          { A :  {type : affinity.Integer} },
         *      ],[
         *          [-2], [-1], [0], [1], [2]]
         *      ])
         *
         *      var relation2 = relation.extend([{B : relation.get('A')}]);
         *
         *      var product = relation2.project(['A']).product(relation2.get('B'));
         *
         *      var A = product.get('A');
         *      var B = product.get('B');
         *
         *
         *      var extended = product.extend([{C : A.div(B)}]);
         *
         *      // or equivalent
         *
         *      new affinity.Extend(product, [{ C : new affinity.Division(A, B) }])
         *
         *
         *      extended.print();
         *
         *
         *      // (Standard behaviour of JavaScript)
         *      // +---------------+---------------+---------------+
         *      // | A : Integer   | B : Integer   | C : Numeric   |
         *      // +===============+===============+===============+
         *      // | -2            | -2            | 1             |
         *      // +---------------+---------------+---------------+
         *      // | -2            | -1            | 2             |
         *      // +---------------+---------------+---------------+
         *      // | -2            | 0             | -Infinity     |
         *      // +---------------+---------------+---------------+
         *      // | -2            | 1             | -2            |
         *      // +---------------+---------------+---------------+
         *      // | -2            | 2             | -1            |
         *      // +---------------+---------------+---------------+
         *      // | -1            | -2            | 0.5           |
         *      // +---------------+---------------+---------------+
         *      // | -1            | -1            | 1             |
         *      // +---------------+---------------+---------------+
         *      // | -1            | 0             | -Infinity     |
         *      // +---------------+---------------+---------------+
         *      // | -1            | 1             | -1            |
         *      // +---------------+---------------+---------------+
         *      // | -1            | 2             | -0.5          |
         *      // +---------------+---------------+---------------+
         *      // | 0             | -2            | 0             |
         *      // +---------------+---------------+---------------+
         *      // | 0             | -1            | 0             |
         *      // +---------------+---------------+---------------+
         *      // | 0             | 0             | NaN           |
         *      // +---------------+---------------+---------------+
         *      // | 0             | 1             | 0             |
         *      // +---------------+---------------+---------------+
         *      // | 0             | 2             | 0             |
         *      // +---------------+---------------+---------------+
         *      // | 1             | -2            | -0.5          |
         *      // +---------------+---------------+---------------+
         *      // | 1             | -1            | -1            |
         *      // +---------------+---------------+---------------+
         *      // | 1             | 0             | Infinity      |
         *      // +---------------+---------------+---------------+
         *      // | 1             | 1             | 1             |
         *      // +---------------+---------------+---------------+
         *      // | 1             | 2             | 0.5           |
         *      // +---------------+---------------+---------------+
         *      // | 2             | -2            | -1            |
         *      // +---------------+---------------+---------------+
         *      // | 2             | -1            | -2            |
         *      // +---------------+---------------+---------------+
         *      // | 2             | 0             | Infinity      |
         *      // +---------------+---------------+---------------+
         *      // | 2             | 1             | 2             |
         *      // +---------------+---------------+---------------+
         *      // | 2             | 2             | 1             |
         *      // +---------------+---------------+---------------+
         *
         */
        constructor: function () {

            Function.apply(this, Array.prototype.slice.call(arguments, 0));

            this.type(TNumeric);

            this.name = 'Division';

        },

        value: function () {

            return value(this.parameters[0])/value(this.parameters[1]);

        }

    });

FDivision.mixin(require('./../../mixins/numeric'));
FDivision.mixin(require('./../../mixins/comparable'));
FDivision.mixin(require('./../../mixins/size-comparable'));

module.exports = FDivision;