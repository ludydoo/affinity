var Relation = require('./../Relation.js');
var Header = require('./../Header.js');
var Tuple = require('./../Tuple.js');
var _ = require('lodash');
var debug = require('./../helpers/debug');
var equal = require('./../helpers/equal');

var RSemiDifference = Relation.extend(
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

            var that = this;

            // BeforeGetHeader
            this.ee.once('beforeGetHeader', function () {

                debug.semiDifference.trace('beforeGetHeader');

                Header.assertSameNameSameType(that.rels[0].header(), that.rels[1].header());

                that.commonAttributes = that.rels[0].header().setIntersection(that.rels[1].header());

                that.header().copy(that.rels[0].header());

            });


            // BeforeGetBody
            this.ee.once('beforeGetBody', function () {

                that.header();

                debug.semiDifference.trace('beforeGetBody');

                var rel1 = that.rels[0];
                var rel2 = that.rels[1];

                rel1.each(function(tuple1){

                    var counterpart = false;

                    if(that.commonAttributes.count() > 0){

                        rel2.each(function(tuple2){

                            // Check if tuple1 has same common attributes as tuple2

                            var match = Tuple.matchOnAttributes(tuple1, tuple2, that.commonAttributes);

                            if(match){
                                counterpart = true;
                                return false;
                            }

                        });

                    }

                    if(!counterpart){
                        that.add(tuple1.clone(), false);
                    }

                })

            });

        }

    });

module.exports = RSemiDifference;