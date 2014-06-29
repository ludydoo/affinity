var Function = require('./../../Function.js');
var TString = require('./../../types/String.js');
var value = require('./../../helpers/value');

var Length = Function.extend({

    /**
     * @class Functions.String.Lowercase
     *
     * Returns the lowercase version of a string
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
     *     var extended = relation.extend([{lwcs : relation.get('name').lowercase()}]);
     *
     *     extended.print();
     *
     *     // +-----------------+-------------------+
     *     // | name : String   | lwcs : String    |
     *     // +=================+===================+
     *     // | John Doe        | john doe          |
     *     // +-----------------+-------------------+
     *     // | Mark Clinton    | mark clinton      |
     *     // +-----------------+-------------------+
     *     // | Bo Vril         | bo vril           |
     *     // +-----------------+-------------------+
     */
    constructor: function () {

        Function.apply(this, Array.prototype.slice.call(arguments, 0));

        this.type(TString);

        this.name = 'Lowercase';

    },

    value: function () {

        return value(this.parameters[0]).toLowerCase();

    }

});

module.exports = Length;