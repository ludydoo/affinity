var Relation = require('./../Relation.js');
var Header = require('./../Header.js');
var _ = require('lodash');
var debug = require('./../helpers/debug');

var Difference = Relation.extend(



    {

        /**
         * @class Operators.Difference
         * @extends Relation
         * @param {Relation} relationA The relation from which to remove the tuples
         * @param {Relation} relationB The relation that will be substracted from the other
         *
         * The Difference operation gives the first relation's tuples minus those that are in the second relation.
         *
         *     var relationA = new affinity.Relation([
         *              {a: { type: affinity.Integer}},
         *              {b: { type: affinity.Integer}},
         *              {c: { type: affinity.Integer}}
         *          ],[
         *              [1, 2, 3],
         *              [4, 5, 6],
         *              [7, 8, 9]
         *          ]);

         *     var relationB = new affinity.Relation([
         *              {a: { type: affinity.Integer}},
         *              {b: { type: affinity.Integer}},
         *              {c: { type: affinity.Integer}}
         *          ], [
         *              [1, 2, 3]
         *          ]);
         *
         *     var rel3 = relationA.difference(relationB);
         *
         *     // or
         *
         *     var rel4 = new affinity.Difference(relationA, relationB)
         *
         *     // +--------------+--------------+--------------+
         *     // | a : TInteger | b : TInteger | c : TInteger |
         *     // +==============+==============+==============+
         *     // | 4            | 5            | 6            |
         *     // +--------------+--------------+--------------+
         *     // | 7            | 8            | 9            |
         *     // +--------------+--------------+--------------+
         */
        constructor: function (relationA, relationB) {

            debug.difference.trace('#constructor');

            this.rels = [relationA, relationB];

            Relation.call(this);

        },

        bindEvents: function () {

            debug.difference.trace('#bindEvents');

            Difference.__super__.bindEvents.call(this);

            var that = this;

            var rel1 = that.rels[0];
            var rel2 = that.rels[1];

            // BeforeGetHeader
            this.ee.once('beforeGetHeader', function () {

                var header1 = rel1.header();
                var header2 = rel2.header();

                debug.difference.trace('beforeGetHeader');

                Header.assertUnionCompatible(header1, header2);

                that.header().copy(header1);

            });


            // BeforeGetBody
            this.ee.once('beforeGetBody', function () {

                debug.difference.trace('beforeGetBody');

                rel1.each(function (tuple1) {

                    if (rel2.index(tuple1) === null) {
                        that.add(tuple1.clone(), false);
                    }

                });

            });


        }

    });

module.exports = Difference;