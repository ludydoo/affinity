var Function = require('./../../Function.js');
var TBoolean = require('./../../types/Boolean.js');
var _ = require('lodash');
var compare = require('./../../helpers/compare');

var FLargerThan = Function.extend(

    {

        /**
         * @class Functions.Comparable.LargerThan
         * @extends Function
         */
        constructor: function () {

            Function.apply(this, arguments);

            this.name = 'LargerThan';

            this.type(TBoolean);

        },

        value: function () {

            return (compare(null, this.parameters[0], this.parameters[1]) > 0);

        }

    },{

    });

module.exports = FLargerThan;