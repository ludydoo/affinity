var TNumeric = require('./Numeric.js');

var TFloat = TNumeric.extend({

    constructor: function (value) {
        TNumeric.apply(this, arguments);
    }

}, {

    toString: function () {
        return 'TFloat'
    }

});

module.exports = TFloat;

