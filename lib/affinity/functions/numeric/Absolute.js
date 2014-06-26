var Function = require('./../../Function.js');
var TNumeric = require('./../../types/Numeric.js');
var value = require('./../../helpers/value');

var FAbsolute = Function.extend(
    /**
     * @lends FAbsolute.prototype
     */
    {

        /**
         * @class Functions.Numeric.Absolute
         * @extends Function
         */
        constructor: function () {

            Function.apply(this, Array.prototype.slice.call(arguments, 0));

            this.type(TNumeric);

            this.name = 'Absolute';

        },

        value: function () {

            return Math.abs(value(this.parameters[0]));

        }

    },{


    });

FAbsolute.mixin(require('./../../mixins/numeric'));
FAbsolute.mixin(require('./../../mixins/comparable'));
FAbsolute.mixin(require('./../../mixins/size-comparable'));

module.exports = FAbsolute;