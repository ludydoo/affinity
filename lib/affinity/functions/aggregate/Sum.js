var Function = require('./../../Function');

var Float = require('./../../types/Float.js');

var Sum = Function.extend({

    /**
     * @class Functions.Aggregate.Count
     * @extends Function
     *
     * Functions that calculates the sum of all values for
     * an attribute in a relation
     *
     * Example :
     *
     *     var relation = new affinity.Relation([
     *         { name : { type : affinity.String } },
     *         { age : { type : affinity.Integer } }
     *     ],[
     *         ['John Doe', 23],
     *         ['Mark Clinton', 36],
     *         ['Super Woman', 56]
     *     ]);
     *
     *     var age = relation.get('age');
     *
     *     var sum = relation.sum(age);
     *
     *     console.log(sum.value());
     *
     *     // 115
     */

    constructor : function(attribute){

        Function.apply(this, Array.prototype.slice.call(arguments,0));

        this.name = 'Sum';

        this.type(Float);

        this.attribute = attribute;

        this.relation = attribute.header.relation;

    },

    value : function(){

        var relation = this.relation;

        var attributeName = this.attribute.name;

        var sum = 0;

        relation.each(function(tuple){

            sum += tuple.get(attributeName);

        });

        return sum;

    }

});

module.exports = Sum;