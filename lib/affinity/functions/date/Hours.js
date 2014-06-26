var Function = require('./../../Function.js');
var TInteger = require('./../../types/Integer.js');
var value = require('./../../helpers/value');

var FHours = Function.extend(
    /**
     * @lends FHours.prototype
     */
    {

        /**
         * @class Functions.Date.Hours
         * @extends Function
         */
        constructor: function () {

            Function.apply(this, Array.prototype.slice.call(arguments, 0));

            this.type(TInteger);

            this.name = 'Hours';

        },

        value: function () {

            return value(this.parameters[0]).getHours();

        }

    },{


    });

module.exports = FHours;