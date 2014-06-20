var Type = require('./../Type');

var TDate = Type.extend({

    constructor: function (value) {
        Type.apply(this, arguments);
    }

}, {

    toString: function () {
        return 'TDate'
    }

});

module.exports = TDate;

