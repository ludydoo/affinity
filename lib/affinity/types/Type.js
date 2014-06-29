var Type = require('./../Type');
var TBoolean = require('./Boolean');

var TType = Type.extend({

    /**
     * @class Types.Type
     * @extends Type
     *
     * Represents a Type Attribute type.
     *
     * Should not be instantiated. It is only
     * used to represent relation header attribute types or function return types.
     *
     */

}, {

    /**
     * Check if two Types are equal
     * @param {Function} type1
     * @param {Function} type2
     * @returns {boolean}
     */
    equal: function (type1, type2) {

        return (type1 === type2);

    },

    toString: function () {
        return 'Type'
    },

    type : 'Type'

});

module.exports = TType;

