var Function = require('./../../Function.js');
var TBoolean = require('./../../types/Boolean.js');

var Or = Function.extend(
    /**
     * @lends FOr.prototype;
     */
    {

        /**
         * @class FOr
         * @augments Function
         */
        constructor: function () {

            this.name = 'Or';

            this.minArgs = 1;

            this.maxArgs = 0;

            this.expect = TBoolean;

            this.return = TBoolean;

            Function.apply(this, arguments);

        },

        valueOf: function () {


            var a;
            for (a in this.args) {

                if (this.args.hasOwnProperty(a) && (this.args[a] == true))
                    return true;

            }

            return false;

        }

    });

module.exports = Or;