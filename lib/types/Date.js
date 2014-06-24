var Type = require('./../Type');
var _ = require('lodash');

var TDate = Type.extend({

    constructor: function (value) {

        Type.apply(this, Array.prototype.slice.call(arguments, 0));

        this.name = 'TDate';
    }

}, {

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

    equal: function (date1, date2) {

        if(!_.isDate(date1)){
            date1 = date1.value();
        }
        if(!_.isDate(date2)){
            date2 = date2.value();
        }

        return date1 === date2;

    },

    toString: function () {
        return 'TDate'
    },

    value : function(date){

        if(_.isDate(date)){
            return date;
        } else {
            return date.value();
        }

    },

    payload : [
        require('./../mixins/comparable'),
        require('./../mixins/size-comparable'),
        require('./../mixins/not'),
        require('./../mixins/date'),
    ],

    type : 'TDate'

});

module.exports = TDate;

