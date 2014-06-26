var Function = require('./../../Function.js');
var TInteger = require('./../../types/Integer.js');
var value = require('./../../helpers/value');

var Length = Function.extend({

    /**
     * @class Functions.String.Length
     */
    constructor: function () {

        Function.apply(this, Array.prototype.slice.call(arguments, 0));

        this.type(TInteger);

        this.name = 'Length';

    },

    value: function () {

        return value(this.parameters[0]).length;

    }

});

module.exports = Length;