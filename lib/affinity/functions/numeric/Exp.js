var Function = require('./../../Function.js');
var TNumeric = require('./../../types/Numeric.js');
var value = require('./../../helpers/value');

var FExp = Function.extend(
    /**
     * @lends FExp.prototype
     */
    {

        /**
         * @class Functions.Numeric.Exponential
         * @extends Function
         */
        constructor: function () {

            Function.apply(this, Array.prototype.slice.call(arguments, 0));

            this.type(TNumeric);

            this.name = 'Exponent';

        },

        value: function () {

            return Math.exp(value(this.parameters[0]));

        }

    });

FExp.mixin(require('./../../mixins/numeric'));
FExp.mixin(require('./../../mixins/comparable'));
FExp.mixin(require('./../../mixins/size-comparable'));

module.exports = FExp;