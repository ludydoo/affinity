var Function = require('./../../Function.js');
var TNumeric = require('./../../types/Numeric.js');
var value = require('./../../helpers/value');

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

            Function.apply(this, Array.prototype.slice.call(arguments, 0));

            this.type(TNumeric);

            this.name = 'Modulo';

        },

        value : function () {

            return value(this.parameters[0])%value(this.parameters[1]);

        }

    });

FModulo.mixin(require('./../../mixins/numeric'));
FModulo.mixin(require('./../../mixins/comparable'));
FModulo.mixin(require('./../../mixins/size-comparable'));

module.exports = FModulo;