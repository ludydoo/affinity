var Relation = require('./../Relation.js');
var Header = require('./../Header.js');
var _ = require('lodash');
var debug = require('./../helpers/debug');

var RUnion = Relation.extend(
    /** @lends RUnion.prototype */
    {

        /**
         * @class RUnion
         * @param {Relation} relationA
         * @param {Relation} relationB
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
         *
         * var relationB = new affinity.Relation([
         *          {characterId: { type: affinity.Integer}},
         *          {firstName: { type: affinity.String}},
         *          {lastName: { type: affinity.String}}
         *      ],[
         *          [1, 'Mr', 'X'],
         *          [2, 'Lady', 'Gaga'],
         *          [3, 'Bo', 'Vril']
         *      ]);
         *
         * var relationC = relationA.union(relationB)
         *
         * // or
         *
         * var relationC = new affinity.Union(relationA, relationB);
         *
         * // +------------------------+---------------------+--------------------+
         * // | characterId : TInteger | firstName : TString | lastName : TString |
         * // +========================+=====================+====================+   -
         * // | 1                      | John                | Doe                |    |
         * // +------------------------+---------------------+--------------------+    | RelationA
         * // | 2                      | Mary                | Poppins            |    |
         * // +------------------------+---------------------+--------------------+    |
         * // | 3                      | Lucky               | Luke               |    |
         * // +------------------------+---------------------+--------------------+   -
         * // | 1                      | Mr                  | X                  |    |
         * // +------------------------+---------------------+--------------------+    |
         * // | 2                      | Lady                | Gaga               |    | RelationB
         * // +------------------------+---------------------+--------------------+    |
         * // | 3                      | Bo                  | Vril               |    |
         * // +------------------------+---------------------+--------------------+   -
         *
         */
        constructor: function (relationA, relationB) {
            this.rels = [relationA, relationB];
            Relation.call(this);
        },

        bindEvents: function () {

            debug.union.trace('#bindEvents');

            RUnion.__super__.bindEvents.call(this);

            var that = this;

            that.ee.once('beforeGetBody', function () {

                debug.union.trace('beforeGetBody');

                _.forEach(that.rels, function (relation) {

                    _.forEach(relation.body(), function (tuple) {

                        that.add(tuple);

                    }, that)

                }, that)

            });

            that.ee.once('beforeGetHeader', function () {

                debug.union.trace('beforeGetHeader');

                if (!that.rels[0].header().equal(that.rels[1].header())) {
                    throw new Error('Relations are not union compatible');
                }

                that._header = that.rels[0].header().clone();

            });

        }

    });

module.exports = RUnion;