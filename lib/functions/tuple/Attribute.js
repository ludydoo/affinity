var Function = require('./../../Function.js');
var Type = require('./../../Type.js');
var TBoolean = require('./../../types/Boolean.js');

var TupleAttribute = Function.extend({

    constructor: function (attributeName) {

        this.name = 'TupleAttribute';

        this.minArgs = 1;

        this.maxArgs = 1;

        this.expect = String;

        this.return = Object;

        this.attributeName = attributeName;

        this.tuple = null;

        Function.apply(this, arguments);

    },

    valueOf: function () {

        return this.tuple.get(this.attributeName);

    }

});

module.exports = TupleAttribute;