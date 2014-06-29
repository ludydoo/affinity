var Object = require('./Object');
var _ = require('lodash');

var Date = Object.extend({

    /**
     * @class Types.Date
     * @extends Type
     *
     * Represents a Date type.
     *
     * Should not be instantiated. Only used to represent
     * relation header attribute types or function return types.
     */

}, {

    /**
     * Serialize method for Dates.
     * @param {Date|Types.Date} date
     * @static
     * @returns {number}
     */
    serialize : function(date){

        return date.getTime();

    },

    /**
     * Coerces an arbitrary object into a date
     * @param {string|number|Date|Types.Date} value
     * @static
     * @returns {Date}
     */
    coerce : function(value){

        if(_.isString(value)){
            return new Date(value);
        } else if (_.isNumber(value)){
            var result = new Date();
            result.setTime(value);
            return result;
        } else if(_.isDate(value)){
            return value;
        }

    },

    /**
     * Check if two dates are equal
     * @param {Date|Types.Date} date1
     * @param {Date|Types.Date} date2
     * @static
     * @returns {boolean}
     */
    equal: function (date1, date2) {

        return date1 === date2;

    },

    /**
     * String representation of the Date type
     * @static
     * @returns {string}
     */
    toString: function () {
        return 'Date'
    },

    /**
     * Gets the value of a date
     * @static
     * @param date
     * @returns {Date}
     */
    value : function(date){

        return date;

    },

    /**
     * Mixins for dates
     */
    payload : [
        require('./../mixins/comparable'),
        require('./../mixins/size-comparable'),
        require('./../mixins/not'),
        require('./../mixins/date')
    ],

    type : 'Date'

});

module.exports = Date;

