var Relation = require('./../Relation.js');
var Header = require('./../Header.js');
var Tuple = require('./../Tuple.js');
var _ = require('lodash');
var debug = require('./../helpers/debug');



var Projection = Relation.extend(

    {

        /**
         * @class Operators.Projection
         * @param {Relation} relation
         * @param {String[]} args
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
         *     // +------------------------+---------------------+--------------------+
         *     // | characterId : TInteger | firstName : TString | lastName : TString |
         *     // +========================+=====================+====================+
         *     // | 1                      | John                | Doe                |
         *     // +------------------------+---------------------+--------------------+
         *     // | 2                      | Mary                | Poppins            |
         *     // +------------------------+---------------------+--------------------+
         *     // | 3                      | Lucky               | Luke               |
         *     // +------------------------+---------------------+--------------------+
         *
         *     var relationB = relationA.project(['firstName']);
         *
         *     // or
         *
         *     var relationC = new affinity.Projection(relationA, ['firstName']);
         *
         *     // +---------------------+
         *     // | firstName : TString |
         *     // +=====================+
         *     // | John                |
         *     // +---------------------+
         *     // | Mary                |
         *     // +---------------------+
         *     // | Lucky               |
         *     // +---------------------+
         *
         */
        constructor: function (relation, args) {

            this.rel = relation;
            this.args = args;

            Relation.call(this);

        },

        bindEvents: function () {

            debug.projection.trace('#bindEvents');

            Projection.__super__.bindEvents.call(this);

            var that = this;

            var relation = this.rel;

            that.ee.once('beforeGetBody', function () {

                debug.projection.trace('beforeGetBody');

                relation.each(function (tuple) {

                    var newTuple = new Tuple();

                    newTuple.copy(tuple, that.args);

                    that.add(newTuple);

                }, that)

            });

            that.ee.once('beforeGetHeader', function () {

                debug.projection.trace('beforeGetHeader');

                that.header().copy(relation.header().project(that.args))

            });

            // Binds the base relation afterAdd event
            relation.ee.on('afterAdd', function(tuple, index){
                that.afterAdd(relation, tuple);
            });

            // Binds the base relation afterRemove event
            relation.ee.on('afterRemove', function(tuple, index){
                that.afterRemove(relation, tuple);
            });

            // Binds the base relation afterUpdate event
            relation.ee.on('afterUpdate', function(tuple, attributeName, value, oldValue){
                that.afterUpdate(relation, tuple, attributeName, value, oldValue);
            });

        },

        afterAdd : function(relation, tuple){
            var result = relation.project(this.args);
            debug.group.trace('Projection#afterAdd');
            this.adjustTo(result);
        },

        afterRemove : function(relation, tuple){
            var result = relation.project(this.args);
            debug.group.trace('Projection#afterRemove');
            this.adjustTo(result);
        },

        afterUpdate : function(relation, tuple, attributeName, value, oldValue){
            var result = relation.project(this.args);
            debug.group.trace('Projection#afterUpdate');
            this.adjustTo(result);
        }

    }, {

        type : 'Projection'

    });

module.exports = Projection;