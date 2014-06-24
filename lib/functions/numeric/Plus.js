var Function = require('./../../Function.js');
var TNumeric = require('./../../types/Numeric.js');
var value = require('./../../helpers/value');
var type = require('./../../helpers/type');

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

            Function.apply(this, Array.prototype.slice.call(arguments, 0));

            this.type(this.parameters[0]);

            this.name = 'Plus';

        },

        value: function () {

            return this.type().coerce(value(this.parameters[0])+value(this.parameters[1]));

        }

    });

FPlus.mixin(require('./../../mixins/numeric'));
FPlus.mixin(require('./../../mixins/comparable'));
FPlus.mixin(require('./../../mixins/size-comparable'));

module.exports = FPlus;