var Function = require('./../../Function.js');
var compare = require('./../../helpers/compare');
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

            this.type(TBoolean);

        },

        value: function () {

            return (compare(null, this.parameters[0], this.parameters[1]) >= 0);

        }

    },{



    });

module.exports = FLargerThanEqual;