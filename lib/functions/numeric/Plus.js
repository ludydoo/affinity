var Function = require('./../../Function.js');
var TBoolean = require('./../../types/Boolean.js');

var FPlus = Function.extend(
    /**
     * @lends FPlus.prototype
     */
    {

        /**
         * @class FPlus
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

            return this.args[0].valueOf()+this.args[1].valueOf();

        }

    });

FPlus.mixin(require('./../../mixins/numeric'));
FPlus.mixin(require('./../../mixins/comparable'));
FPlus.mixin(require('./../../mixins/size-comparable'));

module.exports = FPlus;