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
         *
         * var relationA = new affinity.Relation([
         *          {characterId: { type: affinity.Integer}},
         *          {firstName: { type: affinity.String}},
         *          {lastName: { type: affinity.String}}
         *      ],[
         *          [1, 'John', 'Doe'],
         *          [2, 'Mary', 'Poppins'],
         *          [3, 'Lucky', 'Luke']
         *      ]);
         *
         * var relationB = new affinity.Relation([
         *          {characterId: { type: affinity.Integer}},
         *          {fan: { type: affinity.String}}
         *      ],[
         *          [1, 'Mr X'],
         *          [1, 'Miss Dibble'],
         *          [2, 'Nat Bibble']
         *      ]);
         *
         * var relationC = relationA.join(relationB);
         *
         * // or
         *
         * var relationC = new affinity.Join(relationA, relationB)
         *
         * // <---COMMON ATTRIBUTE---->
         * // +------------------------+---------------------+--------------------+---------------+
         * // | characterId : TInteger | firstName : TString | lastName : TString | fan : TString |
         * // +========================+=====================+====================+===============+
         * // | 1                      | John                | Doe                | Mr X          |
         * // +------------------------+---------------------+--------------------+---------------+
         * // | 2                      | John                | Doe                | Miss Dibble   |
         * // +------------------------+---------------------+--------------------+---------------+
         * // | 3                      | Mary                | Poppins            | Nat Bibble    |
         * // +------------------------+---------------------+--------------------+---------------+
         * //
         *
         */
        constructor: function (relationA, relationB) {

            this.rels = [relationA, relationB];
            this._commonAttributes = [];

            Relation.call(this);

            var that = this;

        },

        bindEvents: function () {

            debug.join.trace('#bindEvents');

            RJoin.__super__.bindEvents.call(this);

            var that = this;

            this.ee.once('beforeGetBody', function () {

                debug.join.trace('beforeGetBody');

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

                debug.join.trace('beforeGetHeader');

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