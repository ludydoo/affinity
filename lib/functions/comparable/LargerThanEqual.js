var Function = require('./../../Function.js');
var Type = require('./../../Type.js');
var TBoolean = require('./../../types/Boolean.js');
var _ = require('lodash');

var FLargerThanEqual = Function.extend(
    /** @lends FLargerThanEqual.prototype */
    {

        /**
         * @class FLargerThanEqual
         * @augments Function
         */
        constructor: function () {

            Function.apply(this, arguments);

            this.name = 'GreaterThanEqual';

        },

        value: function () {


        }

    },{



    });

module.exports = FLargerThanEqual;