var Relation = require('./../Relation.js');
var Header = require('./../Header.js');
var Tuple = require('./../Tuple.js');

var _ = require('lodash');

var RJoin = Relation.extend(
    /** @lends RJoin.prototype */
    {

        /**
         * @class RJoin
         * @param {Relation} relationA
         * @param {Relation} relationB
         * @augments Relation
         * @classdesc
         * The Join operation returns all possible combinations of tuples from relationA and relationB where
         * the tuples have the same value for their common attributes.
         * @example
         * var rel1 = new affinity.Relation([
         *                    {a : {type : affinity.Integer}},
         *                    {b : {type : affinity.Integer}},
         *                    {c : {type : affinity.Integer}}
         *                ],[
         *                    [1, 1, 3],
         *                    [2, 2, 3],
         *                    [3, 3, 2],
         *                    [4, 4, 2],
         *                    [5, 5, 2],
         *                    [5, 1, 4],
         *                    [5, 2, 4],
         *                    [5, 3, 4]
         *
         *                ]);
         *
         *                var rel2 = new affinity.Relation([
         *                    {c : {type : affinity.Integer}},
         *                    {d : {type : affinity.Integer}}
         *                ],[
         *                    [2, 1],
         *                    [2, 2],
         *                    [2, 3],
         *                    [3, 1],
         *                    [3, 2],
         *                    [3, 3]
         *                ]);
         *
         *                var rel3 = rel1.join(rel2);
         *
         * // +--------------+--------------+--------------+--------------+
         * // | a : TInteger | b : TInteger | c : TInteger | d : TInteger |
         * // +==============+==============+==============+==============+
         * // | 1            | 1            | 3            | 1            |
         * // +--------------+--------------+--------------+--------------+
         * // | 1            | 1            | 3            | 2            |
         * // +--------------+--------------+--------------+--------------+
         * // | 1            | 1            | 3            | 3            |
         * // +--------------+--------------+--------------+--------------+
         * // | 2            | 2            | 3            | 1            |
         * // +--------------+--------------+--------------+--------------+
         * // | 2            | 2            | 3            | 2            |
         * // +--------------+--------------+--------------+--------------+
         * // | 2            | 2            | 3            | 3            |
         * // +--------------+--------------+--------------+--------------+
         * // | 3            | 3            | 2            | 1            |
         * // +--------------+--------------+--------------+--------------+
         * // | 3            | 3            | 2            | 2            |
         * // +--------------+--------------+--------------+--------------+
         * // | 3            | 3            | 2            | 3            |
         * // +--------------+--------------+--------------+--------------+
         * // | 4            | 4            | 2            | 1            |
         * // +--------------+--------------+--------------+--------------+
         * // | 4            | 4            | 2            | 2            |
         * // +--------------+--------------+--------------+--------------+
         * // | 4            | 4            | 2            | 3            |
         * // +--------------+--------------+--------------+--------------+
         * // | 5            | 5            | 2            | 1            |
         * // +--------------+--------------+--------------+--------------+
         * // | 5            | 5            | 2            | 2            |
         * // +--------------+--------------+--------------+--------------+
         * // | 5            | 5            | 2            | 3            |
         * // +--------------+--------------+--------------+--------------+
         */
        constructor: function (relationA, relationB) {

            this.rels = [relationA, relationB];
            this._commonAttributes = [];

            Relation.call(this);

            var that = this;

        },

        bindEvents: function () {

            RJoin.__super__.bindEvents.call(this);

            var that = this;

            this.ee.once('beforeGetBody', function () {

                var rel1 = that.rels[0],
                    rel2 = that.rels[1];

                // Loop through each body of the first relation
                rel1.each(function (tuple1) {

                    // Loop through each tuples of the second relation
                    rel2.each(function (tuple2) {

                        var match = true;

                        // Loop through common attributes
                        _.forEach(that._commonAttributes, function (commonAttribute) {

                            // If both tuples don't have the same common attributes, next
                            if (tuple1.get(commonAttribute.name) != tuple2.get(commonAttribute.name)) {
                                match = false;
                                return false;
                            }

                        }, that);

                        // If a match was detected
                        if (match) {

                            // Clone the first tuple
                            var tuple = tuple1.clone();

                            // Then add all of the attributes of the second tuple into it
                            for (var a in tuple2.attributes) {
                                if (tuple2.attributes.hasOwnProperty(a))
                                    tuple.set(a, tuple2.get(a));
                            }

                            // Then add it to the relation
                            that.add(tuple, false);

                        }


                    }, that);

                }, that)


            });

            this.ee.once('beforeGetHeader', function () {

                var rel1 = that.rels[0];
                var rel2 = that.rels[1];

                var header1 = rel1.header();
                var header2 = rel2.header();

                // First, loop through the first relation's attributes
                header1.each(function (attribute1) {

                    // Clone the attribute
                    var attr = attribute1.clone();

                    // Add the attribute to the header
                    that.header().add(attr);

                    // Check if the other relation also has an attribute with that name
                    if (header2.get(attribute1.name) !== null) {

                        // Headers cannot contain same attribute names of different types
                        if (header2.get(attribute1.name).type !== attribute1.type) {
                            throw new Error('Join operation cannot accept two attributes with the same name but not the same type');
                        }

                        // Both attributes are of the same name and type

                        // Register the attribute in an array for used when building tuples
                        that._commonAttributes.push(attr);

                    }

                }, that);

                // Then add the second relation attributes.
                // Duplicates will be eliminated automatically

                rel2.header().each(function (attribute2) {
                    that.header().add(attribute2.clone());
                }, that);

            });
        }

    });

module.exports = RJoin;