var Function = require('./../../Function.js');
var TInteger = require('./../../types/Integer.js');
var value = require('./../../helpers/value');

var FSeconds = Function.extend(
    /**
     * @lends FSeconds.prototype
     */
    {

        /**
         * @class Functions.Date.Seconds
         * @extends Function
         */
        constructor: function () {

            Function.apply(this, Array.prototype.slice.call(arguments, 0));

            this.type(TInteger);

            this.name = 'Seconds';

        },

        value: function () {

            return value(this.parameters[0]).getSeconds();

        }

    },{


    });

module.exports = FSeconds;