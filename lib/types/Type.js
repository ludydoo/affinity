var Type = require('./../Type');
var TBoolean = require('./Boolean');

var TType = Type.extend({

    constructor: function (value) {

        Type.apply(this, arguments);

    }

}, {

    equal: function (type1, type2) {

        return (type1.value().prototype === type2.value().prototype);

    },

    toString: function () {
        return 'TType'
    },

    type : 'TType'

});

module.exports = TType;

