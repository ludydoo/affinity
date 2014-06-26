var Function = require('./../../Function.js');
var TString = require('./../../types/String.js');
var value = require('./../../helpers/value');

var Uppercase = Function.extend({

    /**
     * @class Functions.String.Uppercase
     */
    constructor: function () {

        Function.apply(this, Array.prototype.slice.call(arguments, 0));

        this.type(TString);

        this.name = 'Uppercase';

    },

    value: function () {

        return value(this.parameters[0]).toUpperCase();

    }

});

module.exports = Uppercase;