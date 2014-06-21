var Relation = require('./../Relation.js');
var Header = require('./../Header.js');
var _ = require('lodash');
var debug = require('./../helpers/debug');

var RRestriction = Relation.extend(
    /** @lends RRestriction.prototype */
    {

        /**
         * @class RRestriction
         * @param {Relation} relation
         * @param {Function} predicate
         * @augments Relation
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
         * var characterId = relationA.get('characterId')
         * var firstName = relationA.get('firstName')
         * var lastName = relationA.get('lastName')
         *
         *
         *
         * var relationC = relationA.restrict(characterId.equals(1))
         *
         * // or
         *
         * var relationC = new affinity.Projection(relationA, characterId.equals(1));
         *
         * // +------------------------+---------------------+--------------------+
         * // | characterId : TInteger | firstName : TString | lastName : TString |
         * // +========================+=====================+====================+
         * // | 1                      | John                | Doe                |
         * // +------------------------+---------------------+--------------------+
         *
         */
        constructor: function (relation, predicate) {

            this.rel = relation;
            this.predicate = predicate;
            Relation.call(this);

        },

        bindEvents: function () {

            debug.restriction.trace('#bindEvents');

            RRestriction.__super__.bindEvents.call(this);

            var that = this;

            that.ee.once('beforeGetBody', function () {

                debug.restriction.trace('beforeGetBody');

                that.predicate.convertAttributeToTuple();

                that.rel.each(function (tuple) {

                    if (that.predicate.set({tuple: tuple}) == true) {
                        that.add(tuple.clone(), false);
                    }

                }, that)

            });

            that.ee.once('beforeGetHeader', function () {

                debug.restriction.trace('beforeGetHeader');

                that._header = that.rel.header().clone();

            });

        }

    });

module.exports = RRestriction;