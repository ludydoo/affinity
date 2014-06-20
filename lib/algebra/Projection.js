var Relation = require('./../Relation.js');
var Header = require('./../Header.js');
var Tuple = require('./../Tuple.js');
var _ = require('lodash');
var debug = require('./../helpers/debug');

var RProjection = Relation.extend(
    /** @lends RProjection.prototype */
    {

        /**
         * @class RProjection
         * @param {Relation} relation
         * @param {String[]} args
         * @augments Relation
         * @example
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
         * // +------------------------+---------------------+--------------------+
         * // | characterId : TInteger | firstName : TString | lastName : TString |
         * // +========================+=====================+====================+
         * // | 1                      | John                | Doe                |
         * // +------------------------+---------------------+--------------------+
         * // | 2                      | Mary                | Poppins            |
         * // +------------------------+---------------------+--------------------+
         * // | 3                      | Lucky               | Luke               |
         * // +------------------------+---------------------+--------------------+
         *
         * var relationB = relationA.project(['firstName']);
         *
         * // or
         *
         * var relationC = new affinity.Projection(relationA, ['firstName']);
         *
         * // +---------------------+
         * // | firstName : TString |
         * // +=====================+
         * // | John                |
         * // +---------------------+
         * // | Mary                |
         * // +---------------------+
         * // | Lucky               |
         * // +---------------------+
         *
         */
        constructor: function (relation, args) {

            this.rel = relation;
            this.args = args;

            Relation.call(this);

        },

        bindEvents: function () {

            debug.projection.trace('#bindEvents');

            RProjection.__super__.bindEvents.call(this);

            var that = this;

            that.ee.once('beforeGetBody', function () {

                debug.projection.trace('beforeGetBody');

                that.rel.each(function (tuple) {

                    var newTuple = new Tuple();

                    _.forEach(that.args, function (arg) {

                        newTuple.set(arg, tuple.get(arg));

                    });

                    that.add(newTuple);

                }, that)

            });

            that.ee.once('beforeGetHeader', function () {

                debug.projection.trace('beforeGetHeader');

                that.header(that.rel.header().project(that.args));

            });

        }

    });

module.exports = RProjection;