var Function = require('./../../Function.js');
var TBoolean = require('./../../types/Boolean.js');

var FCos = Function.extend(
    /**
     * @lends FCos.prototype
     */
    {

        /**
         * @class FCos
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

            return Math.cos(this.args[0].valueOf());

        }

    });

FCos.mixin(require('./../../mixins/numeric'));
FCos.mixin(require('./../../mixins/comparable'));
FCos.mixin(require('./../../mixins/size-comparable'));

module.exports = FCos;