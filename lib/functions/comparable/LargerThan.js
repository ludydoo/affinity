var Function = require('./../../Function.js');
var Type = require('./../../Type.js');
var TBoolean = require('./../../types/Boolean.js');
var _ = require('lodash');

var FLargerThan = Function.extend(
    /** @lends FLargerThan.prototype */
    {

        /**
         * @class FLargerThan
         * @augments Function
         */
        constructor: function () {

            Function.apply(this, arguments);

            this.name = 'LargerThan';

        },

        value: function () {

        }

    },{

    });

module.exports = FLargerThan;