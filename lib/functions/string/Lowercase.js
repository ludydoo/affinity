var Function = require('./../../Function.js');
var TString = require('./../../types/String.js');
var value = require('./../../helpers/value');

var Length = Function.extend({

    constructor: function () {

        Function.apply(this, Array.prototype.slice.call(arguments, 0));

        this.type(TString);

        this.name = 'Lowercase';

    },

    value: function () {

        return value(this.parameters[0]).toLowerCase;

    }

});

module.exports = Length;