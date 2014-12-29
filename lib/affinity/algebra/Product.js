var Relation = require('./../Relation.js');
var Header = require('./../Header.js');
var Tuple = require('./../Tuple.js');
var _ = require('lodash');
var debug = require('./../helpers/debug');



var Product = Relation.extend(

    {

        /**
         * @class Operators.Product
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
         *     var relationB = new affinity.Relation([
         *              {product: { type: affinity.String}}
         *          ],[
         *              ['Doll'],
         *              ['PlayMobile'],
         *          ]);
         *
         *     var relationC = relationA.product(relationB);
         *
         *     // or
         *
         *     var relationC = new affinity.Product(relationA, relationB)
         *
         *     // +------------------------+---------------------+--------------------+-------------------+
         *     // | characterId : TInteger | firstName : TString | lastName : TString | product : TString |
         *     // +========================+=====================+====================+===================+
         *     // | 1                      | John                | Doe                | Doll              |
         *     // +------------------------+---------------------+--------------------+-------------------+
         *     // | 2                      | John                | Doe                | PlayMobile        |
         *     // +------------------------+---------------------+--------------------+-------------------+
         *     // | 1                      | Mary                | Poppins            | Doll              |
         *     // +------------------------+---------------------+--------------------+-------------------+
         *     // | 2                      | Mary                | Poppins            | PlayMobile        |
         *     // +------------------------+---------------------+--------------------+-------------------+
         *     // | 1                      | Lucky               | Luke               | Doll              |
         *     // +------------------------+---------------------+--------------------+-------------------+
         *     // | 2                      | Lucky               | Luke               | PlayMobile        |
         *     // +------------------------+---------------------+--------------------+-------------------+
         *     //
         *
         */
        constructor: function (relationA, relationB) {

            debug.product.trace('#constructor');

            this.rels = [relationA, relationB];

            Relation.call(this);

        },

        bindEvents: function () {

            debug.product.trace('#bindEvents');

            Product.__super__.bindEvents.call(this);

            var that = this;

            var rel1 = this.rels[0];
            var rel2 = this.rels[1];

            // BeforeGetHeader

            that.ee.once('beforeGetHeader', function () {

                debug.product.trace('beforeGetHeader');

                var header1 = rel1.header();
                var header2 = rel2.header();

                // Check that the two relations have disjoint headers
                Header.assertDisjoint(header1, header2);

                that.header().copy(header1.setUnion(header2));

            });


            // BeforeGetBody

            that.ee.once('beforeGetBody', function () {

                debug.product.trace('beforeGetBody');

                var tupleSet = rel1.setProduct(rel2);

                tupleSet.each(function (tuplePair) {

                    var newTuple = new Tuple();

                    newTuple.copy(tuplePair.get('0'));
                    newTuple.copy(tuplePair.get('1'));

                    that.add(newTuple, false);

                }, that);

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

    }, {

        type : 'Product'

    });

module.exports = Product;