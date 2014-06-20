var Function = require('./../../Function.js');
var TBoolean = require('./../../types/Boolean.js');

var FCeil = Function.extend(
    /**
     * @lends FCeil.prototype
     */
    {

        /**
         * @class FCeil
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

            return Math.ceil(this.args[0].valueOf());

        }

    });

FCeil.mixin(require('./../../mixins/numeric'));
FCeil.mixin(require('./../../mixins/comparable'));
FCeil.mixin(require('./../../mixins/size-comparable'));

module.exports = FCeil;