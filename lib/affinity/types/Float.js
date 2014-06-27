var Numeric = require('./Numeric.js');

var Float = Numeric.extend({

    /**
     * @class Types.Float
     * @extends Types.Numeric
     *
     * Represents a Float type. This class should not be instantiated. It is only used
     * to represent relation header attribute types or function return types.
     */

}, {

    /**
     * String representation of the Float type
     * @static
     * @returns {string}
     */
    toString: function () {
        return 'Float'
    },

    primitive : true,

    type : 'Float'

});

module.exports = Float;

