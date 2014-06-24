var Function = require('./../../Function.js');
var TInteger = require('./../../types/Integer.js');
var value = require('./../../helpers/value');

var FTimestamp = Function.extend(
    /**
     * @lends FTimestamp.prototype
     */
    {

        /**
         * @class FTimestamp
         * @augments Function
         */
        constructor: function () {

            Function.apply(this, Array.prototype.slice.call(arguments, 0));

            this.type(TInteger);

            this.name = 'Timestamp';

        },

        value: function () {

            if (!Date.now) {
                value(this.parameters[0]).getTime();
            } else {
                value(this.parameters[0]).now();
            }

        }

    },{


    });

module.exports = FTimestamp;