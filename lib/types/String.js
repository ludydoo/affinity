var Type = require('./../Type');
var TBoolean = require('./Boolean');

var TString = Type.extend({

    constructor: function (value) {
        Type.apply(this, arguments);
        this.name = 'TString';
    },

    valueOf : function(){
        return this.value;
    }

}, {

    equal: function (str1, str2) {

        return (new TBoolean(str1.valueOf() === str2.valueOf()));

    },

    toString: function () {
        return 'TString'
    },

    type : 'TString'

});

module.exports = TString;

