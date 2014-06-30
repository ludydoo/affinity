var Function = require('./../../Function');

var Boolean = require('./../../types/Boolean.js');

var _ = require('lodash');

var Any = Function.extend({

    /**
     * @class Functions.Aggregate.Any
     * @extends Function
     *
     * Functions that checks if any of the tuples in a relation match the
     * given boolean predicate.
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
     *     var name = relation.get('name');
     *     var age = relation.get('age')
     *
     *     var any = relation.any(age.gt(50));
     *
     *     console.log(any.value());
     *
     *     // true
     */

    constructor : function(relation, predicate){

        Function.apply(this, Array.prototype.slice.call(arguments,0));

        this.name = 'Any';

        this.type(Boolean);

        this.relation = relation;

        this.predicate = predicate;

    },

    value : function(){

        var relation = this.relation;

        var predicate = this.predicate;

        var result = false;

        predicate.convertAttributeToTuple();

        relation.each(function(tuple){

            predicate.assignTuple(tuple);

            if( predicate.value() === true ){

                result = true;
                return false;

            }

        });

        return result;

    }
});

module.exports = Any;