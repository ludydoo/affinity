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

            that.ee.once('beforeGetBody', function () {

                that.header();

                debug.restriction.trace('beforeGetBody');

                if(that.predicate instanceof Function){

                    that.predicate.convertAttributeToTuple();

                    that.rel.each(function (tuple) {

                        if (that.predicate.assignTuple(tuple).value() === true) {
                            that.add(tuple.clone(), false);
                        }

                    }, that)

                } else if (_.isFunction(that.predicate)) {
                    that.rel.each(function(tuple){

                        if(that.predicate(tuple)){
                            that.add(tuple.clone(), false);
                        }

                    })
                } else {
                    throw new TypeError('Unsupported predicate type')
                }

            });

            that.ee.once('beforeGetHeader', function () {

                debug.restriction.trace('beforeGetHeader');

                that.header().copy(that.rel.header());

            });

        }

    });

module.exports = Restriction;