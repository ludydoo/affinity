var TNumeric = require('./Numeric.js');

var TInteger = TNumeric.extend({

    constructor: function (value) {

        TNumeric.apply(this, Array.prototype.slice.call(arguments,0));

        this.name = 'TInteger';

    }

}, {


    toString: function () {
        return 'TInteger'
    },

    type : 'TInteger'

});

module.exports = TInteger;

