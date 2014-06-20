var Type = require('./../Type');

var TNumeric = Type.extend({

    constructor: function (value) {
        Type.apply(this, arguments);
    },

    toString: function () {

        return 'Numeric'

    }

}, {

    equal: function (numeric1, numeric2) {

        return (numeric1.value === numeric2.value);

    },

    toString: function () {
        return 'TNumeric'
    }

});


module.exports = TNumeric;

