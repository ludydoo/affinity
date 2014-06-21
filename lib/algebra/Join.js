var Relation = require('./../Relation.js');
var Header = require('./../Header.js');
var Tuple = require('./../Tuple.js');
var debug = require('./../helpers/debug');

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

            var rel1 = that.rels[0];
            var rel2 = that.rels[1];

            // BeforeGetHeader

            this.ee.once('beforeGetHeader', function () {

                debug.join.trace('beforeGetHeader');

                var header1 = rel1.header();
                var header2 = rel2.header();

                Header.assertSameNameSameType(header1, header2);

                that.commonAttributes = Header.commonAttributes(header1, header2);

                that.header().copy(header1);
                that.header().copy(header2);

            });


            // BeforeGetBody

            this.ee.once('beforeGetBody', function () {

                that.header();

                debug.join.trace('beforeGetBody');

                // Loop through each body of the first relation
                rel1.each(function (tuple1) {

                    // Loop through each tuples of the second relation
                    rel2.each(function (tuple2) {

                        var match = Tuple.matchOnAttributes(tuple1, tuple2, that.commonAttributes);

                        // If a match was detected
                        if (match) {

                            // Clone the first tuple
                            var newTuple = new Tuple();

                            // Copy the joined tuple attributes
                            newTuple.copy(tuple1);
                            newTuple.copy(tuple2);

                            // Then add it to the relation
                            that.add(newTuple, false);
                        }

                    }, that);

                }, that)

            });


        }

    });

module.exports = RJoin;