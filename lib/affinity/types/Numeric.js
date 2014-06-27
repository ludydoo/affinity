var Type = require('./../Type');
var _ = require('lodash');

var Numeric = Type.extend({

    /**
     * @class Types.Numeric
     *
     * Represents a Numeric type. This class should not be instantiated. It is only used
     * to represent relation header attribute types or function return types.
     */

}, {

    /**
     * @param {*} value
     * @returns {number}
     *
     * Coerces an arbitrary value to type float
     *
     */
    coerce : function(value){

        if(_.isNumber(value)){
            return value;
        } else if (_.isString(value)){
            return parseFloat(value);
        }

    },

    /**
     * Mixins for Numeric types
     */
    payload : [
        require('./../mixins/comparable'),
        require('./../mixins/size-comparable'),
        require('./../mixins/numeric'),
        require('./../mixins/connectable'),
        require('./../mixins/not')
    ],

    /**
     * Returns the value of the Numeric object
     * @param numeric
     * @returns {*}
     */
    value : function(numeric){

        return numeric;

    },

    equal: function (numeric1, numeric2) {

        return (numeric1 === numeric2);

    },

    toString: function () {
        return 'Numeric'
    },

    primitive : true,

    type : 'Numeric'

});


module.exports = Numeric;

