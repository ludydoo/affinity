var Base = require('./Base'),
    Index = require('./Index'),
    Header = require('./Header'),
    _ = require('lodash'),
    Relation = require('./Relation'),
    Attribute = require('./Attribute'),
    Tuple = require('./Tuple');

var ForeignKey = Base.extend({

    /**
     * @class ForeignKey
     * @extends Base
     * @param {Relation} relation
     * @param {string|string[]|Header} columnNames
     * @param {Relation} referencedRelation
     * @param {string|string[]|Header} referencedColumnNames
     * @param {string} onUpdate
     * @param {string} onDelete
     *
     * The Key class represents foreign keys to a relation.
     *
     * When keys are not defined on a relation, a key is assumed on all attributes of the relation.
     * Though, when a key is defined on a subset of a relation's attributes, the uniqueness
     * of the tuples will be calculated only on those attributes.
     *
     * Also, a Key will index the tuples for its attributes, making operations a lot faster.
     *
     *
     *     var people = new affinity.Relation([
     *          {id         : {type : affinity.Integer}},
     *          {name       : {type : affinity.String}}
     *      ],[
     *          [0, 'Howdy'],
     *          [1, 'Duddy'],
     *          [2, 'James'],
     *          [3, 'Mary'],
     *      ],{
     *          pk : ['id']
     *      });
     *
     *
     *     var dogs = new affinity.Relation([
     *          {id : {type : affinity.Integer}},
     *          {ownerId : {type : affinity.Integer}},
     *          {name : {type : affinity.Integer}},
     *      ],[
     *          [0, 0, 'Fido'],
     *          [1, 0, 'Bobby'],
     *          [2, 1, 'Stacey'],
     *          [3, 2, 'Ceasar'],
     *      ],{
     *          pk : ['id'],
     *          fk : [
     *              { columns : ['ownerId'], references : [people.get('id')], onUpdate : 'delete', onDelete : 'cascade'},
     *              ...
     *          ]
     *      });
     */
    constructor: function (relation, columnNames, referencedRelation, referencedColumnNames, onUpdate, onDelete) {

        /** @property {Header} columns */
        this.columns = null;

        /** @property {Header} referencedColumns */
        this.referencedColumns = null;

        /** @property {Relation} relation */
        this.relation = null;

        /** @property {Relation} referencedRelation */
        this.referencedRelation = null;

        // Validate relation parameter
        if (!(relation instanceof Relation)){
            throw new Error('referencedRelation must be instance of a Relation')
        }

        // Validate referencedRelation parameter
        if (!(referencedRelation instanceof Relation)){
            throw new Error('referencedRelation must be instance of a Relation')
        }

        // Validate columnNames parameter

        if (columnNames instanceof Header) {

            // columnNames is already a header
            if (!columnNames.isSubset(relation.header()))
                throw new Error('Parameter columnNames passed as invalid Header. ')

            this.columns = columnNames;

        } else {

            this.columns = new Header();
            this.columns.copy(columnNames);

        }


        // Validate referencedColumnNames parameter

        if (referencedColumnNames instanceof Header) {

            // referencedColumnNames is already a header
            if (!referencedColumnNames.isSubset(referencedRelation.header()))
                throw new Error('Parameter referencedColumnNames passed as invalid Header. ')

            this.referencedColumns = referencedColumnNames;

        } else {

            this.referencedColumns = new Header();
            this.referencedColumns.copy(referencedColumnNames);

        }

        //todo : Verify onUpdate
        //todo : Verify onDelete

        var that = this;


        // Check that the added tuple respects the foreign key constraint before adding the tuple

        this.relation.ee.on('beforeAdd', function(tuple, tupleIndex){

            that.checkForeignKeyConstraint(tuple);

        });

        // Remove then add the tuple from index before the tuple update

        relation.ee.on('beforeUpdate', function(tuple, attributeName, attributeValue){

            var projectedTuple = tuple.clone();

            projectedTuple.set(attributeName, attributeValue);

            that.checkForeignKeyConstraint(projectedTuple);

        });

    },

    checkForeignKeyConstraint : function(tuple){

        var that = this,
            keyTuple,
            temporaryRelation,
            intersection;


        /// Build a tuple containing the required values for the given referenced columns

        keyTuple = new Tuple();

        that.referencedColumns.each(function(referencedAttribute, attributeIndex){

            var attribute = that.columns.atIndex(attributeIndex);

            keyTuple.set(referencedAttribute.name, tuple.get(attribute.name));

        });

        /// Build a temporary relation that will contain that tuple

        temporaryRelation = new Relation(that.referencedRelation.header().clone());


        /// Add that tuple to the temporary relation

        temporaryRelation.add(keyTuple);


        /// Check to find if there is a tuple in the referenced relation that satisfies the given keyTuple

        intersection = temporaryRelation.intersect(that.referencedRelation).compute();


        /// Check that there are results in the intersection

        if (intersection.count() == 0){

            throw new Error('Foreign key constraint check fail');

        }

    }

},{

    cascadeValues : ['cascade', 'prevent']

});

module.exports = ForeignKey;