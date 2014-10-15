var Relation = require('./../Relation.js');
var Header = require('./../Header.js');
var _ = require('lodash');
var debug = require('./../helpers/debug');
var Function = require('./../Function.js');



var Restriction = Relation.extend(

    {

        /**
         * @class Operators.Restriction
         * @param {Relation} relation
         * @param {Function} predicate
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
         *     var characterId = relationA.get('characterId')
         *     var firstName = relationA.get('firstName')
         *     var lastName = relationA.get('lastName')
         *
         *
         *
         *     var relationC = relationA.restrict(characterId.equals(1))
         *
         *     // or
         *
         *     var relationC = new affinity.Projection(relationA, characterId.equals(1));
         *
         *     // +------------------------+---------------------+--------------------+
         *     // | characterId : TInteger | firstName : TString | lastName : TString |
         *     // +========================+=====================+====================+
         *     // | 1                      | John                | Doe                |
         *     // +------------------------+---------------------+--------------------+
         *
         */
        constructor: function (relation, predicate) {

            this.rel = relation;
            this.predicate = predicate;
            Relation.call(this);

        },

        bindEvents: function () {

            debug.restriction.trace('#bindEvents');

            Restriction.__super__.bindEvents.call(this);

            var that = this;


            that.ee.once('beforeGetHeader', function () {

                debug.restriction.trace('beforeGetHeader');

                that.header().copy(that.rel.header());

            });


            that.ee.once('beforeGetBody', function () {

                that.rel.each( function (tuple) { that.afterAdd(tuple); })

            });

            that.rel.ee.on('afterAdd', function(tuple){
                that.afterAdd(tuple);
            })

        },

        afterAdd : function(tuple){

            debug.restriction.trace('afterAdd');

            var that = this;

            that.header();

            if(that.predicate instanceof Function){

                that.predicate.convertAttributeToTuple();

                if (that.predicate.assignTuple(tuple).value() === true) {
                    that.add(tuple.clone(), false);
                }

            } else if (_.isFunction(that.predicate)) {

                if(that.predicate(tuple)){
                    that.add(tuple.clone(), false);
                }

            } else {
                throw new TypeError('Unsupported predicate type')
            }

        },

        afterRemove : function(relation, tuple){
            var result = this.relation.restrict(this.predicate);
            this.adjustTo(result);
        },

        afterUpdate : function(relation, tuple, attributeName, value, oldValue){
            var result = this.relation.restrict(this.predicate);
            this.adjustTo(result);
        }

    });

module.exports = Restriction;