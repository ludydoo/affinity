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

            this.name = 'Absolute';

            var args = arguments;

            this.minArgs = 1;

            this.maxArgs = 1;

            this.expect = TNumeric;

            //this.return = TBoolean;

            Function.apply(this, args);

        },

        valueOf: function () {

            var a;

            return Math.abs(this.args[0].valueOf());

        }

    });

FAbsolute.mixin(require('./../../mixins/numeric'));
FAbsolute.mixin(require('./../../mixins/comparable'));
FAbsolute.mixin(require('./../../mixins/size-comparable'));

module.exports = FAbsolute;