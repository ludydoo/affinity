var Function = require('./../../Function.js');
var TString = require('./../../types/String.js');
var value = require('./../../helpers/value');

var Test = Function.extend({

    /**
     * @class Functions.String.Test
     *
     * Tests a regex on a string.
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
     *     var extended = relation.extend([{test : name.test(/Doe/)}]);
     *
     *     extended.print();
     *
     *     // +-----------------+----------------+
     *     // | name : String   | test : Boolean |
     *     // +=================+================+
     *     // | John Doe        | true           |
     *     // +-----------------+----------------+
     *     // | Mark Clinton    | false          |
     *     // +-----------------+----------------+
     *     // | Bo Vril         | false          |
     *     // +-----------------+----------------+
     */
    constructor: function () {

        Function.apply(this, Array.prototype.slice.call(arguments, 0));

        this.type(TString);

        this.name = 'Test';

    },

    /**
     * Gets the function return value
     * @returns {boolean}
     */
    value: function () {

        var regex = value(this.parameters[1]);
        return regex.test(value(this.parameters[0]));

    }

});

module.exports = Test;