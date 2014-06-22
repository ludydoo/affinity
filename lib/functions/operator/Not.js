var Function = require('./../../Function.js');
var TBoolean = require('./../../types/Boolean.js');
var _ = require('lodash');

var Not = Function.extend(
    /** @lends FNot.prototype */
    {

        /**
         * @class FNot
         * @augments Function
         */
        constructor: function () {

            Function.apply(this, arguments);

            this.type(TBoolean);

            this.name = 'Not';

        },

        value: function () {

            if(!_.isBoolean(this.parameters[0])){
                return !this.parameters[0].value();
            }

            return !this.parameters[0];

        }

    },{



    });

module.exports = Not;