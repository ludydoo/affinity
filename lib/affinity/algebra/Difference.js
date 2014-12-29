var Relation = require('./../Relation.js');
var Header = require('./../Header.js');
var _ = require('lodash');
var debug = require('./../helpers/debug');

var Difference = Relation.extend(


    {

        /**
         * @class Operators.Difference
         * @extends Relation
         * @param {Relation} left The relation from which to remove the tuples
         * @param {Relation} right The relation that will be substracted from the other
         *
         * The Difference operation gives the first relation's tuples minus those that are in the second relation.
         *
         *     var left = new affinity.Relation([
         *              {a: { type: affinity.Integer}},
         *              {b: { type: affinity.Integer}},
         *              {c: { type: affinity.Integer}}
         *          ],[
         *              [1, 2, 3],
         *              [4, 5, 6],
         *              [7, 8, 9]
         *          ]);

         *     var right = new affinity.Relation([
         *              {a: { type: affinity.Integer}},
         *              {b: { type: affinity.Integer}},
         *              {c: { type: affinity.Integer}}
         *          ], [
         *              [1, 2, 3]
         *          ]);
         *
         *     var rel3 = left.difference(right);
         *
         *     // or
         *
         *     var rel4 = new affinity.Difference(left, right)
         *
         *     // +--------------+--------------+--------------+
         *     // | a : TInteger | b : TInteger | c : TInteger |
         *     // +==============+==============+==============+
         *     // | 4            | 5            | 6            |
         *     // +--------------+--------------+--------------+
         *     // | 7            | 8            | 9            |
         *     // +--------------+--------------+--------------+
         */
        constructor: function (left, right) {

            debug.difference.trace('#constructor');

            /**
             * @property {Object} args
             */
            this.args = {};

            /**
             * @property {Relation} left
             */
            this.args.left = left;

            /**
             * @property {Relation} right
             */
            this.args.right = right;

            /**
             * @property {Relation[]} relations
             */
            this.args.relations = [left, right];

            /**
             * @property {Boolean} computed
             */
            this.computed = false;

            // Calls the parent constructor
            Relation.call(this);

        },

        bindEvents: function () {

            debug.difference.trace('#bindEvents');

            Difference.__super__.bindEvents.call(this);

            var that = this;

            var left = that.args.left;
            var right = that.args.right;

            // BeforeGetHeader
            this.ee.once('beforeGetHeader', function () {

                var leftHeader = left.header();
                var rightHeader = right.header();

                debug.difference.trace('beforeGetHeader');

                Header.assertUnionCompatible(leftHeader, rightHeader);

                that.header().copy(leftHeader);

            });


            // BeforeGetBody
            this.ee.once('beforeGetBody', function () {

                debug.difference.trace('beforeGetBody');

                left.each(function (tuple1) {

                    if (right.index(tuple1) === null) {

                        that.add(tuple1.clone(), false);

                    }

                });

                that.computed = true;

            });

            left.ee.on('afterAdd', function(tuple, index){
                that.afterLeftAdd(left, tuple);
            });

            right.ee.on('afterAdd', function(tuple, index){
                that.afterRightAdd(left, tuple);
            });

            left.ee.on('afterRemove', function(tuple, index){
                that.afterLeftRemove(right, tuple);
            });

            right.ee.on('afterRemove', function(tuple, index){
                that.afterRightRemove(right, tuple);
            });

            left.ee.on('afterUpdate', function(tuple, attributeName, value, oldValue){
                that.afterLeftUpdate(left, tuple, attributeName, value, oldValue);
            });

            right.ee.on('afterUpdate', function(tuple, attributeName, value, oldValue){
                that.afterRightUpdate(right, tuple, attributeName, value, oldValue);
            });

        },

        /**
         * Event triggered when tuples are removed from the left relation
         * @param {Relation} relation
         * @param {Tuple} removedTuple
         */
        afterLeftRemove : function(relation, removedTuple){

            // If the tuple is not present in the right relation,
            // remove it
            if(this.computed && this.args.right.index(removedTuple) === null){
                this.remove(removedTuple);
            }

        },

        /**
         * Event triggered when tuples are removed from the right relation
         * @param {Relation} relation
         * @param {Tuple} removedTuple
         */
        afterRightRemove : function(relation, removedTuple){

            // If the tuple is present in the left relation,
            // add it.
            if(this.computed && this.args.left.index(removedTuple) !== null){
                this.add(removedTuple.clone());
            }

        },

        /**
         * Event triggered when tuples are added to the left base relation
         * @param {Relation} relation
         * @param {Tuple} addedTuple
         */
        afterLeftAdd : function(relation, addedTuple){

            // If the tuple is not in the right
            // relation, add it.
            if(this.computed && this.args.right.index(addedTuple) === null){

                this.add(addedTuple.clone());

            }

        },

        /**
         * Event triggered when tuples are added to the right base relation
         * @param {Relation} relation
         * @param {Tuple} addedTuple
         */
        afterRightAdd : function(relation, addedTuple){

            // If the tuple is present in the left
            // relation, remove it.
            if(this.computed && this.args.left.index(addedTuple) !== null){

                this.remove(addedTuple);

            }

        },

        /**
         * Event triggered when tuples are updated on the left relation
         * @param {Relation}relation
         * @param {Tuple} tuple
         * @param {String} attributeName
         * @param {*} value
         * @param {*} oldValue
         */
        afterLeftUpdate : function(relation, tuple, attributeName, value, oldValue){

            if(this.computed){

                var oldRightIndex, rightIndex, oldTuple;

                oldTuple = tuple.clone();

                oldTuple.attributes[attributeName] = oldValue;

                oldRightIndex = this.args.right.index(oldTuple);
                rightIndex = this.args.right.index(tuple);

                if(oldRightIndex === null && rightIndex === null){

                    this.find(oldTuple).set(attributeName, value);

                } else if (oldRightIndex === null && rightIndex !== null){

                    this.remove(oldTuple);

                } else if (oldRightIndex !== null && rightIndex === null){

                    this.add(tuple.clone());

                }

            }


        },

        /**
         * Event triggered when tuples are updated on the right relation
         * @param {Relation}relation
         * @param {Tuple} tuple
         * @param {String} attributeName
         * @param {*} value
         * @param {*} oldValue
         */
        afterRightUpdate : function(relation, tuple, attributeName, value, oldValue){

            if(this.computed){

                var oldLeftIndex, leftIndex, oldTuple;

                oldTuple = tuple.clone();

                oldTuple.attributes[attributeName] = oldValue;

                oldLeftIndex = this.args.left.index(oldTuple);
                leftIndex = this.args.left.index(tuple);

                if (oldLeftIndex === null && leftIndex !== null){

                    this.remove(tuple);

                } else if (oldLeftIndex !== null && leftIndex !== null){

                    this.add(oldTuple);

                    this.remove(tuple);

                } else if (oldLeftIndex !== null && leftIndex === null){

                    this.add(oldTuple);

                }
            }
        }

    }, {

        type : 'Difference'

    });

module.exports = Difference;