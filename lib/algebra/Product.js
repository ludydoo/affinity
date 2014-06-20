var Relation = require('./../Relation.js');
var Header = require('./../Header.js');
var Tuple = require('./../Tuple.js');
var _ = require('lodash');
var debug = require('./../helpers/debug');

var RProduct = Relation.extend(
    /** @lends RProduct.prototype */
    {

        /**
         * @class RProduct
         * @param {Relation} relationA
         * @param {Relation} relationB
         * @augments Relation
         */
        constructor: function (relationA, relationB) {

            debug.product.trace('#constructor');

            this.rels = [relationA, relationB];

            Relation.call(this);

        },

        bindEvents: function () {

            RProduct.__super__.bindEvents.call(this);

            debug.product.trace('bindEvents');

            var that = this;

            RProduct.__super__.bindEvents.call(this);

            that.ee.once('beforeGetBody', function () {

                debug.product.trace('beforeGetBody');

                var tupleSet = that.rels[0].setProduct(that.rels[1]);

                tupleSet.each(function (tuplePair) {

                    var newTuple = new Tuple();

                    _.forEach([0, 1], function (tupleIndex) {

                        var tuple = tuplePair.get(tupleIndex);

                        _.forEach(tuple.attributes, function (attribute, key) {

                            newTuple.set(key, attribute);

                        })

                    });

                    that.add(newTuple, false);

                }, that);

            });

            that.ee.once('beforeGetHeader', function () {

                debug.product.trace('beforeGetHeader');

                debug.group();

                debug.product.trace('Checking that headers are disjoint');

                // Check that the two relations have disjoint headers
                if (!Header.disjoint(that.rels[0].header(), that.rels[1].header())) {

                    throw new Error('Headers must be disjoint');

                }

                debug.product.trace('Headers are disjoint. Building Header.');

                var unionHeader = that.rels[0].header().setUnion(that.rels[1].header());

                debug.product.trace('Header is built.');

                that.header(unionHeader);

                debug.product.trace('Header is set.');

                debug.ungroup();

            });


        }

    });

module.exports = RProduct;