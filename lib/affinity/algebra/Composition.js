var Relation = require('./../Relation.js');
var Header = require('./../Header.js');
var Tuple = require('./../Tuple.js');
var _ = require('lodash');
var debug = require('./../helpers/debug');

var Composition = Relation.extend(

    {

        /**
         * @class Operators.Composition
         * @extends Relation
         *
         * @param {Relation} relationA The relation A
         * @param {Relation} relationB The relation B
         *
         *
         * The Composition operator will perform a natural join between A and B while removing the common attributes
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
         *     var relationC = new affinity.Composition(relationA, relationB)
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

            /**
             * @property {Object} args
             * @property {Relation} args.left
             * @property {Relation} args.right
             */

            debug.compose.trace('#constructor');

            this.args = {};

            this.args.left = relationA;

            this.args.right = relationB;

            Relation.call(this);

            this.commonAttributes = null;

        },

        bindEvents: function () {

            debug.compose.trace('#bindEvents');

            // Calling the parent bindEvents
            Composition.__super__.bindEvents.call(this);

            var that = this;

            var left = that.args.left;
            var right = that.args.right;

            // beforeGetHeader
            this.ee.once('beforeGetHeader', function () {

                var leftHeader = left.header();
                var rightHeader = right.header();

                debug.compose.trace('beforeGetHeader');

                Header.assertSameNameSameType(leftHeader, rightHeader);

                that.commonAttributes = Header.commonAttributes(leftHeader, rightHeader);

                that.leftAttributes = leftHeader.setDifference(that.commonAttributes);

                that.rightAttributes = rightHeader.setDifference(that.commonAttributes);

                that.header().copy(leftHeader.setUnion(rightHeader).setDifference(that.commonAttributes));

            });

            // beforeGetBody
            this.ee.once('beforeGetBody', function () {

                debug.compose.trace('beforeGetBody');

                left.each(function (tuple) { that.doAfterAdd(left, tuple); });

                right.each(function (tuple) { that.doAfterAdd(right, tuple);});

            });

            left.ee.on('afterAdd', function(tuple){

                that.doAfterAdd(left, tuple);

            });

            right.ee.on('afterAdd', function(tuple){

                that.doAfterAdd(right, tuple);

            });

            left.ee.on('afterRemove', function(tuple, index){

                that.doAfterRemove(left, tuple);

            });

            right.ee.on('afterRemove', function(tuple, index){

                that.doAfterRemove(right, tuple);

            });

            left.ee.on('afterUpdate', function(tuple, attributeName, value){

                that.doAfterUpdate(left, tuple, attributeName, value);

            });

            right.ee.on('afterUpdate', function(tuple, attributeName, value){

                that.doAfterUpdate(right, tuple, attributeName, value);

            });

        },

        /**
         * Event handler when tuples are added to the base relations
         * @param {Relation} relation relation in which the tuple was added
         * @param {Tuple} tuple1 the tuple that was added
         */
        doAfterAdd : function(relation, tuple1){

            var that = this;

            var otherRelation = (relation === that.args.left ? that.args.right : that.args.left);

            otherRelation.each(function(tuple2){

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

            })

        },


        /**
         * Event handler when tuples are removed from the base relations.
         * @param {Relation} relation Relation in which the tuple was removed
         * @param {Tuple} removedTuple The tuple that was removed
         */
        doAfterRemove : function(relation, removedTuple){

            var that = this;

            var nonCommonAttributes = (relation === that.args.left ? that.leftAttributes : that.rightAttributes);

            // Find tuples which match the removed tuple on its attributes

            that.each(function(tuple, index){

                var match = Tuple.matchOnAttributes(tuple, removedTuple, nonCommonAttributes);

                if(match){

                    that.removeAt(index);

                }

            });

        },

        /**
         * Event handler when tuples are updated in the base relations
         * @param {Relation} relation The relation where the tuple was updated
         * @param {Tuple} tuple The tuple that was updated
         * @param {String} attributeName The name of the attribute that was updated
         * @param {*} value The new value of the attribute
         */
        doAfterUpdate : function(relation, tuple, attributeName, value, oldValue){

            var that = this;

            var otherRelation = (relation === that.args.left ? that.args.right : that.args.left);

            var result = this.args.left.compose(this.args.right);

            that.adjustTo(result);

        }

    }, {

        type : 'Composition'

    });

module.exports = Composition;