var Relation = require('./../Relation.js');
var Header = require('./../Header.js');
var _ = require('lodash');
var debug = require('./../helpers/debug');

var RIntersection = Relation.extend(
    /** @lends RIntersection.prototype */
    {

        /**
         * @class RIntersection
         * @param {Relation} relationA
         * @param {Relation} relationB
         * @augments Relation
         * @classdesc
         * The intersection creates a new relation with tuples common in relationA and relationB
         * @example
         * var rel1 = new affinity.Relation([
         *       {a: { type: affinity.Integer}},
         *       {b: { type: affinity.Integer}},
         *       {c: { type: affinity.Integer}}
         *   ], [
         *       [1, 2, 3],
         *       [4, 5, 6],
         *       [7, 8, 9]
         *   ]);
         *
         * var rel2 = new affinity.Relation([
         *      {a: { type: affinity.Integer}},
         *      {b: { type: affinity.Integer}},
         *      {c: { type: affinity.Integer}}
         *  ], [
         *      [1, 2, 3]
         *  ]);
         *
         *var rel3 = new affinity.Intersection(rel1, rel2);
         *
         * // +--------------+--------------+--------------+
         * // | a : TInteger | b : TInteger | c : TInteger |
         * // +==============+==============+==============+
         * // | 1            | 2            | 3            |
         * // +--------------+--------------+--------------+
         */

        constructor: function (relationA, relationB) {

            this.rels = [relationA, relationB];

            Relation.call(this);

        },

        bindEvents: function () {

            debug.intersection.trace('#bindEvents');

            RIntersection.__super__.bindEvents.call(this);

            var that = this;

            this.ee.once('beforeGetBody', function () {

                debug.intersection.trace('beforeGetBody');

                var rel1 = that.rels[0],
                    rel2 = that.rels[1];

                rel1.each(function (tuple1) {

                    if (rel2.index(tuple1) !== null) {
                        that.add(tuple1.clone(), false);
                    }

                })

            });

            this.ee.once('beforeGetHeader', function () {

                debug.intersection.trace('beforeGetHeader');

                if (!that.rels[0].header().equal(that.rels[1].header())) {
                    throw new Error('Relations are not union compatible');
                }

                that.header(that.rels[0].header().clone());

            });

        }

    });

module.exports = RIntersection;