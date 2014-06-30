var Function = require('./../../Function');

var compare = require('./../../helpers/compare.js');

var Integer = require('./../../types/Integer.js');

var Maximum = Function.extend({

    /**
     * @class Functions.Aggregate.Maximum
     * @extends Function
     *
     * Functions that returns the largest value of an attribute in a relation.
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
     *     var max = relation.max(age)
     *
     *     console.log(max.value());
     *
     *     // 56
     */

    constructor : function(attribute){

        Function.apply(this, Array.prototype.slice.call(arguments,0));

        this.name = 'Maximum';

        this.type(Integer);

        this.attribute = attribute;

        this.relation = attribute.header.relation;

    },

    value : function(){

        var relation = this.relation;

        var attribute = this.attribute;

        var type = this.attribute.type;

        var max = null;

        relation.each(function(tuple){

            var value = tuple.get(attribute.name);

            if(max === null){
                max = value;
            } else if ( compare(type, value, max) > 0 ){
                max = value;
            }

        });

        return max;

    }
});

module.exports = Maximum;