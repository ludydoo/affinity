var Function = require('./../../Function.js');
var TNumeric = require('./../../types/Numeric.js');
var value = require('./../../helpers/value');
var type = require('./../../helpers/type');

var FMinus = Function.extend(
    /**
     * @lends FMinus.prototype
     */
    {

        /**
         * @class Functions.Numeric.Minus
         * @extends Function
         */
        constructor: function () {

            Function.apply(this, Array.prototype.slice.call(arguments, 0));

            this.type(type(this.parameters[0]));

            this.name = 'Minus';

        },

        value: function () {

            return this.type().coerce(value(this.parameters[0])-value(this.parameters[1]));

        }

    });

FMinus.mixin(require('./../../mixins/numeric'));
FMinus.mixin(require('./../../mixins/comparable'));
FMinus.mixin(require('./../../mixins/size-comparable'));

module.exports = FMinus;