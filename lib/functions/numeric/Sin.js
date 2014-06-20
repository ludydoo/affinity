var Function = require('./../../Function.js');
var TBoolean = require('./../../types/Boolean.js');

var FSin = Function.extend(
    /**
     * @lends FSin.prototype
     */
    {

        /**
         * @class FSin
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

            return Math.sin(this.args[0].valueOf());

        }

    });

FSin.mixin(require('./../../mixins/numeric'));
FSin.mixin(require('./../../mixins/comparable'));
FSin.mixin(require('./../../mixins/size-comparable'));

module.exports = FSin;