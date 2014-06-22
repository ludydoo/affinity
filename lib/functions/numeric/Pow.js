var Function = require('./../../Function.js');
var TNumeric = require('./../../types/Numeric.js');
var value = require('./../../helpers/value');

var FPow = Function.extend(
    /**
     * @lends FPow.prototype
     */
    {

        /**
         * @class FPow
         * @augments Function
         */
        constructor: function () {

            Function.apply(this, Array.prototype.slice.call(arguments, 0));

            this.type(TNumeric);

            this.name = 'Power';

        },

        value: function () {

            return Math.pow(value(this.parameters[0]),value(this.parameters[1]));

        }

    });

FPow.mixin(require('./../../mixins/numeric'));
FPow.mixin(require('./../../mixins/comparable'));
FPow.mixin(require('./../../mixins/size-comparable'));

module.exports = FPow;