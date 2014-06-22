var Function = require('./../../Function.js');
var TNumeric = require('./../../types/Numeric.js');
var value = require('./../../helpers/value');

var FSquareRoot = Function.extend(
    /**
     * @lends FSquareRoot.prototype
     */
    {

        /**
         * @class FSquareRoot
         * @augments Function
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