var Relation = require('./../Relation.js');
var Header = require('./../Header.js');
var Tuple = require('./../Tuple.js');
var _ = require('lodash');

var RProjection = Relation.extend(
    /** @lends RProjection.prototype */
    {

        /**
         * @class RProjection
         * @param {Relation} relation
         * @param {String[]} args
         * @augments Relation
         */
        constructor: function (relation, args) {

            this.rel = relation;
            this.args = args;

            Relation.call(this);

        },

        bindEvents: function () {

            RProjection.__super__.bindEvents.call(this);

            var that = this;

            that.ee.once('beforeGetBody', function () {

                that.rel.each(function (tuple) {

                    var newTuple = new Tuple();

                    _.forEach(that.args, function (arg) {

                        newTuple.set(arg, tuple.get(arg));

                    });

                    that.add(newTuple);

                }, that)

            });

            that.ee.once('beforeGetHeader', function () {

                that.header(that.rel.header().project(that.args));

            });

        }

    });

module.exports = RProjection;