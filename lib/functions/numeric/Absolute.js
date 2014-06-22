var Function = require('./../../Function.js');
var TNumeric = require('./../../types/Numeric.js');

var FAbsolute = Function.extend(
    /**
     * @lends FAbsolute.prototype
     */
    {

        /**
         * @class FAbsolute
         * @augments Function
         */
        constructor: function () {

            Function.apply(this, Array.prototype.slice.call(arguments, 0));

            this.type(TNumeric);

            this.name = 'Absolute';

        },

        value: function () {

            return Math.abs(TNumeric.value(this.parameters[0]));

        }

    },{


    });

FAbsolute.mixin(require('./../../mixins/numeric'));
FAbsolute.mixin(require('./../../mixins/comparable'));
FAbsolute.mixin(require('./../../mixins/size-comparable'));

module.exports = FAbsolute;