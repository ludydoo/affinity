var Function = require('./../../Function.js');
var TNumeric = require('./../../types/Numeric.js');
var value = require('./../../helpers/value');

var FTan = Function.extend(
    /**
     * @lends FTan.prototype
     */
    {

        /**
         * @class FTan
         * @augments Function
         */
        constructor: function () {

            Function.apply(this, Array.prototype.slice.call(arguments, 0));

            this.type(TNumeric);

            this.name = 'Tangent';

        },

        value : function () {

            return Math.tan(value(this.parameters[0]));

        }

    });

FTan.mixin(require('./../../mixins/numeric'));
FTan.mixin(require('./../../mixins/comparable'));
FTan.mixin(require('./../../mixins/size-comparable'));

module.exports = FTan;