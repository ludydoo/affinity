var Function = require('./../../Function');

var compare = require('./../../helpers/compare.js');

var Integer = require('./../../types/Integer.js');

var Minimum = Function.extend({

    /**
     * @class Functions.Aggregate.Minimum
     * @extends Function
     *
     * Functions that returns the minimum value of an attribute in a relation.
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
     *     var min = relation.min(age);
     *
     *     console.log(min.value());
     *
     *     // 23
     */

    constructor : function(attribute){

        Function.apply(this, Array.prototype.slice.call(arguments,0));

        this.name = 'Minimum';

        this.type(Integer);

        this.attribute = attribute;

        this.relation = attribute.header.relation;

    },

    value : function(){

        var relation = this.relation;

        var attribute = this.attribute;

        var type = this.attribute.type;

        var min = null;

        relation.each(function(tuple){

            var value = tuple.get(attribute.name);

            if(min === null){
                min = value;
            } else if ( compare(type, value, min) < 0 ){
                min = value;
            }

        });

        return min;

    }

});

module.exports = Minimum;