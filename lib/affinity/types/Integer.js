var TNumeric = require('./Numeric.js');
var _ = require('lodash');

var Integer = TNumeric.extend({

    /**
     * @class Types.Integer
     * @extends Types.Numeric
     *
     * Represents an Integer type.
     *
     * This class should not be instantiated. It is only used
     * to represent relation header attribute types or function return types.
     */

}, {

    /**
     * Coerces an arbitrary value to Integer type
     * @param value
     * @returns {number}
     */
    coerce : function(value){

        if (_.isNumber(value) || _.isString(value)){
            return parseInt(value);
        }

    },

    /**
     * String representation of the Integer Type
     * @returns {string}
     */
    toString: function () {
        return 'Integer'
    },

    primitive : true,

    type : 'Integer'

});

module.exports = Integer;

