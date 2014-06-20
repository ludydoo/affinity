var Function = require('./../../Function.js');
var TBoolean = require('./../../types/Boolean.js');

var FModulo = Function.extend(
    /**
     * @lends FModulo.prototype
     */
    {

        /**
         * @class FModulo
         * @augments Function
         */
        constructor: function () {

            this.name = 'Absolute';

            var args = arguments;

            this.minArgs = 2;

            this.maxArgs = 2;

            this.expect = TNumeric;

            //this.return = TBoolean;

            Function.apply(this, args);

        },

        valueOf: function () {

            var a;

            return Math.mod(this.args[0].valueOf, this.args[1].valueOf());

        }

    });

FModulo.mixin(require('./../../mixins/numeric'));
FModulo.mixin(require('./../../mixins/comparable'));
FModulo.mixin(require('./../../mixins/size-comparable'));

module.exports = FModulo;