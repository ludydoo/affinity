var Function = require('./../../Function.js');
var TInteger = require('./../../types/Integer.js');
var value = require('./../../helpers/value');

var FMonth = Function.extend(
    /**
     * @lends FMonth.prototype
     */
    {

        /**
         * @class FMonth
         * @augments Function
         */
        constructor: function () {

            Function.apply(this, Array.prototype.slice.call(arguments, 0));

            this.type(TInteger);

            this.name = 'Month';

        },

        value: function () {

            return value(this.parameters[0]).getMonth();

        }

    },{


    });

module.exports = FMonth;