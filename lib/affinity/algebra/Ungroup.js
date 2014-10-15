var Relation = require('./../Relation.js');
var Header = require('./../Header.js');
var Tuple = require('./../Tuple.js');
var _ = require('lodash');
var debug = require('./../helpers/debug');



var Ungroup = Relation.extend(
    {

        /**
         * @class Operators.Ungroup
         * @extends Relation
         * @param {Relation} relation The relation to ungroup
         * @param {String[]} groupedAttributes The grouped attribute names to ungroup
         *
         * The Ungroup operation will ungroup the specified grouped attributes.
         *
         *     var relationA = new affinity.Relation([
         *              {a: { type: affinity.Integer}},
         *              {b: { type: affinity.Integer}},
         *              {c: { type: affinity.Integer}}
         *          ],[
         *              [1, 2, 3],
         *              [4, 5, 6],
         *              [4, 9, 9],
         *              [7, 8, 9]
         *          ]);
         *
         *     var relationB = relationA.group('groupedAttribute', ['b', 'c'])
         *
         *     // +--------------+---------------------------------+
         *     // | a : TInteger | groupedAttribute : Relation     |
         *     // +==============+=================================+
         *     // | 1            | +--------------+--------------+ |
         *     // |              | | b : TInteger | c : TInteger | |
         *     // |              | +==============+==============+ |
         *     // |              | | 2            | 3            | |
         *     // |              | +--------------+--------------+ |
         *     // +--------------+---------------------------------+
         *     // | 4            | +--------------+--------------+ |
         *     // |              | | b : TInteger | c : TInteger | |
         *     // |              | +==============+==============+ |
         *     // |              | | 5            | 6            | |
         *     // |              | +--------------+--------------+ |
         *     // |              | | 9            | 9            | |
         *     // |              | +--------------+--------------+ |
         *     // +--------------+---------------------------------+
         *     // | 7            | +--------------+--------------+ |
         *     // |              | | b : TInteger | c : TInteger | |
         *     // |              | +==============+==============+ |
         *     // |              | | 8            | 9            | |
         *     // |              | +--------------+--------------+ |
         *     // +--------------+---------------------------------+
         *
         *     var relationC = relationB.ungroup(['groupedAttribute']);
         *
         *     //                 <----UNGROUPED ATTRIBUTES---->
         *     // +--------------+--------------+--------------+
         *     // | a : TInteger | b : TInteger | c : TInteger |
         *     // +==============+==============+==============+
         *     // | 1            | 2            | 3            |
         *     // +--------------+--------------+--------------+
         *     // | 4            | 5            | 6            |
         *     // +--------------+--------------+--------------+
         *     // | 4            | 9            | 9            |
         *     // +--------------+--------------+--------------+
         *     // | 7            | 8            | 9            |
         *     // +--------------+--------------+--------------+
         *
         *     relationC.equal(relationA) // true
         */
        constructor: function (relation, groupedAttributes) {

            debug.ungroup.trace('#constructor');

            this.relation = relation;
            this.groupedAttributeNames = groupedAttributes;

            Relation.call(this);

        },

        bindEvents: function () {

            debug.ungroup.trace('#bindEvents');

            // Calling the parent bindEvents
            Ungroup.__super__.bindEvents.call(this);

            var that = this;

            // BeforeGetHeader
            this.ee.once('beforeGetHeader', function () {

                debug.ungroup.trace('beforeGetHeader');

                // Let's "flatten" the headers. We will add the nested relation header attributes
                // to this relation

                _.forEach(that.groupedAttributeNames, function(groupedAttributeName){

                    // A RVA (relation-valued attribute) stores a copy of the header of it's nested relations
                    // in the attribute.relationHeader property.
                    var relationHeader = that.relation.header().get(groupedAttributeName).relationHeader;

                    that.header().copy(relationHeader);

                });

                // Let's add all the other non-grouped attributes to the header

                that.relation.header().each(function(attribute){

                    var grouped = _.any(that.groupedAttributeNames, function(groupedAttributeName){

                        return groupedAttributeName === attribute.name;

                    });

                    if(!grouped){

                        that.header().add(attribute.clone());

                    }

                });

            });

            // BeforeGetBody
            this.ee.once('beforeGetBody', function () {

                debug.ungroup.trace('beforeGetBody');

                that.relation.each(function(tuple){

                    _.forEach(that.groupedAttributeNames, function(groupedAttributeName){

                        tuple.get(groupedAttributeName).each(function(nestedTuple){

                            var newTuple = new Tuple();

                            // Copy the non grouped attributes from the root tuple
                            newTuple.copy(tuple, that.groupedAttributeNames, true);

                            // Copy the attributes from the nested tuple

                            newTuple.copy(nestedTuple);

                            that.add(newTuple, false);

                        })

                    })

                })

            });

        },

        afterAdd : function(relation, tuple){
            var result = this.relation.ungroup(this.groupedAttributeNames);
            this.adjustTo(result);
        },

        afterRemove : function(relation, tuple){
            var result = this.relation.ungroup(this.groupedAttributeNames);
            this.adjustTo(result);
        },

        afterUpdate : function(relation, tuple, attributeName, value, oldValue){
            var result = this.relation.ungroup(this.groupedAttributeNames);
            this.adjustTo(result);
        }

    });

module.exports = Ungroup;