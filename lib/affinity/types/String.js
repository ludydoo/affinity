var Type = require('./../Type');
var TBoolean = require('./Boolean');
var _ = require('lodash');

var String = Type.extend({

    /**
     * @class Types.String
     * @extends Type
     *
     * Represents a String Attribute Type. Should not be instantiated. It is only
     * used to represent relation header attribute types or function return types.
     *
     */

}, {

    coerce : function(value){

        return value;

    },

    /**
     * Mixins for String types
     */
    payload : [
        require('./../mixins/comparable'),
        require('./../mixins/size-comparable'),
        require('./../mixins/connectable'),
        require('./../mixins/not')
    ],

    /**
     * Checks for equality between two strings
     * @param str1
     * @param str2
     * @returns {boolean}
     */
    equal: function (str1, str2) {

        return str2 === str1;

    },

    /**
     * String representation of a String Type
     * @returns {string}
     */
    toString: function () {
        return 'String'
    },

    /**
     * String is a primitive
     */
    primitive : true,

    type : 'TString'

});

module.exports = String;

