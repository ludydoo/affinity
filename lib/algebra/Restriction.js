var Relation = require('./../Relation.js');
var Header = require('./../Header.js');
var _ = require('lodash');

var RRestriction = Relation.extend(
    /** @lends RRestriction.prototype */
    {

        /**
         * @class RRestriction
         * @param {Relation} relation
         * @param {Function} predicate
         * @augments Relation
         */
        constructor: function (relation, predicate) {

            this.rel = relation;
            this.predicate = predicate;
            Relation.call(this);

        },

        bindEvents: function () {

            RRestriction.__super__.bindEvents.call(this);

            var that = this;

            that.ee.once('beforeGetBody', function () {

                that.predicate.convertAttributeToTuple();

                that.rel.each(function (tuple) {

                    if (that.predicate.set({tuple: tuple}) == true) {
                        that.add(tuple, false);
                    }

                }, that)

            });

            that.ee.once('beforeGetHeader', function () {

                that._header = that.rel.header().clone();

            });

        }

    });

module.exports = RRestriction;