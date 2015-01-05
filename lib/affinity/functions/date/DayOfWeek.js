var Function = require('./../../Function.js');
var TInteger = require('./../../types/Integer.js');
var value = require('./../../helpers/value');

var FDayOfWeek = Function.extend(
    {

        /**
         * @class Functions.Date.DayOfWeek
         * @extends Function
         *
         * Function that extracts a date's day of the week
         *
         * Sunday is 0, Saturday is 6
         *
         * With extend operation :
         *
         *      var events = new affinity.Relation([
         *          {date : {type : affinity.Date}},
         *          {name : {type : affinity.String}}
         *      ],[
         *          [new Date(2014, 1, 07), 'Sochi'],
         *          [new Date(2014, 0, 02), 'Chocolate rush'],
         *          [new Date(2014, 3, 15), 'Millionth coffee drank']
         *      ])
         *
         *      var date = events.get('date')
         *
         *      var extended = events.extend([ { "date.dayOfWeek()" : date.dayOfWeek() } ]);
         *
         *      // or equivalent
         *
         *      var extended = events.extend([ { "date.dayOfWeek()" : new affinity.DayOfWeek(date) } ]);
         *
         *      extended.print();
         *
         *      // +-------------------------------------------+--------------------------+------------------------------+
         *      // | date : Date                               | name : String            | date.dayOfWeek() : Integer   |
         *      // +===========================================+==========================+==============================+
         *      // | Fri Feb 07 2014 00:00:00 GMT-0500 (EST)   | Sochi                    | 5                            |
         *      // +-------------------------------------------+--------------------------+------------------------------+
         *      // | Thu Jan 02 2014 00:00:00 GMT-0500 (EST)   | Chocolate rush           | 4                            |
         *      // +-------------------------------------------+--------------------------+------------------------------+
         *      // | Tue Apr 15 2014 00:00:00 GMT-0400 (EDT)   | Millionth coffee drank   | 2                            |
         *      // +-------------------------------------------+--------------------------+------------------------------+
         *
         */
        constructor: function () {

            Function.apply(this, Array.prototype.slice.call(arguments, 0));

            this.type(TInteger);

            this.name = 'DayOfWeek';

        },

        /**
         * Gets the function return value
         * @returns {number}
         */
        value: function () {

            return value(this.parameters[0]).getDay();

        }

    },{


    });

module.exports = FDayOfWeek;