var Function = require('./../../Function.js');
var TBoolean = require('./../../types/Boolean.js');
var TNumeric = require('./../../types/Numeric.js');

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

            Function.apply(this, args);

            this.type(TNumeric);

        },

        valueOf: function () {

            return Math.ceil(this.args[0].value());

        }

    });

FCeil.mixin(require('./../../mixins/numeric'));
FCeil.mixin(require('./../../mixins/comparable'));
FCeil.mixin(require('./../../mixins/size-comparable'));

module.exports = FCeil;