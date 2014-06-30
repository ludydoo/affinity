var Function = require('./../../Function');

var Average = require('./Average.js');

var Float = require('./../../types/Float.js');

var Variance = Function.extend({

    /**
     * @class Functions.Aggregate.Variance
     * @extends Function
     *
     * Functions that returns the variance
     * of attribute values in a relation
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
     *     var variance = relation.variance(age)
     *
     *     console.log(variance.value());
     *
     *     // 184.22222
     */

    constructor : function(attribute){

        Function.apply(this, Array.prototype.slice.call(arguments,0));

        this.name = 'Sum';

        this.type(Float);

        this.attribute = attribute;

        this.relation = attribute.header.relation

    },

    value : function(){

        var attribute = this.attribute;

        var relation = this.relation;

        var attributeName = this.attribute.name;

        var average = new Average(attribute).value();

        var length = relation.length();

        var totalVariance = 0;

        relation.each(function(tuple){

            var value = tuple.get(attributeName);

            totalVariance += Math.pow((value - average), 2);

        });

        return totalVariance / length;

    }
});

module.exports = Variance;