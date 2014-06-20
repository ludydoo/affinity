var Relation = require('./../Relation.js');
var Tuple = require('./../Tuple.js');
var Set = require('./../Set.js');
var _ = require('lodash');

var RRename = Relation.extend(
    /** @lends RRename.prototype */
    {

        /**
         * @class RRename
         * @param {Relation} relation
         * @param {Object} args
         * @augments Relation
         */
        constructor: function (relation, args) {

            this.relation = relation;
            this.args = args;

            Relation.call(this);

        },

        bindEvents: function () {

            RRename.__super__.bindEvents.call(this);

            var that = this;

            that.ee.once('beforeGetBody', function () {

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

                that._header = that.relation.header().rename(that.args);

            });

        }

    }, {



    });

module.exports = RRename;