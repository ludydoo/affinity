var Function = require('./../../Function.js');
var TString = require('./../../types/String.js');
var value = require('./../../helpers/value');

var Uppercase = Function.extend({

    /**
     * @class Functions.String.Substring
     *
     * Returns a substring from a string
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
     *     var extended = relation.extend([{"name.substr(0,5)" : name.substr(0, 5)}]);
     *
     *     //or
     *
     *     var extended = relation.extend([
     *         { "name.substr(0,5)" : new affinity.Substring(name, 0, 5) }
     *     ]);
     *
     *     extended.print();
     *
     *     // +-----------------+---------------------------+
     *     // | name : String   | name.substr(0,5) : String |
     *     // +=================+===========================+
     *     // | John Doe        | John                      |
     *     // +-----------------+---------------------------+
     *     // | Mark Clinton    | Mark                      |
     *     // +-----------------+---------------------------+
     *     // | Bo Vril         | Bo Vr                     |
     *     // +-----------------+---------------------------+
     */
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