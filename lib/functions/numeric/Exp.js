var Function = require('./../../Function.js');
var TBoolean = require('./../../types/Boolean.js');

var FExp = Function.extend(
    /**
     * @lends FExp.prototype
     */
    {

        /**
         * @class FExp
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

            Math.exp(this.args[0].valueOf());

        }

    });

FExp.mixin(require('./../../mixins/numeric'));
FExp.mixin(require('./../../mixins/comparable'));
FExp.mixin(require('./../../mixins/size-comparable'));

module.exports = FExp;