var Type = require('./../Type');
var _ = require('lodash');

var TNumeric = Type.extend({

    constructor: function (value) {

        Type.apply(this, Array.prototype.slice.call(arguments, 0));

        this.name = 'TNumeric';
    },

    toString: function () {

        return 'Numeric'

    }

}, {

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
        return 'TNumeric'
    },

    type : 'TNumeric'

});


module.exports = TNumeric;

