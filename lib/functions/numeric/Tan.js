var Function = require('./../../Function.js');
var TBoolean = require('./../../types/Boolean.js');

var FTan = Function.extend(
    /**
     * @lends FTan.prototype
     */
    {

        /**
         * @class FTan
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

            return Math.tan(this.args[0].valueOf());

        }

    });

FTan.mixin(require('./../../mixins/numeric'));
FTan.mixin(require('./../../mixins/comparable'));
FTan.mixin(require('./../../mixins/size-comparable'));

module.exports = FTan;