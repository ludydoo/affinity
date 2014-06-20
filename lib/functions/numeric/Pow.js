var Function = require('./../../Function.js');
var TBoolean = require('./../../types/Boolean.js');

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

            Math.pow(this.args[0].valueOf(), this.args[1].valueOf());

        }

    });

FPow.mixin(require('./../../mixins/numeric'));
FPow.mixin(require('./../../mixins/comparable'));
FPow.mixin(require('./../../mixins/size-comparable'));

module.exports = FPow;