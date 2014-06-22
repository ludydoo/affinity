var Function = require('./../../Function.js');
var TBoolean = require('./../../types/Boolean.js');
var TNumeric = require('./../../types/Numeric.js');

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

            Function.apply(this, args);

            this.type(TNumeric);

        },

        valueOf: function () {

            return Math.cos(this.args[0].value());

        }

    });

FCos.mixin(require('./../../mixins/numeric'));
FCos.mixin(require('./../../mixins/comparable'));
FCos.mixin(require('./../../mixins/size-comparable'));

module.exports = FCos;