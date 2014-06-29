var Function = require('./../../Function.js');
var TInteger = require('./../../types/Integer.js');
var value = require('./../../helpers/value');

var Length = Function.extend({

    /**
     * @class Functions.String.Length
     *
     * Returns the length of a string
     *
     * Example with Extension operator :
     *
     *     var affinity = require('./index.js');
     *
     *     var relation = new affinity.Relation([
     *          { name : { type : affinity.String}}
     *     ],[
     *          ['John Doe'], ['Mark Clinton'], ['Bo Vril']
     *     ]);
     *
     *     var name = relation.get('name');
     *
     *     var extended = relation.extend([{"name.length()" : name.length()}]);
     *
     *     // or
     *
     *     var extended = relation.extend([
     *         {"name.length()" : new affinity.Length(name)}
     *     ]);
     *
     *     extended.print();
     *
     *     // +-----------------+-------------------------+
     *     // | name : String   | name.length() : Integer |
     *     // +=================+=========================+
     *     // | John Doe        | 8                       |
     *     // +-----------------+-------------------------+
     *     // | Mark Clinton    | 12                      |
     *     // +-----------------+-------------------------+
     *     // | Bo Vril         | 7                       |
     *     // +-----------------+-------------------------+
     *
     */
    constructor: function () {

        Function.apply(this, Array.prototype.slice.call(arguments, 0));

        this.type(TInteger);

        this.name = 'Length';

    },

    /**
     * Gets the function return value
     * @returns {number}
     */
    value: function () {

        return value(this.parameters[0]).length;

    }

});

module.exports = Length;