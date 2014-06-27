var Type = require('./../Type');
var _ = require('lodash');

var TObject = Type.extend({

    /**
     * @class Types.Object
     * @extends Type
     */

    /**
     * Creates new Object instances
     * @param value
     */
    constructor: function (value) {

        Type.apply(this, Array.prototype.slice.call(arguments, 0));

        if(_.isObject(value)){
            _.extend(this, value);
        }

        this.name = 'Object';
    },

    /**
     * String representation of an Object value
     * @returns {string}
     */
    toString: function () {

        return 'Object'

    }

}, {

    /**
     * Method to coerce an arbitrary value into an Object instance
     * @param value
     * @returns {Object}
     */
    coerce : function(value){

        return value;

    },

    /**
     * Mixins for Object type
     */
    payload : [
        require('./../mixins/comparable'),
        require('./../mixins/connectable'),
        require('./../mixins/not')
    ],

    /**
     * Returns the value of the object
     * @param object
     * @returns {*}
     */
    value : function(object){

        return object;

    },

    /**
     * Tests for equality between two objects
     * @param object1
     * @param object2
     * @returns {boolean}
     */
    equal: function (object1, object2) {

        return _.isEqual(object1, object2)

    },

    /**
     * String representation of an object
     * @returns {string}
     */
    toString: function () {
        return 'Object'
    },

    /**
     * Object is not a primitive type
     */
    primitive : false,

    type : 'Object'

});


module.exports = TObject;

