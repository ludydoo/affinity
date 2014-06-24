var Type = require('./../Type');
var TBoolean = require('./Boolean');
var _ = require('lodash');

var TString = Type.extend({

    constructor: function (value) {
        Type.apply(this, arguments);
        this.name = 'TString';
    },

    valueOf : function(){
        return this.value;
    }

}, {

    payload : [
        require('./../mixins/comparable'),
        require('./../mixins/size-comparable'),
        require('./../mixins/operator'),
        require('./../mixins/not')
    ],

    equal: function (str1, str2) {

        if(!_.isString(str1)){
            str1 = str1.value();
        }
        if(!_.isString(str2)){
            str2 = str2.value();
        }

        return str2 === str1;

    },

    toString: function () {
        return 'TString'
    },

    type : 'TString'

});

module.exports = TString;

