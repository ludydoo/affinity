var Function = require('./../../Function.js');
var TBoolean = require('./../../types/Boolean.js');
var _ = require('lodash');

var Or = Function.extend(
    {

        /**
         * @class Functions.Connective.Or
         * @extends Function
         *
         * Function that checks if one of its arguments return true
         *
         * When used with an Extension operator :
         *
         *      var philosophers = new affinity.Relation([
         *              {name: { type: affinity.String}},
         *              {born: { type: affinity.Integer}},
         *              {died: { type: affinity.Integer}}
         *          ],[
         *              ['Aristotle', -384, -322],
         *              ['Plato',     -428, -348],
         *              ['Socrates',  -470, -399]
         *          ]);
         *
         *      name = philosophers.get('name');
         *      born = philosophers.get('born');
         *      died = philosophers.get('died');
         *
         *      var extended = philosophers.extend([{ "born384or428BC" : born.eq(-384).or(born.eq(-428)) }]);
         *
         *      // or equivalent :
         *
         *      var extended = philosophers.extend([
         *          { diedIn322BC : new affinity.Or(new affinity.Equal(born, -384), new affinity.Equal(born, -428)) }
         *      ]);
         *
         *      extended.print();
         *
         *      // +----------------+-----------------+-----------------+----------------------------+
         *      // | name : TString | born : TInteger | died : TInteger | born384or428BC : TBoolean  |
         *      // +================+=================+=================+============================+
         *      // | Aristotle      | -384            | -322            | true                       |
         *      // +----------------+-----------------+-----------------+----------------------------+
         *      // | Plato          | -428            | -348            | true                       |
         *      // +----------------+-----------------+-----------------+----------------------------+
         *      // | Socrates       | -470            | -399            | false                      |
         *      // +----------------+-----------------+-----------------+----------------------------+
         *
         *
         * When used with a Restriction operator :
         *
         *      var restricted = philosophers.restrict(born.eq(-384).or(born.eq(-428)));
         *
         *      // or equivalent :
         *
         *      var restricted = philosophers.restrict(
         *          new affinity.Or(new affinity.Equal(born, -384), new affinity.Equal(born, -428))
         *      );
         *
         *      restricted.print();
         *
         *      // +----------------+-----------------+-----------------+
         *      // | name : TString | born : TInteger | died : TInteger |
         *      // +================+=================+=================+
         *      // | Aristotle      | -384            | -322            |
         *      // +----------------+-----------------+-----------------+
         *      // | Plato          | -428            | -348            |
         *      // +----------------+-----------------+-----------------+
         *
         */
        constructor: function () {

            Function.apply(this, arguments);

            this.type(TBoolean);

            this.name = 'Or';

        },

        value: function () {


            return _.any(this.parameters, function(parameter){

                if(!_.isBoolean(parameter)){
                    parameter = parameter.value();
                }
                return parameter;

            });

        }

    },{


    });

module.exports = Or;