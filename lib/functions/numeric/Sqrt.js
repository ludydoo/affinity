var Function = require('./../../Function.js');
var TBoolean = require('./../../types/Boolean.js');

var FSquareRoot = Function.extend(
    /**
     * @lends FSquareRoot.prototype
     */
    {

        /**
         * @class FSquareRoot
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

            return Math.sqrt(this.args[0].valueOf());

        }

    });

FSquareRoot.mixin(require('./../../mixins/numeric'));
FSquareRoot.mixin(require('./../../mixins/comparable'));
FSquareRoot.mixin(require('./../../mixins/size-comparable'));

module.exports = FSquareRoot;