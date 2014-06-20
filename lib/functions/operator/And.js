var Function = require('./../../Function.js');
var TBoolean = require('./../../types/Boolean.js');

var And = Function.extend(
    /**
     * @lends FAnd.prototype
     */
    {

        /**
         * @class FAnd
         * @augments Function
         */
        constructor: function () {

            this.name = 'And';

            var args = arguments;

            this.minArgs = 2;

            this.maxArgs = 0;

            this.expect = TBoolean;

            //this.return = TBoolean;

            Function.apply(this, args);

        },

        valueOf: function () {

            var a;

            for (a in this.args) {

                if (this.args.hasOwnProperty(a) && (this.args[a] == false))
                    return false;

            }

            return true;

        }

    });

module.exports = And;