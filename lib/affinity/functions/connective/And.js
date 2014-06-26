var Function = require('./../../Function.js');
var TBoolean = require('./../../types/Boolean.js');
var _ = require('lodash');

var And = Function.extend(
    /**
     * @lends FAnd.prototype
     */
    {

        /**
         * @class Functions.Connective.And
         * @extends Function
         */
        constructor: function () {

            Function.apply(this, Array.prototype.slice.call(arguments, 0));

            this.type(TBoolean);

            this.name = 'And';

        },

        value: function () {

            return _.every(this.parameters, function(parameter){

                if(!_.isBoolean(parameter)){
                    parameter = parameter.value();
                }
                return parameter;

            });

        }

    },{



    });

module.exports = And;