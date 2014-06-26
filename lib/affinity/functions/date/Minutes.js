var Function = require('./../../Function.js');
var TInteger = require('./../../types/Integer.js');
var value = require('./../../helpers/value');

var FMinutes = Function.extend(
    /**
     * @lends FMinutes.prototype
     */
    {

        /**
         * @class Functions.Date.Minutes
         * @extends Function
         */
        constructor: function () {

            Function.apply(this, Array.prototype.slice.call(arguments, 0));

            this.type(TInteger);

            this.name = 'Minutes';

        },

        value: function () {

            return value(this.parameters[0]).getMinutes();

        }

    },{


    });

module.exports = FMinutes;