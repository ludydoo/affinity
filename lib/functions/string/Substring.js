var Function = require('./../../Function.js');
var TString = require('./../../types/String.js');
var value = require('./../../helpers/value');

var Uppercase = Function.extend({

    constructor: function () {

        Function.apply(this, Array.prototype.slice.call(arguments, 0));

        this.type(TString);

        this.name = 'Substring';

    },

    value: function () {

        var start = value(this.parameters[1]);
        var length = value(this.parameters[2]);
        return value(this.parameters[0]).substr(start, length);

    }

});

module.exports = Uppercase;