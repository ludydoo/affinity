var Function = require('./../../Function.js');
var TString = require('./../../types/String.js');
var value = require('./../../helpers/value');

var Uppercase = Function.extend({

    /**
     * @class Functions.String.Uppercase
     *
     * Returns the uppercase version of a string
     *
     * Example with Extension operator :
     *
     *     var affinity = require('./index.js');
     *
     *     var relation = new affinity.Relation([
     *          { upcs : { type : affinity.String}}
     *     ],[
     *          ['John Doe'], ['Mark Clinton'], ['Bo Vril']
     *     ]);
     *
     *     var extended = relation.extend([{"name.uppercase()" : relation.get('name').uppercase()}]);
     *
     *     // or
     *
     *     var extended = relation.extend([
     *         { "name.uppercase()" : new affinity.Uppercase(name) }
     *     ])
     *
     *     extended.print();
     *
     *     // +-----------------+---------------------------+
     *     // | name : String   | name.uppercase() : String |
     *     // +=================+===========================+
     *     // | John Doe        | JOHN DOE                  |
     *     // +-----------------+---------------------------+
     *     // | Mark Clinton    | MARK CLINTON              |
     *     // +-----------------+---------------------------+
     *     // | Bo Vril         | BO VRIL                   |
     *     // +-----------------+---------------------------+
     */
    constructor: function () {

        Function.apply(this, Array.prototype.slice.call(arguments, 0));

        this.type(TString);

        this.name = 'Uppercase';

    },

    /**
     * Gets the function return value
     * @returns {string}
     */
    value: function () {

        return value(this.parameters[0]).toUpperCase();

    }

});

module.exports = Uppercase;


