var Function = require('./../../Function.js');
var compare = require('./../../helpers/compare');
var TBoolean = require('./../../types/Boolean.js');
var _ = require('lodash');

var FSmallerThan = Function.extend(

    {

        /**
         * @class Functions.Comparable.SmallerThan
         * @extends Function
         *
         * Function that checks if a value is smaller than another one. It only applies
         * to types that implement a static "compare" method or to primitives.
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
         *      var extended = philosophers.extend([{ diedBefore348BC : died.st(-348) }]);
         *
         *      // or equivalent :
         *
         *      var extended = philosophers.extend([{ diedBefore348BC : new affinity.SmallerThan(died, -348) }]);
         *
         *      extended.print();
         *
         *      // +----------------+-----------------+-----------------+----------------------------+
         *      // | name : TString | born : TInteger | died : TInteger | diedBefore348BC : TBoolean |
         *      // +================+=================+=================+============================+
         *      // | Aristotle      | -384            | -322            | true                       |
         *      // +----------------+-----------------+-----------------+----------------------------+
         *      // | Plato          | -428            | -348            | false                      |
         *      // +----------------+-----------------+-----------------+----------------------------+
         *      // | Socrates       | -470            | -399            | false                      |
         *      // +----------------+-----------------+-----------------+----------------------------+
         *
         *
         * When used with a Restriction operator :
         *
         *      var restricted = philosophers.restrict(died.st(-348));
         *
         *      // or equivalent :
         *
         *      var restricted = philosophers.restrict(new affinity.SmallerThan(died, -348));
         *
         *      restricted.print();
         *
         *      // +----------------+-----------------+-----------------+
         *      // | name : TString | born : TInteger | died : TInteger |
         *      // +================+=================+=================+
         *      // | Aristotle      | -384            | -322            |
         *      // +----------------+-----------------+-----------------+
         */
        constructor: function () {

            Function.apply(this, arguments);

            this.name = 'SmallerThan';

            this.type(TBoolean);

        },

        /**
         * Gets the result of the function
         * @returns {boolean}
         */
        value: function () {

            return (compare(null, this.parameters[0], this.parameters[1]) < 0);

        }

    },{



    });

module.exports = FSmallerThan;