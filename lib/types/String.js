var Type = require('./../Type');
var TBoolean = require('./Boolean');

var TString = Type.extend({

    constructor: function (value) {
        Type.apply(this, arguments);
    }

}, {

    equal: function (str1, str2) {

        return (new TBoolean(str1.value === str2.value));

    },
    toString: function () {
        return 'TString'
    }

});

module.exports = TString;

