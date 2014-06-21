var Relation = require('./../Relation.js');
var Header = require('./../Header.js');
var _ = require('lodash');
var debug = require('./../helpers/debug');
var equal = require('./../helpers/equal');

var RSemiJoin = Relation.extend(
    /** @lends RSemiJoin.prototype */
    {

        /**
         * @class RSemiJoin
         * @augments Relation
         * @param {Relation} relationA The relation from which to seek tuples with their counterparts in B
         * @param {Relation} relationB The relation containing the counterparts
         * @classdesc
         * The SemiJoin will find all tuples in A that have a counterpart in B on their common attributes
         * @example
         *
         * // Find the characters that have fans
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
         * var relationC = relationA.sjoin(relationB);
         *
         * // or
         *
         * var relationC = new affinity.SemiJoin(relationA, relationB)
         *
         * // +------------------------+---------------------+--------------------+
         * // | characterId : TInteger | firstName : TString | lastName : TString |
         * // +========================+=====================+====================+
         * // | 1                      | John                | Doe                |
         * // +------------------------+---------------------+--------------------+
         * // | 2                      | Mary                | Poppins            |
         * // +------------------------+---------------------+--------------------+
         * //
         * // John Doe and Mary Poppins have fans
         */
        constructor: function (relationA, relationB) {

            debug.semiJoin.trace('#constructor');

            this.rels = [relationA, relationB];

            Relation.call(this);

        },

        bindEvents: function () {

            debug.semiJoin.trace('#bindEvents');

            // Calling the parent bindEvents
            RSemiJoin.__super__.bindEvents.call(this);

            var that = this;

            // BeforeGetHeader
            this.ee.once('beforeGetHeader', function () {

                debug.semiJoin.trace('beforeGetHeader');

                Header.assertSameNameSameType(that.rels[0].header(), that.rels[1].header());

                that.commonAttributes = that.rels[0].header().setIntersection(that.rels[1].header());

                that.header().copy(that.rels[0].header());

            });


            // BeforeGetBody
            this.ee.once('beforeGetBody', function () {

                debug.semiJoin.trace('beforeGetBody');

                var relation1 = that.rels[0];
                var relation2 = that.rels[1];

                relation1.each(function(tuple1){

                    var counterpart = false;

                    if (that.commonAttributes.count() > 0){

                        relation2.each(function(tuple2){

                            var match = true;

                            that.commonAttributes.each(function(commonAttribute){

                                if (!equal(null, tuple1.get(commonAttribute.name),tuple2.get(commonAttribute.name))){
                                    match = false;
                                    return false;
                                }

                            });

                            if(match){
                                counterpart = true;
                                return false;
                            }

                        });

                    }

                    if(counterpart){
                        that.add(tuple1.clone());
                    }

                })

            });

        }

    });

module.exports = RSemiJoin;