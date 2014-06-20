var Relation = require('./../Relation.js');
var Header = require('./../Header.js');
var _ = require('lodash');

var RUnion = Relation.extend(
    /** @lends RUnion.prototype */
    {

        /**
         * @class RUnion
         * @param {Relation} relationA
         * @param {Relation} relationB
         * @augments Relation
         */
        constructor: function (relationA, relationB) {
            this.rels = [relationA, relationB];
            Relation.call(this);
        },

        bindEvents: function () {

            RUnion.__super__.bindEvents.call(this);

            var that = this;

            that.ee.once('beforeGetBody', function () {

                _.forEach(that.rels, function (relation) {

                    _.forEach(relation.body(), function (tuple) {

                        that.add(tuple);

                    }, that)

                }, that)

            });

            that.ee.once('beforeGetHeader', function () {

                if (!that.rels[0].header().equal(that.rels[1].header())) {
                    throw new Error('Relations are not union compatible');
                }

                that._header = that.rels[0].header().clone();

            });

        }

    });

module.exports = RUnion;