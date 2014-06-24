var Function = require('./../../Function.js');
var TInteger = require('./../../types/Integer.js');
var value = require('./../../helpers/value');

var FDayOfWeek = Function.extend(
    /**
     * @lends FDayOfWeek.prototype
     */
    {

        /**
         * @class FDayOfWeek
         * @augments Function
         */
        constructor: function () {

            Function.apply(this, Array.prototype.slice.call(arguments, 0));

            this.type(TInteger);

            this.name = 'DayOfWeek';

        },

        value: function () {

            return value(this.parameters[0]).getDay();

        }

    },{


    });

module.exports = FDayOfWeek;