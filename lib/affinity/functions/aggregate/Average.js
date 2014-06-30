var Function = require('./../../Function');

var Float = require('./../../types/Float.js');

var _ = require('lodash');

var Average = Function.extend({

    /**
     * @class Functions.Aggregate.Average
     * @extends Function
     *
     * Functions that returns the average for a relation
     * attribute
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
     *     var max = relation.avg(age)
     *
     *     console.log(max.value());
     *
     *     // 38.33333333
     */

    constructor : function(attribute){

        Function.apply(this, Array.prototype.slice.call(arguments,0));

        this.name = 'Average';

        this.type(Float);

        this.attribute = attribute;

        this.relation = attribute.header.relation;

    },

    value : function(){

        var attribute = this.attribute;

        var relation = this.relation;

        var result = 0;

        var length = relation.length();

        relation.each(function(tuple){

            result += tuple.get(attribute.name);

        });

        result = result / length;

        return result;

    }
});

module.exports = Average;