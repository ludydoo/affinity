var Function = require('./../../Function.js');
var TNumeric = require('./../../types/Numeric.js');
var value = require('./../../helpers/value');

var FCeil = Function.extend(
    /**
     * @lends FCeil.prototype
     */
    {

        /**
         * @class Functions.Numeric.Ceil
         * @extends Function
         */
        constructor: function () {

            Function.apply(this, Array.prototype.slice.call(arguments, 0));

            this.type(TNumeric);

            this.name = 'Ceil';

        },

        value: function () {

            return Math.ceil(value(this.parameters[0]));

        }

    });

FCeil.mixin(require('./../../mixins/numeric'));
FCeil.mixin(require('./../../mixins/comparable'));
FCeil.mixin(require('./../../mixins/size-comparable'));

module.exports = FCeil;