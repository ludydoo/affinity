var Function = require('./../../Function.js');
var Numeric = require('./../../types/Numeric.js');
var value = require('./../../helpers/value');

var Cosine = Function.extend(
    {

        /**
         * @class Functions.Numeric.Cosine
         * @extends Function
         *
         * Function that returns the cosine of a number
         *
         * Example with Extend operator :
         *
         *      var relation = new affinity.Relation([
         *          { A :  {type : affinity.Integer} },
         *      ],[
         *          [0], [Math.PI/2], [Math.PI], [3*Math.PI/2], [2*Math.PI]
         *      ])
         *
         *      var A = relation.get('A');
         *
         *
         *      var extended = relation.extend([{ "cos(A)" : A.cos() }]);
         *
         *      // or
         *
         *      var extended = relation.extend([{ "cos(A)" : new affinity.Cosine(A) }]);
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
         *      //+---------------+--------------------------+
         *      //| A : Integer   | cos(A) : Numeric         |
         *      //+===============+==========================+
         *      //| 0             | 1                        |
         *      //+---------------+--------------------------+
         *      //| PI/2          | 6.123031769111886e-17    |
         *      //+---------------+--------------------------+
         *      //| π             | -1                       |
         *      //+---------------+--------------------------+
         *      //| 3π/2          | -1.836909530733566e-16   |
         *      //+---------------+--------------------------+
         *      //| 2π            | 1                        |
         *      //+---------------+--------------------------+
         */
        constructor: function () {

            Function.apply(this, Array.prototype.slice.call(arguments, 0));

            this.type(Numeric);

            this.name = 'Cos';

        },

        /**
         * Gets the function result
         * @returns {Number}
         */
        value: function () {

            return Math.cos(value(this.parameters[0]));

        }

    });

Cosine.mixin(require('./../../mixins/numeric'));
Cosine.mixin(require('./../../mixins/comparable'));
Cosine.mixin(require('./../../mixins/size-comparable'));

module.exports = Cosine;