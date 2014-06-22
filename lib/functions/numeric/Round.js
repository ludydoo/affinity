var Function = require('./../../Function.js');
var TNumeric = require('./../../types/Numeric.js');
var value = require('./../../helpers/value');

var FRound = Function.extend(
    /**
     * @lends FRound.prototype
     */
    {

        /**
         * @class FRound
         * @augments Function
         */
        constructor: function () {

            Function.apply(this, Array.prototype.slice.call(arguments, 0));

            this.type(TNumeric);

            this.name = 'Round';

        },

        value: function () {

            return Math.round(value(this.parameters[0]));

        }

    });

FRound.mixin(require('./../../mixins/numeric'));
FRound.mixin(require('./../../mixins/comparable'));
FRound.mixin(require('./../../mixins/size-comparable'));

module.exports = FRound;