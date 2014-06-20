var Relation = require('./../Relation.js');
var Header = require('./../Header.js');
var _ = require('lodash');
var debug = require('./../helpers/debug');

var RGroup = Relation.extend(
    /** @lends RGroup.prototype */{

        /**
         * @class RGroup
         * @augments Relation
         * @param {Relation} relationA The relation to group
         * @param {String} attributeName The new grouped attribute name
         * @param {String[]|Attribute[]} attributes The attributes to group
         * @classdesc
         * The Group operation will group the specified tuple's attributes into one, and converting all these attributes into one.
         * The resulting tuples will have an {@link Attribute} whose {@link Type} will be a {@link Relation}. See example.
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
         * //or
         *
         * var relationB = new affinity.Group(relationA, 'groupedAttribute', ['b','c'])
         *
         * //                 <----GROUPING ATTRIBUTE---------->
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
         */
        constructor: function (relationA, attributeName, attributes) {

            debug.group.trace('#constructor');

            this.rels = [relationA, relationB];
            this.attributeName = attributeName;
            this.attributes = attributes;

            Relation.call(this);

        },

        bindEvents: function () {

            debug.group.trace('#bindEvents');

            // Calling the parent bindEvents
            RGroup.__super__.bindEvents.call(this);

            // BeforeGetBody
            this.ee.once('beforeGetBody', function () {

                debug.group.trace('beforeGetBody');

                // Add group build header code here

            });

            // BeforeGetHeader
            this.ee.once('beforeGetHeader', function () {

                debug.group.trace('beforeGetHeader');

                // Add group build tuples code here

            });

        }

    });

module.exports = RGroup;