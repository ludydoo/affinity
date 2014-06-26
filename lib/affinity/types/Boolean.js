var Type = require('./../Type');
var _ = require('lodash');

var TBoolean = Type.extend({

    /**
     * @class Types.Boolean
     * @param value
     */
    constructor: function (value) {
        Type.apply(this, arguments);
    },

    valueOf: function () {

        return this.value;

    }

}, {

    equal: function (boolean1, boolean2) {

        if(!_.isBoolean(boolean1)){
            boolean1 = boolean1.value();
        }
        if(!_.isBoolean(boolean2)){
            boolean2 = boolean2.value();
        }

        return boolean1 === boolean2;

    },

    toString: function () {
        return 'TBoolean'
    },

    value : function(boolean){

        if(_.isBoolean(boolean)){
            return boolean;
        } else {
            return boolean.value();
        }

    },

    payload : [
        require('./../mixins/comparable'),
        require('./../mixins/connectable'),
        require('./../mixins/not')
    ],

    type : 'TBoolean'

});

module.exports = TBoolean;

