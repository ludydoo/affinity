var Function = require('./../../Function.js');
var TNumeric = require('./../../types/Numeric.js');
var value = require('./../../helpers/value');

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

            Function.apply(this, Array.prototype.slice.call(arguments, 0));

            this.type(TNumeric);

            this.name = 'Cos';

        },

        value: function () {

            return Math.cos(value(this.parameters[0]));

        }

    });

FCos.mixin(require('./../../mixins/numeric'));
FCos.mixin(require('./../../mixins/comparable'));
FCos.mixin(require('./../../mixins/size-comparable'));

module.exports = FCos;