var Function = require('./../../Function.js');
var TNumeric = require('./../../types/Numeric.js');
var value = require('./../../helpers/value');

var FSin = Function.extend(
    /**
     * @lends FSin.prototype
     */
    {

        /**
         * @class Functions.Numeric.Sine
         * @extends Function
         */
        constructor: function () {

            Function.apply(this, Array.prototype.slice.call(arguments, 0));

            this.type(TNumeric);

            this.name = 'Sinus';

        },

        value: function () {

            return Math.sin(value(this.parameters[0]));

        }

    });

FSin.mixin(require('./../../mixins/numeric'));
FSin.mixin(require('./../../mixins/comparable'));
FSin.mixin(require('./../../mixins/size-comparable'));

module.exports = FSin;