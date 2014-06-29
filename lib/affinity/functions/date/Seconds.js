var Function = require('./../../Function.js');
var TInteger = require('./../../types/Integer.js');
var value = require('./../../helpers/value');

var Seconds = Function.extend(
    {

        /**
         * @class Functions.Date.Seconds
         * @extends Function
         *
         * Function that extracts a date's second number
         *
         * With extend operation :
         *
         *      var events = new affinity.Relation([
         *          {date : {type : affinity.Date}},
         *          {name : {type : affinity.String}}
         *      ],[
         *          [new Date(), 'Now'],
         *      ])
         *
         *      var date = events.get('date')
         *
         *      var extended = events.extend([ { "date.seconds()" : date.seconds() } ]);
         *
         *      // or equivalent
         *
         *      var extended = events.extend([ { "date.seconds()" : new affinity.Seconds(date) } ]);
         *
         *      extended.print();
         *
         *      // +-------------------------------------------+-----------------+----------------------------+
         *      // | date : Date                               | name : String   | date.seconds() : Integer   |
         *      // +===========================================+=================+============================+
         *      // | Sun Jun 29 2014 08:51:05 GMT-0400 (EDT)   | Now             | 5                          |
         *      // +-------------------------------------------+-----------------+----------------------------+
         *      //
         *
         */
        constructor: function () {

            Function.apply(this, Array.prototype.slice.call(arguments, 0));

            this.type(TInteger);

            this.name = 'Seconds';

        },

        /**
         * Gets the function return value
         * @returns {number}
         */
        value: function () {

            return value(this.parameters[0]).getSeconds();

        }

    },{


    });

module.exports = Seconds;