var Function = require('./../../Function.js');
var TBoolean = require('./../../types/Boolean.js');
var _ = require('lodash');

var And = Function.extend(
    {

        /**
         * @class Functions.Connective.And
         * @extends Function
         *
         * Function that checks if its arguments all return a true boolean.
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
         *      var extended = philosophers.extend([{ "322to384BC" : died.eq(-322).and(born.eq(-384)) }]);
         *
         *      // or equivalent :
         *
         *      var extended = philosophers.extend([
         *          { diedIn322BC : new affinity.And(new affinity.Equal(died, -322), new affinity.Equal(born, -384)) }
         *      ]);
         *
         *      extended.print();
         *
         *      // +----------------+-----------------+-----------------+------------------------+
         *      // | name : TString | born : TInteger | died : TInteger | 322to384BC : TBoolean  |
         *      // +================+=================+=================+========================+
         *      // | Aristotle      | -384            | -322            | true                   |
         *      // +----------------+-----------------+-----------------+------------------------+
         *      // | Plato          | -428            | -348            | false                  |
         *      // +----------------+-----------------+-----------------+------------------------+
         *      // | Socrates       | -470            | -399            | false                  |
         *      // +----------------+-----------------+-----------------+------------------------+
         *
         *
         * When used with a Restriction operator :
         *
         *      var restricted = philosophers.restrict(died.eq(-322).and(born.eq(-384)));
         *
         *      // or equivalent :
         *
         *      var restricted = philosophers.restrict(
         *          new affinity.And(new affinity.Equal(died, -322), new affinity.Equal(born, -384))
         *      );
         *
         *      restricted.print();
         *
         *      // +----------------+-----------------+-----------------+
         *      // | name : TString | born : TInteger | died : TInteger |
         *      // +================+=================+=================+
         *      // | Aristotle      | -384            | -322            |
         *      // +----------------+-----------------+-----------------+
         *
         */
        constructor: function () {

            Function.apply(this, Array.prototype.slice.call(arguments, 0));

            this.type(TBoolean);

            this.name = 'And';

        },

        /**
         * Gets the function return value
         * @returns {boolean}
         */
        value: function () {

            return _.every(this.parameters, function(parameter){

                if(!_.isBoolean(parameter)){
                    parameter = parameter.value();
                }
                return parameter;

            });

        }

    },{



    });

module.exports = And;