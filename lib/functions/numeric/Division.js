var Function = require('./../../Function.js');
var TBoolean = require('./../../types/Boolean.js');

var FDivision = Function.extend(
    /**
     * @lends FDivision.prototype
     */
    {

        /**
         * @class FDivision
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

            return this.args[0].valueOf()/this.args[1].valueOf;

        }

    });

FDivision.mixin(require('./../../mixins/numeric'));
FDivision.mixin(require('./../../mixins/comparable'));
FDivision.mixin(require('./../../mixins/size-comparable'));

module.exports = FDivision;