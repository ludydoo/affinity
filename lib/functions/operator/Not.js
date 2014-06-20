var Function = require('./../../Function.js');
var TBoolean = require('./../../types/Boolean.js');

var Not = Function.extend(
    /** @lends FNot.prototype */
    {

        /**
         * @class FNot
         * @augments Function
         */
        constructor: function () {

            this.minArgs = 1;

            this.maxArgs = 1;

            this.expect = TBoolean;

            this.return = TBoolean;

            Function.apply(this, arguments);

        },

        valueOf: function () {

            return !(this.args[0].valueOf())

        }

    });

module.exports = Not;