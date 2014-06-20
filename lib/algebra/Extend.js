var Relation = require('./../Relation.js');
var Header = require('./../Header.js');
var _ = require('lodash');
var debug = require('./../helpers/debug');

var RExtend = Relation.extend(
    /** @lends RExtend.prototype */{

        /**
         * @typedef {Object} extendParameter
         * @property {String} name The name of the new attribute
         * @property {Function} expression The expression to evaluate when setting the attribute value
         */

        /**
         * @class RExtend
         * @augments Relation
         * @param {Relation} relationA The relation from which to remove the tuples
         * @param {extendParameter[]} parameters The arguments from which to calculate the new attribute value. It is an array of
         * @classdesc
         * The Extend operation allows the addition of calculated {@link Header} {@link Attribute}s
         * @example
         *
         * var relationA = new affinity.Relation([
         *          {name: { type: affinity.String}},
         *          {born: { type: affinity.Integer}},
         *          {died: { type: affinity.Integer}}
         *      ],[
         *          ['Aristotle', -384, -322],
         *          ['Plato',     -428, -348],
         *          ['Socrates',  -470, -399]
         *      ]);
         *
         * var born = relationA.get('born')
         * var died = relationA.get('died')
         *
         * var relationB = relationA.extend([{ lived : died.minus(born) }]);
         *
         * //or
         *
         * var relationB = new affinity.Extend(relationA, [{ lived : died.minus(born) }]);
         *
         * //                                                      <-EXTENDED ATTR---->
         * // +----------------+-----------------+-----------------+------------------+
         * // | name : TString | born : TInteger | died : TInteger | lived : TInteger |
         * // +================+=================+=================+==================+
         * // | Aristotle      | -384            | -322            | 62               |
         * // +----------------+-----------------+-----------------+------------------+
         * // | Plato          | -428            | -348            | 80               |
         * // +----------------+-----------------+-----------------+------------------+
         * // | Socrates       | -470            | -399            | 71               |
         * // +----------------+-----------------+-----------------+------------------+
         */
        constructor: function (relationA, parameters) {

            debug.extend.trace('#constructor');

            this.rels = [relationA, relationB];

            Relation.call(this);

        },

        bindEvents: function () {

            debug.extend.trace('#bindEvents');

            // Calling the parent bindEvents
            RExtend.__super__.bindEvents.call(this);

            // BeforeGetBody
            this.ee.once('beforeGetBody', function () {

                debug.extend.trace('beforeGetBody');

                // Add extend build header code here

            });

            // BeforeGetHeader
            this.ee.once('beforeGetHeader', function () {

                debug.extend.trace('beforeGetHeader');

                // Add extend build tuples code here

            });

        }

    });

module.exports = RExtend;