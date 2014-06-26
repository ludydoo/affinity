var Function = require('./../../Function.js');
var TNumeric = require('./../../types/Numeric.js');
var value = require('./../../helpers/value');

var FDivision = Function.extend(
    /**
     * @lends FDivision.prototype
     */
    {

        /**
         * @class Functions.Numeric.Division
         * @extends Function
         */
        constructor: function () {

            Function.apply(this, Array.prototype.slice.call(arguments, 0));

            this.type(TNumeric);

            this.name = 'Division';

        },

        value: function () {

            return value(this.parameters[0])/value(this.parameters[1]);

        }

    });

FDivision.mixin(require('./../../mixins/numeric'));
FDivision.mixin(require('./../../mixins/comparable'));
FDivision.mixin(require('./../../mixins/size-comparable'));

module.exports = FDivision;