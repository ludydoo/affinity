var Relation = require('./../Relation.js');
var Header = require('./../Header.js');
var _ = require('lodash');
var debug = require('./../helpers/debug');

var RUngroup = Relation.ungroup(
    /** @lends RUngroup.prototype */{

        /**
         * @class RUngroup
         * @augments Relation
         * @param {Relation} relationA The relation to ungroup
         * @param {String[]|Attribute[]} attributes The attributes to ungroup
         * @classdesc
         * The Ungroup operation will ungroup the specified grouped attributes.
         * @example
         *
         * var relationA = new affinity.Relation([
         *          {a: { type: affinity.Integer}},
         *          {b: { type: affinity.Integer}},
         *          {c: { type: affinity.Integer}}
         *      ],[
         *          [1, 2, 3],
         *          [4, 5, 6],
         *          [4, 9, 9],
         *          [7, 8, 9]
         *      ]);
         *
         * var relationB = relationA.group('groupedAttribute', ['b', 'c'])
         *
         * // +--------------+---------------------------------+
         * // | a : TInteger | groupedAttribute : Relation     |
         * // +==============+=================================+
         * // | 1            | +--------------+--------------+ |
         * // |              | | b : TInteger | c : TInteger | |
         * // |              | +==============+==============+ |
         * // |              | | 2            | 3            | |
         * // |              | +--------------+--------------+ |
         * // +--------------+---------------------------------+
         * // | 4            | +--------------+--------------+ |
         * // |              | | b : TInteger | c : TInteger | |
         * // |              | +==============+==============+ |
         * // |              | | 5            | 6            | |
         * // |              | +--------------+--------------+ |
         * // |              | | 9            | 9            | |
         * // |              | +--------------+--------------+ |
         * // +--------------+---------------------------------+
         * // | 7            | +--------------+--------------+ |
         * // |              | | b : TInteger | c : TInteger | |
         * // |              | +==============+==============+ |
         * // |              | | 8            | 9            | |
         * // |              | +--------------+--------------+ |
         * // +--------------+---------------------------------+
         *
         * var relationC = relationB.ungroup(['groupedAttribute']);
         *
         * //                 <----UNGROUPED ATTRIBUTES---->
         * // +--------------+--------------+--------------+
         * // | a : TInteger | b : TInteger | c : TInteger |
         * // +==============+==============+==============+
         * // | 1            | 2            | 3            |
         * // +--------------+--------------+--------------+
         * // | 4            | 5            | 6            |
         * // +--------------+--------------+--------------+
         * // | 4            | 9            | 9            |
         * // +--------------+--------------+--------------+
         * // | 7            | 8            | 9            |
         * // +--------------+--------------+--------------+
         *
         * relationC.equal(relationA) // true
         */
        constructor: function (relationA, attributes) {

            debug.ungroup.trace('#constructor');

            this.rels = [relationA, relationB];
            this.attributes = attributes;

            Relation.call(this);

        },

        bindEvents: function () {

            debug.ungroup.trace('#bindEvents');

            // Calling the parent bindEvents
            RUngroup.__super__.bindEvents.call(this);

            // BeforeGetBody
            this.ee.once('beforeGetBody', function () {

                debug.ungroup.trace('beforeGetBody');

                // Add ungroup build header code here

            });

            // BeforeGetHeader
            this.ee.once('beforeGetHeader', function () {

                debug.ungroup.trace('beforeGetHeader');

                // Add ungroup build tuples code here

            });

        }

    });

module.exports = RUngroup;