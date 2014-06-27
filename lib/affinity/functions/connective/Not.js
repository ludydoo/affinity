var Function = require('./../../Function.js');
var TBoolean = require('./../../types/Boolean.js');
var _ = require('lodash');

var Not = Function.extend(

    {

        /**
         * @class Functions.Connective.Not
         * @extends Function
         *
         * Function that checks if its argument returns false
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
         *      var extended = philosophers.extend([{ "notBornIn384BC" : born.not().eq(-384) }]);
         *
         *      // or equivalent :
         *
         *      var extended = philosophers.extend([
         *          { diedIn322BC : new affinity.Not(new affinity.Equal(born, -322)) }
         *      ]);
         *
         *      extended.print();
         *
         *      // +----------------+-----------------+-----------------+----------------------------+
         *      // | name : TString | born : TInteger | died : TInteger | notBornIn384BC : TBoolean  |
         *      // +================+=================+=================+============================+
         *      // | Aristotle      | -384            | -322            | false                      |
         *      // +----------------+-----------------+-----------------+----------------------------+
         *      // | Plato          | -428            | -348            | true                       |
         *      // +----------------+-----------------+-----------------+----------------------------+
         *      // | Socrates       | -470            | -399            | true                       |
         *      // +----------------+-----------------+-----------------+----------------------------+
         *
         *
         * When used with a Restriction operator :
         *
         *      var restricted = philosophers.restrict(born.not().eq(-384));
         *
         *      // or equivalent :
         *
         *      var restricted = philosophers.restrict(
         *          new affinity.Not(new affinity.Equal(born, -322))
         *      );
         *
         *      restricted.print();
         *
         *      // +----------------+-----------------+-----------------+
         *      // | name : TString | born : TInteger | died : TInteger |
         *      // +================+=================+=================+
         *      // | Plato          | -428            | -348            |
         *      // +----------------+-----------------+-----------------+
         *      // | Socrates       | -470            | -399            |
         *      // +----------------+-----------------+-----------------+
         *
         */
        constructor: function () {

            Function.apply(this, arguments);

            this.type(TBoolean);

            this.name = 'Not';

        },

        /**
         * Gets the function return value
         * @returns {boolean}
         */
        value: function () {

            if(!_.isBoolean(this.parameters[0])){
                return !this.parameters[0].value();
            }

            return !this.parameters[0];

        }

    },{



    });

module.exports = Not;