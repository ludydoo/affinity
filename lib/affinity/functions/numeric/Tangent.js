var Function = require('./../../Function.js');
var TNumeric = require('./../../types/Numeric.js');
var value = require('./../../helpers/value');

var Tangent = Function.extend(
    {

        /**
         * @class Functions.Numeric.Tangent
         * @extends Function
         *
         * Function that returns the Tangent of a number
         *
         * Example with Extend operator :
         *
         *      var relation = new affinity.Relation([
         *          { A :  {type : affinity.Integer} },
         *      ],[
         *          [0], [Math.PI/2], [Math.PI], [3*Math.PI/2], [2*Math.PI]
         *      ]);
         *
         *      var A = relation.get('A');
         *
         *
         *      var extended = relation.extend([{ "tan(A)" : A.tan() }]);
         *
         *      // or
         *
         *      var extended = relation.extend([{ "tan(A)" : new affinity.Tangent(A) }]);
         *
         *      extended.print();
         *
         *      // The following result shows a bug, but it's not affinity's fault.
         *      // Due to a bug in V8
         *      // (see this http://stackoverflow.com/questions/24455775/why-does-node-not-evaluate-math-tanmath-pi-2-to-infinity-but-chrome-v8-does)
         *      // Math.tan(Math.PI/2) won't evaluate to Infinity.
         *      // Math.tan(Math.PI) won't evaluate to 0.
         *      // And so on. This is due to Math.cos(Math.PI/2) not evaluating to 0.
         *
         *      // This will be fixed in node v0.11. as I tested the v0.11.14-pre version.
         *
         *      //+---------------+---------------------------+
         *      //| A : Integer   | tan(A) : Numeric          |
         *      //+===============+===========================+
         *      //| 0             | 0                         |
         *      //+---------------+---------------------------+
         *      //| PI/2          | 16331778728383844         |
         *      //+---------------+---------------------------+
         *      //| π             | -1.2246063538223773e-16   |
         *      //+---------------+---------------------------+
         *      //| 3π/2          | 5443926242794615          |
         *      //+---------------+---------------------------+
         *      //| 2π            | -2.4492127076447545e-16   |
         *      //+---------------+---------------------------+
         *
         */
        constructor: function () {

            Function.apply(this, Array.prototype.slice.call(arguments, 0));

            this.type(TNumeric);

            this.name = 'Tangent';

        },

        /**
         * Gets the function return value
         * @returns {number}
         */
        value: function () {

            return Math.tan(value(this.parameters[0]));

        }

    });

Tangent.mixin(require('./../../mixins/numeric'));
Tangent.mixin(require('./../../mixins/comparable'));
Tangent.mixin(require('./../../mixins/size-comparable'));

module.exports = Tangent;