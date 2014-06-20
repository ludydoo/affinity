var Function = require('./../../Function.js');
var TBoolean = require('./../../types/Boolean.js');

var FRound = Function.extend(
    /**
     * @lends FRound.prototype
     */
    {

        /**
         * @class FRound
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

            return Math.round(this.args[0].valueOf());

        }

    });

FRound.mixin(require('./../../mixins/numeric'));
FRound.mixin(require('./../../mixins/comparable'));
FRound.mixin(require('./../../mixins/size-comparable'));

module.exports = FRound;