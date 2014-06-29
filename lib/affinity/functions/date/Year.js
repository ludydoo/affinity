var Function = require('./../../Function.js');
var TInteger = require('./../../types/Integer.js');
var value = require('./../../helpers/value');

var Year = Function.extend(
    {

        /**
         * @class Functions.Date.Year
         * @extends Function
         *
         *
         * Function that extracts a date's full year number
         *
         * With extend operation :
         *
         *      var events = new affinity.Relation([
         *          {date : {type : affinity.Date}},
         *          {name : {type : affinity.String}}
         *      ],[
         *          [new Date(2013, 01, 02)],
         *          [new Date(2011, 06, 30)],
         *          [new Date(2010, 04, 15)]
         *      ])
         *
         *      var date = events.get('date')
         *
         *      var extended = events.extend([ { "date.year()" : date.year() } ]);
         *
         *      // or equivalent
         *
         *      var extended = events.extend([ { "date.year()" : new affinity.Year(date) } ]);
         *
         *      extended.print();
         *
         *      // +-------------------------------------------+--------------------------+-------------------------+
         *      // | date : Date                               | name : String            | date.year() : Integer   |
         *      // +===========================================+==========================+=========================+
         *      // | Fri Mar 07 2014 00:00:00 GMT-0500 (EST)   | Sochi                    | 2014                    |
         *      // +-------------------------------------------+--------------------------+-------------------------+
         *      // | Sun Feb 02 2014 00:00:00 GMT-0500 (EST)   | Chocolate rush           | 2014                    |
         *      // +-------------------------------------------+--------------------------+-------------------------+
         *      // | Thu May 15 2014 00:00:00 GMT-0400 (EDT)   | Millionth coffee drank   | 2014                    |
         *      // +-------------------------------------------+--------------------------+-------------------------+
         */
        constructor: function () {

            Function.apply(this, Array.prototype.slice.call(arguments, 0));

            this.type(TInteger);

            this.name = 'Year';

        },

        value: function () {

            return value(this.parameters[0]).getFullYear();

        }

    },{


    });

module.exports = Year;