var Function = require('./../../Function.js');
var TInteger = require('./../../types/Integer.js');
var value = require('./../../helpers/value');

var FDayOfMonth = Function.extend(
    /**
     * @lends FDayOfMonth.prototype
     */
    {

        /**
         * @class FDayOfMonth
         * @augments Function
         */
        constructor: function () {

            Function.apply(this, Array.prototype.slice.call(arguments, 0));

            this.type(TInteger);

            this.name = 'DayOfMonth';

        },

        value: function () {

            return value(this.parameters[0]).getDate();

        }

    },{


    });

module.exports = FDayOfMonth;