var Function = require('./../../Function.js');
var TInteger = require('./../../types/Integer.js');
var value = require('./../../helpers/value');

var FDayOfYear = Function.extend(
    /**
     * @lends FDayOfYear.prototype
     */
    {

        /**
         * @class FDayOfYear
         * @augments Function
         */
        constructor: function () {

            Function.apply(this, Array.prototype.slice.call(arguments, 0));

            this.type(TInteger);

            this.name = 'DayOfYear';

        },

        value: function () {

            var date = value(this.parameters[0]);

            var begin = new Date(date.getFullYear(),0,1);

            return Math.ceil((date - begin) / 86400000);

        }

    },{


    });

module.exports = FDayOfYear;