var Function = require('./../../Function.js');
var TString = require('./../../types/String.js');

var Length = Function.extend({

    constructor: function () {

        this.minArgs = 1;

        this.maxArgs = 1;

        this.expect = TString;

        Function.apply(this, arguments);

    }

});

module.exports = Length;