var Function = require('./../../Function.js');
var Type = require('./../../Type.js');
var TBoolean = require('./../../types/Boolean.js');

var TupleAttribute = Function.extend({

    constructor: function (attributeName) {

        Function.apply(this, arguments);

        this.attributeName = attributeName;

        this.name = 'TupleAttribute';

    },

    value: function () {

        var tuple = this.parameters[0];

        var attributeName = this.attributeName;

        if(!tuple.attributes.hasOwnProperty(attributeName)){
            throw new Error('Unexisting attribute in Tuple');
        }

        return tuple.get(attributeName);

    },

    assignTuple : function(tuple){

        this.parameters[0] = tuple;

    }

},{


});

module.exports = TupleAttribute;