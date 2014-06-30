var Function = require('./../../Function');

var Boolean = require('./../../types/Boolean.js');

var _ = require('lodash');

var All = Function.extend({

    /**
     * @class Functions.Aggregate.All
     * @extends Function
     *
     * Functions that checks if all the tuples in a relation match the
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
     *     var all = relation.all(age.gt(20));
     *
     *     console.log(all.value());
     *
     *     // true
     */

    constructor : function(relation, predicate){

        Function.apply(this, Array.prototype.slice.call(arguments,0));

        this.name = 'All';

        this.predicate = predicate;

        this.relation = relation;

        this.type(Boolean);

    },


    value : function(){

        var relation = this.relation;

        var predicate = this.predicate;

        var result = true;

        predicate.convertAttributeToTuple();

        relation.each(function(tuple){

            predicate.assignTuple(tuple);

            if( predicate.value() === false ){

                result = false;
                return false;

            }

        });

        return result;

    }

});

module.exports = All;