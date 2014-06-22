var Function = require('./../../Function.js');
var TString = require('./../../types/String.js');
var value = require('./../../helpers/value');

var Matching = Function.extend({

    constructor: function () {

        Function.apply(this, Array.prototype.slice.call(arguments, 0));

        this.type(TString);

        this.name = 'Matching';

    },

    value: function () {

        var regex = value(this.parameters[1]);
        return value(this.parameters[0]).test(regex);

    }

});

module.exports = Matching;