var Function = require('./../../Function.js');
var TNumeric = require('./../../types/Numeric.js');
var value = require('./../../helpers/value');

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

            Function.apply(this, Array.prototype.slice.call(arguments, 0));

            this.type(TNumeric);

            this.name = 'Multiplication';

        },

        value : function () {

            return value(this.parameters[0])*value(this.parameters[1]);

        }

    });

FMultiplication.mixin(require('./../../mixins/numeric'));
FMultiplication.mixin(require('./../../mixins/comparable'));
FMultiplication.mixin(require('./../../mixins/size-comparable'));

module.exports = FMultiplication;