var Function = require('./../../Function.js');
var TInteger = require('./../../types/Integer.js');
var value = require('./../../helpers/value');

var FYear = Function.extend(
    /**
     * @lends FYear.prototype
     */
    {

        /**
         * @class Functions.Date.Year
         * @extends Function
         */
        constructor: function () {

            Function.apply(this, Array.prototype.slice.call(arguments, 0));

            this.type(TInteger);

            this.name = 'Year';

        },

        value: function () {

            return value(this.parameters[0]).getFullYear();

        }

    },{


    });

module.exports = FYear;