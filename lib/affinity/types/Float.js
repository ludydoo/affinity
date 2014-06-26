var TNumeric = require('./Numeric.js');

var TFloat = TNumeric.extend({

    /**
     * @class Types.Float
     * @param value
     */
    constructor: function (value) {
        TNumeric.apply(this, arguments);
    }

}, {

    toString: function () {
        return 'TFloat'
    },

    primitive : true,

    type : 'TFloat'

});

module.exports = TFloat;

