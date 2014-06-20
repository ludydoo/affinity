var Function = require('./../../Function.js');
var TBoolean = require('./../../types/Boolean.js');

var FMultiplication = Function.extend(
    /**
     * @lends FMultiplication.prototype
     */
    {

        /**
         * @class FMultiplication
         * @augments Function
         */
        constructor: function () {

            this.name = 'Absolute';

            var args = arguments;

            this.minArgs = 1;

            this.maxArgs = 1;

            this.expect = TNumeric;

            //this.return = TBoolean;

            Function.apply(this, args);

        },

        valueOf: function () {

            var a;

            return this.args[0].valueOf()*this.args[1].valueOf();

        }

    });

FMultiplication.mixin(require('./../../mixins/numeric'));
FMultiplication.mixin(require('./../../mixins/comparable'));
FMultiplication.mixin(require('./../../mixins/size-comparable'));

module.exports = FMultiplication;