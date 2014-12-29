var Base = require('./Base'),
    Index = require('./Index'),
    Header = require('./Header'),
    _ = require('lodash');

var Key = Base.extend({

        /**
         * @class Key
         * @extends Base
         *
         * The Key class represents keys to a relation.
         *
         * When keys are not defined on a relation, a key is assumed on all attributes of the relation.
         * Though, when a key is defined on a subset of a relation's attributes, the uniqueness
         * of the tuples will be calculated only on those attributes.
         *
         * Also, a Key will index the tuples for its attributes, making operations a lot faster.
         *
         *
         *     var relation = new affinity.Relation([
         *          {attribute1 : {type : affinity.Integer}},
         *          {attribute2 : {type : affinity.Integer}},
         *          {attribute3 : {type : affinity.Integer}},
         *      ],[
         *          [1, 2, 3],
         *          [4, 2, 3], // -> Will fail to be added, as it does not respects the unique key constraint
         *          [1, 8, 9], // -> Will fail to be added, as it does not respected the pk constraint
         *          [10, 11, 12],
         *      ],{
         *          pk : ['attribute1'],
         *          unique : [['attribute2', 'attribute3']]
         *      });
         */
        constructor: function (relation, attributes) {

            if(!_.isArray(attributes)){
                attributes = [attributes];
            }

            /**
             * @property {Header} header
             */
            var header = this.header = new Header();

            header.copy(relation.header(),attributes);

            /**
             * @property {Index} index
             */
            var index = this.index = new Index(this.header);

            // Add the tuple to the index after it is added in the relation
            relation.ee.on('afterAdd', function(tuple, tupleIndex){

                index.add(tuple, tupleIndex);

            });

            // Remove the tuple from the before it is deleted
            relation.ee.on('beforeDelete', function(tuple, tupleIndex){

                index.remove(tuple, tupleIndex);

            });


            // Remove then add the tuple from index before the tuple update

            relation.ee.on('beforeUpdate', function(tuple, attributeName){

                if(header.get(attributeName) !== null){
                    var tupleIndex = index.getIndex(tuple);
                    index.remove(tuple, tupleIndex);
                }

            });

            relation.ee.on('afterUpdate', function(tuple, attributeName){

                if(header.get(attributeName) !== null){
                    var tupleIndex = index.getIndex(tuple);
                    index.add(tuple, tupleIndex);
                }

            });

        }

    });

module.exports = Key;