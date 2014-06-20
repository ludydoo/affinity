var TNumeric = require('./Numeric.js');

var TInteger = TNumeric.extend({

    constructor: function (value) {
        TNumeric.apply(this, arguments);
    }

}, {


    toString: function () {
        return 'TInteger'
    }

});

module.exports = TInteger;

