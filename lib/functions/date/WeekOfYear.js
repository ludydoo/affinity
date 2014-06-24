var Function = require('./../../Function.js');
var TInteger = require('./../../types/Integer.js');
var value = require('./../../helpers/value');

var FWeekOfYear = Function.extend(
    /**
     * @lends FWeekOfYear.prototype
     */
    {

        /**
         * @class FWeekOfYear
         * @augments Function
         */
        constructor: function () {

            Function.apply(this, Array.prototype.slice.call(arguments, 0));

            this.type(TInteger);

            this.name = 'WeekOfYear';

        },

        value: function () {

            var d = new Date(+value(this.parameters[0]));
            d.setHours(0,0,0);
            d.setDate(d.getDate()+4-(d.getDay()||7));
            return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);

        }

    },{


    });

module.exports = FWeekOfYear;