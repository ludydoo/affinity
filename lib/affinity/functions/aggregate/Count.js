var Function = require('./../../Function');

var Integer = require('./../../types/Integer.js');

var _ = require('lodash');

var Count = Function.extend({

    /**
     * @class Functions.Aggregate.Count
     * @extends Function
     *
     * Functions that counts the number of tuples
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
     *     var count = relation.count()
     *
     *     console.log(count.value());
     *
     *     // 3
     */

    constructor : function(relation){

        Function.apply(this, Array.prototype.slice.call(arguments,0));

        this.name = 'Count';

        this.type(Integer);

        this.relation = relation;

    },

    value : function(){

        return this.relation.length();

    }

});

module.exports = Count;