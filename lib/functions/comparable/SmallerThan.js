var Function = require('./../../Function.js');
var Type = require('./../../Type.js');
var TBoolean = require('./../../types/Boolean.js');
var _ = require('lodash');

var FSmallerThan = Function.extend(
    /** @lends FSmallerThan.prototype */
    {

        /**
         * @class FSmallerThan
         * @augments Function
         */
        constructor: function () {

            Function.apply(this, arguments);

            this.name = 'SmallerThan';

        },

        value: function () {


        }

    },{



    });

module.exports = FSmallerThan;