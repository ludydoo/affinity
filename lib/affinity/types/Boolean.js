var Type = require('./../Type');
var _ = require('lodash');

var TBoolean = Type.extend(/**
 * @class Types.Boolean
 * @extends Type
 *
 * Represents a Boolean Type
 *
 * This class should not be instantiated. It is only used to define
 * relation header attribute types or function return types.
 *
 */{



}, {

    /**
     * @param {boolean|Types.Boolean} boolean1
     * @param {boolean|Types.Boolean} boolean2
     * @static
     * @returns {boolean}
     *
     * Method to check if two boolean object are equal
     *
     */
    equal: function (boolean1, boolean2) {

        return boolean1 === boolean2;

    },

    /**
     * @static
     * @returns {string}
     *
     * String representation of the Boolean type
     */
    toString: function () {
        return 'Boolean'
    },

    /**
     * @param {boolean} boolean
     * @static
     * @returns {boolean}
     *
     * Returns the value of a boolean
     */
    value : function(boolean){

        return boolean;

    },

    /**
     * Mixins for Booleans
     * @static
     */
    payload : [
        require('./../mixins/comparable'),
        require('./../mixins/connectable'),
        require('./../mixins/not')
    ],

    type : 'Boolean'

});

module.exports = TBoolean;

