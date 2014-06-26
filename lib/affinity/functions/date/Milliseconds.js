var Function = require('./../../Function.js');
var TInteger = require('./../../types/Integer.js');
var value = require('./../../helpers/value');

var FMilliseconds = Function.extend(
    /**
     * @lends FMilliseconds.prototype
     */
    {

        /**
         * @class Functions.Date.Milliseconds
         * @extends Function
         */
        constructor: function () {

            Function.apply(this, Array.prototype.slice.call(arguments, 0));

            this.type(TInteger);

            this.name = 'Milliseconds';

        },

        value: function () {

            return value(this.parameters[0]).getMilliseconds();

        }

    },{


    });

module.exports = FMilliseconds;