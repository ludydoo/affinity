var Type = require('./../Type');
var _ = require('lodash');

var TObject = Type.extend({

    /**
     * @class Types.Object
     * @param value
     */
    constructor: function (value) {

        Type.apply(this, Array.prototype.slice.call(arguments, 0));

        this.name = 'TObject';
    },

    toString: function () {

        return 'Object'

    }

}, {

    coerce : function(value){

        return value;

    },

    payload : [
        require('./../mixins/comparable'),
        require('./../mixins/connectable'),
        require('./../mixins/not')
    ],

    value : function(numeric){

        if(_.isNumber(numeric)){
            return numeric;
        } else {
            return numeric.value();
        }

    },

    equal: function (numeric1, numeric2) {

        if(!_.isNumber(numeric1)){
            numeric1 = numeric1.value()
        }
        if(!_.isNumber(numeric2)){
            numeric2 = numeric2.value();
        }

        return (numeric1 === numeric2);

    },

    toString: function () {
        return 'TObject'
    },

    primitive : false,

    type : 'TObject'

});


module.exports = TObject;

