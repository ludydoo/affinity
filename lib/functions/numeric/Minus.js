var Function = require('./../../Function.js');
var TBoolean = require('./../../types/Boolean.js');

var FMinus = Function.extend(
    /**
     * @lends FMinus.prototype
     */
    {

        /**
         * @class FMinus
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

            return Math.abs(this.args[0].valueOf()-this.args[1].valueOf());

        }

    });

FMinus.mixin(require('./../../mixins/numeric'));
FMinus.mixin(require('./../../mixins/comparable'));
FMinus.mixin(require('./../../mixins/size-comparable'));

module.exports = FMinus;