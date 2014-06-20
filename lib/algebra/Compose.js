var Relation = require('./../Relation.js');
var Header = require('./../Header.js');
var _ = require('lodash');
var debug = require('./../helpers/debug');

var RCompose = Relation.extend(
    /** @lends RCompose.prototype */
    {

        /**
         * @class RCompose
         * @augments Relation
         * @param {Relation} relationA The relation A
         * @param {Relation} relationB The relation B
         * @classdesc
         * The Compose operator will perform a natural join between A and B while removing the common attributes
         * @example
         *
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
         * // +------------------------+---------------------+--------------------+
         * // | characterId : TInteger | firstName : TString | lastName : TString |
         * // +========================+=====================+====================+
         * // | 1                      | John                | Doe                |
         * // +------------------------+---------------------+--------------------+
         * // | 2                      | Mary                | Poppins            |
         * // +------------------------+---------------------+--------------------+
         * // | 3                      | Lucky               | Luke               |
         * // +------------------------+---------------------+--------------------+
         *
         * var relationB = new affinity.Relation([
         *          {characterId: { type: affinity.Integer}},
         *          {fan: { type: affinity.String}}
         *      ],[
         *          [1, 'Mr X'],
         *          [1, 'Miss Dibble'],
         *          [2, 'Nat Bibble']
         *      ]);
         * // +------------------------+---------------+
         * // | characterId : TInteger | fan : TString |
         * // +========================+===============+
         * // | 1                      | Mr X          |
         * // +------------------------+---------------+
         * // | 1                      | Miss Dibble   |
         * // +------------------------+---------------+
         * // | 2                      | Nat Bibble    |
         * // +------------------------+---------------+
         *
         * var relationC = relationA.compose(relationB);
         *
         * // or
         *
         * var relationC = new affinity.Compose(relationA, relationB)
         *
         * // +---------------------+--------------------+---------------+
         * // | firstName : TString | lastName : TString | fan : TString |
         * // +=====================+====================+===============+
         * // | John                | Doe                | Mr X          |
         * // +---------------------+--------------------+---------------+
         * // | John                | Doe                | Miss Dibble   |
         * // +---------------------+--------------------+---------------+
         * // | Mary                | Poppins            | Nat Bibble    |
         * // +---------------------+--------------------+---------------+
         * //
         */
        constructor: function (relationA, relationB) {

            debug.compose.trace('#constructor');

            this.rels = [relationA, relationB];

            Relation.call(this);

        },

        bindEvents: function () {

            debug.compose.trace('#bindEvents');

            // Calling the parent bindEvents
            RCompose.__super__.bindEvents.call(this);

            // BeforeGetBody
            this.ee.once('beforeGetBody', function () {

                debug.compose.trace('beforeGetBody');

                // Add Compose build header code here

            });

            // BeforeGetHeader
            this.ee.once('beforeGetHeader', function () {

                debug.compose.trace('beforeGetHeader');

                // Add Compose build tuples code here

            });

        }

    });

module.exports = RCompose;