var Function = require('./../../Function.js');
var Type = require('./../../Type.js');
var TBoolean = require('./../../types/Boolean.js');
var _ = require('lodash');
var equal = require('./../../helpers/equal');

var FEqual = Function.extend(
    /** @lends FEqual.prototype */
    {

        /**
         * @class FEqual
         * @augments Function
         */
        constructor: function () {

            Function.apply(this, Array.prototype.slice.call(arguments,0));

            this.name = 'Equals';

            this.type(TBoolean);

        },

        value: function () {

            return equal(null, this.parameters[0], this.parameters[1]);

        }

    },{



    });

module.exports = FEqual;