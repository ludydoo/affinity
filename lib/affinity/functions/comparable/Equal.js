var Function = require('./../../Function.js');
var TBoolean = require('./../../types/Boolean.js');
var _ = require('lodash');
var equal = require('./../../helpers/equal');

var FEqual = Function.extend(

    {

        /**
         * @class Functions.Comparable.Equal
         * @extends Function
         *
         * Function that compares if two values are equal. Only applies
         * to types that implement a static "equal" method or to primitives.
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
         *      var extended = philosophers.extend([{ diedIn322BC : died.eq(-322) }]);
         *
         *      // or equivalent :
         *
         *      var extended = philosophers.extend([{ diedIn322BC : new affinity.Equal(died, -322) }]);
         *
         *      extended.print();
         *
         *      // +----------------+-----------------+-----------------+------------------------+
         *      // | name : TString | born : TInteger | died : TInteger | diedIn322BC : TBoolean |
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
         *      var restricted = philosophers.restrict(died.eq(-322));
         *
         *      // or equivalent :
         *
         *      var restricted = philosophers.restrict(new affinity.Equal(died, -322));
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

            Function.apply(this, Array.prototype.slice.call(arguments,0));

            this.name = 'Equals';

            this.type(TBoolean);

        },

        /**
         * Gets the result of the function
         * @returns {Boolean}
         */
        value: function () {

            return equal(null, this.parameters[0], this.parameters[1]);

        }

});

module.exports = FEqual;