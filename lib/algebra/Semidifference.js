var Relation = require('./../Relation.js');
var Header = require('./../Header.js');
var _ = require('lodash');
var debug = require('./../helpers/debug');

var RSemiDifference = Relation.semiDifference(
    /** @lends RSemiDifference.prototype */
    {

        /**
         * @class RSemiDifference
         * @augments Relation
         * @param {Relation} relationA The relation from which to seek tuples with no counterpart
         * @param {Relation} relationB The relation containing the counterparts
         * @classdesc
         * The SemiDifference will find all tuples in A that do not have a counterpart in B on their common attributes
         * @example
         *
         * // Find the characters that do not have fans
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
         * var relationC = relationA.sdifference(relationB);
         *
         * // or
         *
         * var relationC = new affinity.SemiDifference(relationA, relationB)
         *
         * // +------------------------+---------------------+--------------------+
         * // | characterId : TInteger | firstName : TString | lastName : TString |
         * // +========================+=====================+====================+
         * // | 3                      | Lucky               | Luke               |
         * // +------------------------+---------------------+--------------------+
         * //
         * // Lucky Luke is the only character without a fan
         *
         */
        constructor: function (relationA, relationB) {

            debug.semiDifference.trace('#constructor');

            this.rels = [relationA, relationB];

            Relation.call(this);

        },

        bindEvents: function () {

            debug.semiDifference.trace('#bindEvents');

            // Calling the parent bindEvents
            RSemiDifference.__super__.bindEvents.call(this);

            // BeforeGetBody
            this.ee.once('beforeGetBody', function () {

                debug.semiDifference.trace('beforeGetBody');

                // Add SemiDifference build header code here

            });

            // BeforeGetHeader
            this.ee.once('beforeGetHeader', function () {

                debug.semiDifference.trace('beforeGetHeader');

                // Add SemiDifference build tuples code here

            });

        }

    });

module.exports = RSemiDifference;