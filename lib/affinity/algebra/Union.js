var Relation = require('./../Relation.js');
var Header = require('./../Header.js');
var _ = require('lodash');
var debug = require('./../helpers/debug');



var Union = Relation.extend(

    {

        /**
         * @class Operators.Union
         * @param {Relation} relationA
         * @param {Relation} relationB
         * @extends Relation
         *
         * Example :
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
         *
         *
         *     var relationB = new affinity.Relation([
         *              {characterId: { type: affinity.Integer}},
         *              {firstName: { type: affinity.String}},
         *              {lastName: { type: affinity.String}}
         *          ],[
         *              [1, 'Mr', 'X'],
         *              [2, 'Lady', 'Gaga'],
         *              [3, 'Bo', 'Vril']
         *          ]);
         *
         *     var relationC = relationA.union(relationB)
         *
         *     // or
         *
         *     var relationC = new affinity.Union(relationA, relationB);
         *
         *     // +------------------------+---------------------+--------------------+
         *     // | characterId : TInteger | firstName : TString | lastName : TString |
         *     // +========================+=====================+====================+   -
         *     // | 1                      | John                | Doe                |    |
         *     // +------------------------+---------------------+--------------------+    |
         *     // | 2                      | Mary                | Poppins            |    | RelationA
         *     // +------------------------+---------------------+--------------------+    |
         *     // | 3                      | Lucky               | Luke               |    |
         *     // +------------------------+---------------------+--------------------+   -
         *     // | 1                      | Mr                  | X                  |    |
         *     // +------------------------+---------------------+--------------------+    |
         *     // | 2                      | Lady                | Gaga               |    | RelationB
         *     // +------------------------+---------------------+--------------------+    |
         *     // | 3                      | Bo                  | Vril               |    |
         *     // +------------------------+---------------------+--------------------+   -
         *
         */
        constructor: function (relationA, relationB) {
            this.rels = [relationA, relationB];
            Relation.call(this);
        },

        bindEvents: function () {

            debug.union.trace('#bindEvents');

            Union.__super__.bindEvents.call(this);

            var that = this;

            that.ee.once('beforeGetBody', function () {

                debug.union.trace('beforeGetBody');

                _.forEach(that.rels, function (relation) {

                    relation.each(function(tuple){

                        that.add(tuple.clone());

                    });

                }, that)

            });

            that.ee.once('beforeGetHeader', function () {

                debug.union.trace('beforeGetHeader');

                Header.assertUnionCompatible(that.rels[0].header(), that.rels[1].header());

                that.header().copy(that.rels[0].header());

            });

        },

        afterLeftAdd : function(relation, tuple){

        },

        afterLeftRemove : function(relation, tuple){

        },

        afterLeftUpdate : function(relation, tuple, attributeName, value, oldValue){

        },

        afterRightAdd : function(relation, tuple){

        },

        afterRightRemove : function(relation, tuple){

        },

        afterRightUpdate : function(relation, tuple, attributeName, value, oldValue){

        }

    });

module.exports = Union;