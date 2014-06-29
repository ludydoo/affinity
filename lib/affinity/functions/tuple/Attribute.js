var Function = require('./../../Function.js');
var Type = require('./../../Type.js');
var TBoolean = require('./../../types/Boolean.js');

var TupleAttribute = Function.extend({

    /**
     * @class Functions.Tuple.AttributeValue
     * @extends Function
     *
     * When building a predicate, you pass the Header Attributes directly like this :
     *
     *     var extended = relation.extend(relation.get('attribute1').plus(relation.get('attribute2')));
     *
     * In the documentation for Relation#get, it is specified that it returns an Attribute.
     *
     * Though, when building predicates for restriction or extension operators, we convert the passed Attributes
     * into a function TupleAttribute. So this is the same as the above :
     *
     *     var extended = relation.extend(new affinity.TupleAttribute('attribute1').plus(new affinity.TupleAttribute('attribute2')));
     *
     * Directly passing the Header Attribute is just some nice sugar.
     *
     */
    constructor: function (attributeName) {

        Function.apply(this, arguments);

        this.attributeName = attributeName;

        this.name = 'TupleAttribute';

    },

    /**
     * Gets the function return value
     * @returns {*}
     */
    value: function () {

        var tuple = this.parameters[0];

        var attributeName = this.attributeName;

        if(!tuple.attributes.hasOwnProperty(attributeName)){
            throw new Error('Attribute "'+attributeName+'" does not exist in Tuple');
        }

        return tuple.get(attributeName);

    },

    /**
     * Assigns a tuple to the function
     * @param tuple
     */
    assignTuple : function(tuple){

        this.parameters[0] = tuple;

    }

},{


});

module.exports = TupleAttribute;