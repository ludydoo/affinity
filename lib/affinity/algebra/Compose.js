var Relation = require('./../Relation.js');
var Header = require('./../Header.js');
var Tuple = require('./../Tuple.js');
var _ = require('lodash');
var debug = require('./../helpers/debug');

var Compose = Relation.extend(

    {

        /**
         * @class Operators.Compose
         * @extends Relation
         * @param {Relation} relationA The relation A
         * @param {Relation} relationB The relation B
         *
         * The Compose operator will perform a natural join between A and B while removing the common attributes
         *
         *     var relationA = new affinity.Relation([
         *              {characterId: { type: affinity.Integer}},
         *              {firstName: { type: affinity.String}},
         *              {lastName: { type: affinity.String}}
         *          ],[
         *              [1, 'John', 'Doe'],
         *              [2, 'Mary', 'Poppins'],
         *              [3, 'Lucky', 'Luke']
         *          ]);
         *     // +------------------------+---------------------+--------------------+
         *     // | characterId : TInteger | firstName : TString | lastName : TString |
         *     // +========================+=====================+====================+
         *     // | 1                      | John                | Doe                |
         *     // +------------------------+---------------------+--------------------+
         *     // | 2                      | Mary                | Poppins            |
         *     // +------------------------+---------------------+--------------------+
         *     // | 3                      | Lucky               | Luke               |
         *     // +------------------------+---------------------+--------------------+
         *
         *     var relationB = new affinity.Relation([
         *              {characterId: { type: affinity.Integer}},
         *              {fan: { type: affinity.String}}
         *          ],[
         *              [1, 'Mr X'],
         *              [1, 'Miss Dibble'],
         *              [2, 'Nat Bibble']
         *          ]);
         *     // +------------------------+---------------+
         *     // | characterId : TInteger | fan : TString |
         *     // +========================+===============+
         *     // | 1                      | Mr X          |
         *     // +------------------------+---------------+
         *     // | 1                      | Miss Dibble   |
         *     // +------------------------+---------------+
         *     // | 2                      | Nat Bibble    |
         *     // +------------------------+---------------+
         *
         *     var relationC = relationA.compose(relationB);
         *
         *     // or
         *
         *     var relationC = new affinity.Compose(relationA, relationB)
         *
         *     // +---------------------+--------------------+---------------+
         *     // | firstName : TString | lastName : TString | fan : TString |
         *     // +=====================+====================+===============+
         *     // | John                | Doe                | Mr X          |
         *     // +---------------------+--------------------+---------------+
         *     // | John                | Doe                | Miss Dibble   |
         *     // +---------------------+--------------------+---------------+
         *     // | Mary                | Poppins            | Nat Bibble    |
         *     // +---------------------+--------------------+---------------+
         *     //
         */
        constructor: function (relationA, relationB) {

            debug.compose.trace('#constructor');

            this.rels = [relationA, relationB];

            Relation.call(this);

            this.commonAttributes = null;

        },

        bindEvents: function () {

            debug.compose.trace('#bindEvents');

            // Calling the parent bindEvents
            Compose.__super__.bindEvents.call(this);

            var that = this;

            var rel1 = that.rels[0];
            var rel2 = that.rels[1];

            // beforeGetHeader
            this.ee.once('beforeGetHeader', function () {

                var header1 = rel1.header();
                var header2 = rel2.header();

                debug.compose.trace('beforeGetHeader');

                Header.assertSameNameSameType(header1, header2);

                that.commonAttributes = Header.commonAttributes(header1, header2);

                that.header().copy(header1.setUnion(header2).setDifference(that.commonAttributes));

                //
            });

            // beforeGetBody
            this.ee.once('beforeGetBody', function () {

                debug.compose.trace('beforeGetBody');

                that.header();

                rel1.each(function (tuple1) {

                    rel2.each(function (tuple2) {

                        var match = Tuple.matchOnAttributes(tuple1, tuple2, that.commonAttributes);

                        if(match){

                            var combinedTuple = _.extend({}, tuple1.attributes, tuple2.attributes);

                            var newTuple = new Tuple();

                            that.header().each(function(composeAttribute){

                                var composeAttributeName = composeAttribute.name;

                                newTuple.set(composeAttributeName, combinedTuple[composeAttributeName])

                            });

                            that.add(newTuple);

                        }

                    });

                });

            });

        }

    });

module.exports = Compose;