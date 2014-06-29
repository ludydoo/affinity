var Function = require('./../../Function.js');
var TBoolean = require('./../../types/Boolean.js');
var _ = require('lodash');
var compare = require('./../../helpers/compare');

var GreaterThan = Function.extend(

    {

        /**
         * @class Functions.Comparable.GreaterThan
         * @extends Function
         *
         * Function that checks if a value is greater than another one.
         * Only applies to types that implement the static "compare" method
         * or to primitives.
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
         *      var extended = philosophers.extend([{ diedAfter350BC : died.gt(-322) }]);
         *
         *      // or equivalent :
         *
         *      var extended = philosophers.extend([{ diedAfter350BC : new affinity.GreaterThan(died, -322) }]);
         *
         *      extended.print();
         *
         *      // +----------------+-----------------+-----------------+---------------------------+
         *      // | name : TString | born : TInteger | died : TInteger | diedAfter350BC : TBoolean |
         *      // +================+=================+=================+===========================+
         *      // | Aristotle      | -384            | -322            | true                      |
         *      // +----------------+-----------------+-----------------+---------------------------+
         *      // | Plato          | -428            | -348            | true                      |
         *      // +----------------+-----------------+-----------------+---------------------------+
         *      // | Socrates       | -470            | -399            | true                      |
         *      // +----------------+-----------------+-----------------+---------------------------+
         *
         *
         * When used with a Restriction operator :
         *
         *      var restricted = philosophers.restrict(died.gt(-350));
         *
         *      // or equivalent :
         *
         *      var restricted = philosophers.restrict(new affinity.GreaterThan(died, -350));
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

            this.name = 'GreaterThan';

            this.type(TBoolean);

        },

        /**
         * Gets the result of the function
         * @returns {boolean}
         */
        value: function () {

            return (compare(null, this.parameters[0], this.parameters[1]) > 0);

        }

    },{

    });

module.exports = GreaterThan;