var Relation = require('./../Relation.js');
var Header = require('./../Header.js');
var Tuple = require('./../Tuple.js');
var debug = require('./../helpers/debug');

var _ = require('lodash');



var Join = Relation.extend(

    {

        /**
         * @class Operators.Join
         * @param {Relation} relationA
         * @param {Relation} relationB
         * @extends Relation
         *
         * The Join operation returns all possible combinations of tuples from relationA and relationB where
         * the tuples have the same value for their common attributes.
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
         *
         *     var relationB = new affinity.Relation([
         *              {characterId: { type: affinity.Integer}},
         *              {fan: { type: affinity.String}}
         *          ],[
         *              [1, 'Mr X'],
         *              [1, 'Miss Dibble'],
         *              [2, 'Nat Bibble']
         *          ]);
         *
         *     var relationC = relationA.join(relationB);
         *
         *     // or
         *
         *     var relationC = new affinity.Join(relationA, relationB)
         *
         *     // <---COMMON ATTRIBUTE---->
         *     // +------------------------+---------------------+--------------------+---------------+
         *     // | characterId : TInteger | firstName : TString | lastName : TString | fan : TString |
         *     // +========================+=====================+====================+===============+
         *     // | 1                      | John                | Doe                | Mr X          |
         *     // +------------------------+---------------------+--------------------+---------------+
         *     // | 2                      | John                | Doe                | Miss Dibble   |
         *     // +------------------------+---------------------+--------------------+---------------+
         *     // | 3                      | Mary                | Poppins            | Nat Bibble    |
         *     // +------------------------+---------------------+--------------------+---------------+
         *     //
         *
         */
        constructor: function (relationA, relationB) {

            this.rels = [relationA, relationB];
            this._commonAttributes = [];

            Relation.call(this);

            var that = this;

        },

        bindEvents: function () {

            debug.join.trace('#bindEvents');

            Join.__super__.bindEvents.call(this);

            var that = this;

            var rel1 = that.rels[0];
            var rel2 = that.rels[1];

            // BeforeGetHeader

            this.ee.once('beforeGetHeader', function () {

                debug.join.trace('beforeGetHeader');

                var header1 = rel1.header();
                var header2 = rel2.header();

                Header.assertSameNameSameType(header1, header2);

                that.commonAttributes = Header.commonAttributes(header1, header2);

                that.header().copy(header1);
                that.header().copy(header2);

            });


            // BeforeGetBody

            this.ee.once('beforeGetBody', function () {

                that.header();

                debug.join.trace('beforeGetBody');

                // Loop through each body of the first relation
                rel1.each(function (tuple1) {

                    // Loop through each tuples of the second relation
                    rel2.each(function (tuple2) {

                        var match = Tuple.matchOnAttributes(tuple1, tuple2, that.commonAttributes);

                        // If a match was detected
                        if (match) {

                            // Clone the first tuple
                            var newTuple = new Tuple();

                            // Copy the joined tuple attributes
                            newTuple.copy(tuple1);
                            newTuple.copy(tuple2);

                            // Then add it to the relation
                            that.add(newTuple, false);
                        }

                    }, that);

                }, that)

            });

            that.rels[0].ee.on('afterAdd', function(tuple, index){
                that.afterLeftAdd(that.rels[0], tuple, index);
            });

            that.rels[1].ee.on('afterAdd', function(tuple, index){
                that.afterRightAdd(that.rels[1], tuple, index);
            });

            that.rels[0].ee.on('afterRemove', function(tuple, index){
                that.afterLeftRemove(that.rels[0], tuple, index);
            });

            that.rels[1].ee.on('afterRemove', function(tuple, index){
                that.afterRightRemove(that.rels[0], tuple, index);
            });

            that.rels[0].ee.on('afterUpdate', function(tuple, attributeName, value, oldValue){
                that.afterLeftUpdate(that.rels[0], tuple, attributeName, value, oldValue);
            });

            that.rels[1].ee.on('afterUpdate', function(tuple, attributeName, value, oldValue){
                that.afterLeftUpdate(that.rels[0], tuple, attributeName, value, oldValue);
            });


        },

        afterLeftAdd : function(relation, tuple){
            debug.group.trace('Join#afterLeftAdd');
            var result = this.rels[0].join(this.rels[1]);
            this.adjustTo(result);
        },

        afterLeftRemove : function(relation, tuple){
            debug.group.trace('Join#afterLeftRemove');
            var result = this.rels[0].join(this.rels[1]);
            this.adjustTo(result);
        },

        afterLeftUpdate : function(relation, tuple, attributeName, value, oldValue){
            debug.group.trace('Join#afterLeftUpdate');
            var result = this.rels[0].join(this.rels[1]);
            this.adjustTo(result);
        },

        afterRightAdd : function(relation, tuple){
            debug.group.trace('Join#afterRightAdd');
            var result = this.rels[0].join(this.rels[1]);
            this.adjustTo(result);
        },

        afterRightRemove : function(relation, tuple){
            debug.group.trace('Join#afterRightRemove');
            var result = this.rels[0].join(this.rels[1]);
            this.adjustTo(result);
        },

        afterRightUpdate : function(relation, tuple, attributeName, value, oldValue){
            debug.group.trace('Join#afterRightUpdate');
            var result = this.rels[0].join(this.rels[1]);
            this.adjustTo(result);
        }

    }, {

        type : 'Join'

    });

module.exports = Join;