var Relation = require('./../Relation.js');
var Header = require('./../Header.js');
var _ = require('lodash');
var debug = require('./../helpers/debug');

var RDifference = Relation.extend(
    /** @lends RDifference.prototype */{

        /**
         * @class RDifference
         * @augments Relation
         * @param {Relation} relationA The relation from which to remove the tuples
         * @param {Relation} relationB The relation that will be substracted from the other
         * @classdesc
         * The Difference operation gives the first relation's tuples minus those that are in the second relation.
         * @example
         *
         * var relationA = new affinity.Relation([
         *          {a: { type: affinity.Integer}},
         *          {b: { type: affinity.Integer}},
         *          {c: { type: affinity.Integer}}
         *      ],[
         *          [1, 2, 3],
         *          [4, 5, 6],
         *          [7, 8, 9]
         *      ]);

         * var relationB = new affinity.Relation([
         *          {a: { type: affinity.Integer}},
         *          {b: { type: affinity.Integer}},
         *          {c: { type: affinity.Integer}}
         *      ], [
         *          [1, 2, 3]
         *      ]);
         *
         * var rel3 = relationA.difference(relationB);
         *
         * // or
         *
         * var rel4 = new affinity.Difference(relationA, relationB)
         *
         * // +--------------+--------------+--------------+
         * // | a : TInteger | b : TInteger | c : TInteger |
         * // +==============+==============+==============+
         * // | 4            | 5            | 6            |
         * // +--------------+--------------+--------------+
         * // | 7            | 8            | 9            |
         * // +--------------+--------------+--------------+
         */
        constructor: function (relationA, relationB) {

            debug.difference.trace('#constructor');

            this.rels = [relationA, relationB];

            Relation.call(this);

        },

        bindEvents: function () {

            debug.difference.trace('#bindEvents');

            RDifference.__super__.bindEvents.call(this);

            var that = this;

            this.ee.once('beforeGetBody', function () {

                debug.difference.trace('beforeGetBody');

                var rel1 = that.rels[0],
                    rel2 = that.rels[1];

                rel1.each(function (tuple1) {

                    if (rel2.index(tuple1) === null) {
                        that.add(tuple1, false);
                    }

                });

            });

            this.ee.once('beforeGetHeader', function () {

                debug.difference.trace('beforeGetHeader');

                if (!that.rels[0].header().equal(that.rels[1].header())) {
                    throw new Error('Relations are not union compatible');
                }

                that.header(that.rels[0].header().clone());

            });

        }

    });

module.exports = RDifference;