var Relation = require('./../Relation.js');
var Tuple = require('./../Tuple.js');
var Set = require('./../Set.js');
var _ = require('lodash');
var debug = require('./../helpers/debug');

var RRename = Relation.extend(
    /** @lends RRename.prototype */
    {

        /**
         * @class RRename
         * @param {Relation} relation
         * @param {Object} args
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
         * var relationB = relationA.rename({'firstName':'familyName'})
         *
         * // or
         *
         * var relationC = new affinity.Projection(relationA, {'lastName':'familyName'});
         *
         * //                                                <--RENAMED ATTRIBUTE--->
         * // +------------------------+---------------------+----------------------+
         * // | characterId : TInteger | firstName : TString | familyName : TString |
         * // +========================+=====================+======================+
         * // | 1                      | John                | Doe                  |
         * // +------------------------+---------------------+----------------------+
         * // | 2                      | Mary                | Poppins              |
         * // +------------------------+---------------------+----------------------+
         * // | 3                      | Lucky               | Luke                 |
         * // +------------------------+---------------------+----------------------+
         */
        constructor: function (relation, args) {

            this.relation = relation;
            this.args = args;

            Relation.call(this);

        },

        bindEvents: function () {

            debug.rename.trace('#bindEvents');

            RRename.__super__.bindEvents.call(this);

            var that = this;

            that.ee.once('beforeGetBody', function () {

                debug.rename.trace('beforeGetBody');

                var a, b, tupleCount, tuple, tuples, keys, keyCount, key, newName;

                that._body = new Set({type: Tuple});

                tuples = that.relation.body();
                tupleCount = tuples.length;
                keys = Object.keys(that.args);
                keyCount = keys.length;

                for (a = 0; a < tupleCount; a++) {

                    tuple = tuples[a].clone();

                    for (b = 0; b < keyCount; b++) {

                        key = keys[b];
                        newName = that.args[key];

                        tuple.attributes[newName] = tuple.attributes[key];
                        delete tuple.attributes[key];

                    }

                    that.add(tuple, false);

                }

            });

            that.ee.once('beforeGetHeader', function () {

                debug.rename.trace('beforeGetHeader');

                that._header = that.relation.header().rename(that.args);

            });

        }

    }, {



    });

module.exports = RRename;