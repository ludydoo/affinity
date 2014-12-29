var Numeric = require('./Numeric.js');
var _ = require('lodash');

var Float = Numeric.extend({

    /**
     * @class Types.Float
     * @extends Types.Numeric
     *
     * Represents a Float type.
     *
     * This class should not be instantiated. It is only used
     * to represent relation header attribute types or function return types.
     */

}, {

    /**
     * String representation of the Float type
     * @static
     * @returns {string}
     */
    toString: function () {
        return 'Float'
    },


    /**
     * Coerces an arbitrary value to Float type
     * @param value
     * @returns {number}
     */
    coerce : function(value){

        if (_.isNumber(value) || _.isString(value)){
            return parseFloat(value);
        }

    },

    primitive : true,

    type : 'Float'

});

module.exports = Float;

