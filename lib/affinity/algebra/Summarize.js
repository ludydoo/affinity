var Relation = require('./../Relation.js');
var Header = require('./../Header.js');
var Tuple = require('./../Tuple.js');
var Attribute = require('./../Attribute.js');
var _ = require('lodash');
var debug = require('./../helpers/debug');

var Summarize = Relation.extend({

    /**
     * @class Operators.Summarize
     * @extends Relation
     *
     * The Summarize operation will be the result of a projection on a given relation on
     * the given attributes, while extending this resulting relation with calculated
     * attributes.
     *
     * Example :
     *
     *     var relation = new affinity.Relation([
     *         { id : {type : affinity.Integer} },
     *         { name : {type : affinity.String} },
     *         { age : {type : affinity.Integer} },
     *     ],[
     *         [1, 'John Doe', 23],
     *         [2, 'John Doe', 35],
     *         [3, 'John Doe', 27],
     *         [4, 'Bo Derek', 12],
     *         [5, 'Bo Derek', 7],
     *         [6, 'Marilyn Monroe', 16],
     *     ]);
     *
     *     var age = relation.get('age');
     *
     *     var summarized = relation.summarize(
     *         ['name'],
     *         [
     *             { "age.avg()" : age.avg()        },
     *             { "age.sum()" : age.sum()        },
     *             { "count()"   : affinity.count() }
     *         ]
     *     );
     *
     *     summarized.print();
     *
     *     // +------------------+----------------------+---------------------+---------------------+
     *     // | name : String    | age.avg() : Float    | age.sum() : Float   | count() : Integer   |
     *     // +==================+======================+=====================+=====================+
     *     // | John Doe         | 28.333333333333332   | 85                  | 3                   |
     *     // +------------------+----------------------+---------------------+---------------------+
     *     // | Bo Derek         | 9.5                  | 19                  | 2                   |
     *     // +------------------+----------------------+---------------------+---------------------+
     *     // | Marilyn Monroe   | 16                   | 16                  | 1                   |
     *     // +------------------+----------------------+---------------------+---------------------+
     */

    /**
     * Create a new Summary relation
     * @param {Relation} relation The relation to summarize
     * @param {Attribute[]|String[]} attributes The attributes to keep
     * @param {Object[]} summaries The summary expressions
     */
    constructor : function(relation, attributes, summaries){

        this.args = {};

        this.args.relation = relation;

        this.args.attributes = attributes;

        this.args.summaries = summaries;

        Relation.call(this);

    },

    bindEvents : function(){

        debug.semiJoin.trace('#bindEvents');

        // Calling the parent bindEvents
        Summarize.__super__.bindEvents.call(this);

        var that = this;

        that.ee.once('beforeGetHeader', function(){

            var relation = that.args.relation;

            var header = relation.header();

            var attributes = that.args.attributes;

            var summaries = that.args.summaries;

            // Check that the given attributes exist in the
            // base header.
            Header.assertAttributesExist(header, attributes);

            // Copy the given attributes from the base header
            that.header().copy(relation.header(), attributes);

            // Add the summaries attributes
            _.forEach(summaries, function(summary){

                var summaryName = Object.keys(summary)[0];

                var summaryExpression = summary[summaryName];

                var summaryType = summaryExpression.type();

                var newAttribute = new Attribute({name : summaryName, type : summaryType});

                that.header().add(newAttribute);

            });

        });

        that.ee.once('beforeGetBody', function(){

            var relation = that.args.relation;

            var header = relation.header();

            var attributes = that.args.attributes;

            var summaries = that.args.summaries;

            var instanceAttributes = new Header();

            instanceAttributes.copy(header, attributes);

            // These are the attributes that will be grouped
            var otherAttributes = header.setDifference(instanceAttributes);

            var otherAttributeNames = [];

            otherAttributes.each(function(otherAttribute){
                otherAttributeNames.push(otherAttribute.name);
            });

            // Create an intermediary group relation
            var grouped = relation.group('___grouped___', otherAttributeNames);

            grouped.each(function(groupedTuple){

                // Create the tuple that will be inserted
                var newTuple = new Tuple();

                // Copy the non-grouped attributes into the new tuple
                newTuple.copy(groupedTuple, attributes);

                // Get the grouped relation
                var groupedRelation = groupedTuple.get('___grouped___');

                _.forEach(summaries, function(summary){

                    var summaryName = Object.keys(summary)[0];

                    var summaryExpression = summary[summaryName];

                    summaryExpression.relation = groupedRelation;

                    var summaryValue = summaryExpression.value();

                    newTuple.set(summaryName, summaryValue);

                });

                that.add(newTuple);

            });

        })

    }

});


module.exports = Summarize;