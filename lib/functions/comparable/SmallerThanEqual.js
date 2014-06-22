var Function = require('./../../Function.js');
var Type = require('./../../Type.js');
var TBoolean = require('./../../types/Boolean.js');
var _ = require('lodash');

var FSmallerThanEqual = Function.extend(
    /** @lends FSmallerThanEqual.prototype */
    {

        /**
         * @class FSmallerThanEqual
         * @augments Function
         */
        constructor: function () {

            Function.apply(this, arguments);

            this.name = 'SmallerThanEqual';

        },

        value: function () {



        }

    },{



    });

module.exports = FSmallerThanEqual;