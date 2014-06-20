var Type = require('./../Type');

var TNumeric = Type.extend({

    constructor: function (value) {

        Type.apply(this, Array.prototype.slice.call(arguments, 0));

        this.name = 'TNumeric';
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
    },

    type : 'TNumeric'

});


module.exports = TNumeric;

