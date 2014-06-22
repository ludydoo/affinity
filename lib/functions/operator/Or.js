var Function = require('./../../Function.js');
var TBoolean = require('./../../types/Boolean.js');
var _ = require('lodash');

var Or = Function.extend(
    /**
     * @lends FOr.prototype;
     */
    {

        /**
         * @class FOr
         * @augments Function
         */
        constructor: function () {

            Function.apply(this, arguments);

            this.type(TBoolean);

            this.name = 'Or';

        },

        value: function () {


            return _.any(this.parameters, function(parameter){

                if(!_.isBoolean(parameter)){
                    parameter = parameter.value();
                }
                return parameter;

            });

        }

    },{


    });

module.exports = Or;