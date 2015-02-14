var Base = require('./Base'),
    Index = require('./Index'),
    Header = require('./Header'),
    _ = require('lodash'),
    Attribute = require('./Attribute'),
    Tuple = require('./Tuple'),
    debug = require('./helpers/debug'),
    equal = require('./helpers/equal');

var ForeignKey = Base.extend({

    /**
     * @class ForeignKey
     * @extends Base
     * @param {Object} params
     * @param {Relation} params.relation
     * @param {string|string[]|Header} params.columnNames
     * @param {Relation} params.referencedRelation
     * @param {string|string[]|Header} params.referencedColumnNames
     * @param {string} params.onUpdate
     * @param {string} params.onDelete
     *
     * The ForeignKey class represents foreign keys to a relation.
     *
     * The foreign key enforces the relational integrity of different relations.
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
     *              {
     *                  columnNames           : ['ownerId'],
     *                  referencedRelation    : people,
     *                  referencedColumnNames : ['id'],
     *                  onUpdate              : 'cascade',
     *                  onDelete              : 'restrict'
 *                  },
     *              ...
     *          ]
     *      });
     */
    constructor: function (params) {

        debug.foreignKey.trace('#constructor');

        // relation, columnNames, referencedRelation, referencedColumnNames, onUpdate, onDelete

        /** @property {Header} columns */
        this.columns = null;

        /** @property {Header} referencedColumns */
        this.referencedColumns = null;

        /** @property {Relation} relation */
        this.relation = params.relation;

        /** @property {Relation} referencedRelation */
        this.referencedRelation = params.selfReferencing ? this.relation : params.referencedRelation;

        // Validate columnNames parameter

        if (params.columnNames instanceof Header) {

            // columnNames is already a header
            if (!params.columnNames.isSubset(relation.header()))
                throw new Error('Parameter columnNames passed as invalid Header. ');

            this.columns = params.columnNames;

        } else {

            if(!_.isArray(params.columnNames)){
                params.columnNames = [params.columnNames];
            }

            this.columns =  this.relation.header().clone().project(params.columnNames);

        }


        // Validate referencedColumnNames parameter

        if (params.referencedColumnNames instanceof Header) {

            // referencedColumnNames is already a header
            if (!params.referencedColumnNames.isSubset(params.referencedRelation.header()))
                throw new Error('Parameter referencedColumnNames passed as invalid Header. ');

            this.referencedColumns = params.referencedColumnNames;

        } else {

            if(!_.isArray(params.referencedColumnNames)){
                params.referencedColumnNames = [params.referencedColumnNames];
            }
            this.referencedColumns = this.referencedRelation.header().clone().project(params.referencedColumnNames);

        }

        //todo : Verify onUpdate
        //todo : Verify onDelete

        var that = this;


        // Check that the added tuple respects the foreign key constraint before adding the tuple

        this.relation.ee.on('afterAdd', function(tuple, tupleIndex){

            debug.foreignKey.trace('#beforeAdd');

            try {

                that.checkForeignKeyConstraint(tuple);

            } catch (err) {

                that.relation.removeAt(tupleIndex);

                throw(err);

            }

        });

        // Remove then add the tuple from index before the tuple update

        this.relation.ee.on('beforeUpdate', function(tuple, attributeName, attributeValue){

            debug.foreignKey.trace('#beforeUpdate');

            var projectedTuple = tuple.clone();

            projectedTuple.set(attributeName, attributeValue);

            that.checkForeignKeyConstraint(projectedTuple);

        });

    },

    checkForeignKeyConstraint : function(tuple){

        debug.foreignKey.trace('#checkForeignKeyConstraint');

        var that = this,
            keyTuple,
            temporaryRelation,
            Relation,
            projectedReferencedRelation,
            intersectedRelation;


        /// Build a tuple containing the required values for the given referenced columns

        keyTuple = new Tuple();

        that.referencedColumns.each(function(referencedAttribute, attributeIndex){

            var attribute = that.columns.atIndex(attributeIndex);

            keyTuple.set(referencedAttribute.name, tuple.get(attribute.name));

        });

        that.referencedRelation.each(function(tuple, index){

            var result = true;

            keyTuple.each(function(attribute){

                if (!equal(null, keyTuple.get(attribute), tuple.get(attribute))){
                    result = false;
                    return false;
                }

            });

            if (result == false){
                throw new Error('Foreign key constraint check fail')
            }

        });

    }

},{

    cascadeValues : ['cascade', 'prevent']

});

module.exports = ForeignKey;