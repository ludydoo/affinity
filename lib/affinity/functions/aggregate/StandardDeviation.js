var Function = require('./../../Function');

var Float = require('./../../types/Float.js');

var Variance = require('./Variance.js');

var StandardDeviation = Function.extend({

    /**
     * @class Functions.Aggregate.StandardDeviation
     * @extends Function
     *
     * Functions that returns the standard deviation
     * of an attribute in a relation
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
     *     var stdev = relation.standardDeviation(age)
     *
     *     console.log(stdev.value());
     *
     *     // 16.6232768531
     */

    constructor : function(attribute){

        Function.apply(this, Array.prototype.slice.call(arguments,0));

        this.name = 'StandardDeviation';

        this.type(Float);

        this.attribute = attribute;

    },

    value : function(){

        var attribute = this.attribute;

        var variance = new Variance(attribute).value();

        return Math.sqrt(variance);

    }
});

module.exports = StandardDeviation;