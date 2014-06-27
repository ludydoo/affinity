var Relation = require('./../Relation.js');
var Header = require('./../Header.js');
var Tuple = require('./../Tuple.js');
var Attribute = require('./../Attribute.js');
var _ = require('lodash');
var debug = require('./../helpers/debug');




var Group = Relation.extend(




    {

        /**
         * @class Operators.Group
         * @extends Relation
         * @param {Relation} relation The relation to group
         * @param {String} attributeName The new grouped attribute name
         * @param {String[]} attributes The attributes to group
         *
         * The Group operation will group the specified tuple's attributes into one.
         * The resulting tuples will have an {@link Attribute} whose {@link Type} will be a {@link Relation}. See example.
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
         *     //or
         *
         *     var relationB = new affinity.Group(relationA, 'groupedAttribute', ['b','c'])
         *
         *     //                 <----GROUPING ATTRIBUTE---------->
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
         */
        constructor: function (relation, attributeName, attributes) {

            debug.group.trace('#constructor');

            this.relation = relation;
            this.groupingAttributeName = attributeName;
            this.groupedAttributeNames= attributes;
            this.groupedAttributes = [];
            this.groupingAttribute = null;

            Relation.call(this);

        },

        bindEvents: function () {

            debug.group.trace('#bindEvents');

            // Calling the parent bindEvents
            Group.__super__.bindEvents.call(this);

            var that = this,
                groupedAttributeNames = this.groupedAttributeNames,
                groupingAttributeName = this.groupingAttributeName,
                relation = this.relation,
                groupedAttributes = that.groupedAttributes;

            // BeforeGetHeader
            this.ee.once('beforeGetHeader', function () {

                // We want to have this kind of relation
                //
                // +----------------+----------------+-------------------------------------+
                // | attr3 : <type> | attr4 : <type> | groupedAttr : Relation              |
                // +================+================+=====================================+
                //
                // Where attr3 and attr4 are non grouped attributes
                // and groupedAttr will contain the grouped attributes relations
                //

                var header = relation.header();

                debug.group.trace('beforeGetHeader');

                // Check that the attributes specified in groupedAttributeNames exists in the base header
                _.forEach(groupedAttributeNames, function(groupedAttributeName){
                    if(header.get(groupedAttributeName) === null){
                        throw new Error('Attribute with name "'+groupedAttributeName+'" does not exist in the header')
                    }
                });

                // Loop through each of the relation's header attributes
                header.each(function(attribute){

                    // Check if the attribute is part of the grouped attributes

                    var present = _.any(groupedAttributeNames, function(groupedAttributeName){
                        return groupedAttributeName === attribute.name;
                    });

                    if(!present){
                        // If it is not present, add it to the header.
                        that.header().add(attribute.clone());
                    } else {
                        // If it is present, store it in the groupedAttributeNames array
                        groupedAttributes.push(attribute);
                    }

                });

                // Let's create the groupingAttributeName and add it to the header

                that.groupingAttribute = new Attribute({name : groupingAttributeName, type : Relation});

                that.header().add(that.groupingAttribute);

            });


            // BeforeGetBody
            this.ee.once('beforeGetBody', function () {

                debug.group.trace('beforeGetBody');


                // Make sure the header is computed

                that.header();


                // Let's loop through each of the relation's tuples

                relation.each(function(tuple){

                    // This variable will store the tuple grouped attribute values
                    var groupedAttributeValues = {};

                    // This variable will store the tuple non-grouped attribute values
                    var nonGroupedAttributeValues = {};

                    // Now, we will build these variables

                    // Let's loop through each of the tuple's attribute values
                    tuple.each(function(value, key){

                        // Check if the current tuple attribute is grouped or not grouped
                        var grouped = _.any(that.groupedAttributes, function(groupedAttribute){
                            return key === groupedAttribute.name;
                        });

                        if(grouped){

                            // Tuple attribute is part of the grouped attributes

                            groupedAttributeValues[key] = value;

                        } else {

                            // Tuple attribute is not part of the grouped attributes

                            nonGroupedAttributeValues[key] = value;

                        }

                    });


                    // The groupedAttributeValues and nonGroupedAttributeValues are now built
                    //
                    // We started with a tuple like
                    // { attr1 : value, attr2 : value, attr3: value, attr4 : value}
                    //
                    // We grouped 'attr1' and 'attr2'
                    //
                    // And we simply divided the tuples into two objects, one containing the attribute values
                    // that are supposed to be grouped, and another that is not supposed to be grouped
                    //
                    // They should look somewhat like :
                    // groupedAttributeValues : { attr1 : value, attr2 : value, ... }
                    // nonGroupedAttributeValues : { attr3 : value, attr4 : value, ...}


                    // If two tuples have the same non grouped attribute values, what we will do
                    // is merge their nonGroupedAttributeValues into a "nested relation", meaning
                    // that we will have a relation that will contain relations.


                    // Let's loop through each tuple of the being-built relation
                    // and see if a tuple already exists with the same nonGroupedAttributeValues


                    var matchingTuple = null;

                    that.each(function(tuple){

                        var match = true;

                        _.forOwn(nonGroupedAttributeValues, function(value, key){

                            if(tuple.get(key) !== value){

                                match = false;
                                return false;

                            }

                        });

                        if(match){
                            matchingTuple = tuple;
                            return false;
                        }

                    });


                    if (matchingTuple === null){

                        // A tuple with the same non grouped attribute values has not been found.
                        // We will create it and create the nested relation too.

                        var newTuple = new Tuple(nonGroupedAttributeValues);


                        // This tuple should look like
                        // +----------------+----------------+
                        // | attr3 : <type> | attr4 : <type> |
                        // +================+================+
                        // | value          | value          |
                        // +----------------+----------------+


                        // Creating the relation

                        var newRelation = new Relation();


                        // Adding the grouped attributes to the new nested relation header

                        _.forOwn(groupedAttributes, function(attribute){

                            newRelation.header().add(attribute.clone());

                        });

                        // We will store the relation header in the root relation header attribute
                        // So that we will know what kind of relation this is without having to access
                        // the body

                        that.groupingAttribute.relationHeader = newRelation.header().clone();

                        // This relation should look like
                        // +----------------+----------------+
                        // | attr1 : <type> | attr2 : <type> |
                        // +================+================+


                        // Setting the relation in the tuple grouped attribute

                        newTuple.set(groupingAttributeName, newRelation);

                        // The tuple will now be
                        // +----------------+----------------+-------------------------------------+
                        // | attr3 : <type> | attr4 : <type> | groupedAttr : Relation              |
                        // +================+================+=====================================+
                        // | value          | value          | +----------------+----------------+ |
                        // |                |                | | attr1 : <type> | attr2 : <type> | |
                        // |                |                | +================+================+ |
                        // +----------------+----------------+-------------------------------------+



                        // Adding the tuple to the relation

                        that.add(newTuple, false);


                        // A matching tuple now exists because we just created it

                        matchingTuple = newTuple;

                    }

                    // We create the tuple that will be inserted in the nested relation

                    var nestedTuple = new Tuple(groupedAttributeValues);

                    // We add this tuple to the nested relation

                    matchingTuple.get(groupingAttributeName).add(nestedTuple, false);

                    // And voilà!

                });


            });

        }

    });

module.exports = Group;