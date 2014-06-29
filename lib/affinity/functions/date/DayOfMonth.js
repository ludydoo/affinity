var Function = require('./../../Function.js');
var TInteger = require('./../../types/Integer.js');
var value = require('./../../helpers/value');

var FDayOfMonth = Function.extend(
    /**
     * @lends FDayOfMonth.prototype
     */
    {

        /**
         * @class Functions.Date.DayOfMonth
         * @extends Function
         *
         * Function that extracts a date's day of the month
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
         *      var extended = events.extend([ { "date.dayOfMonth()" : date.dayOfMonth() } ]);
         *
         *      // or equivalent
         *
         *      var extended = events.extend([ { "date.dayOfMonth()" : new affinity.DayOfMonth(date) } ]);
         *
         *      extended.print();
         *
         *      +-------------------------------------------+--------------------------+-------------------------------+
         *      | date : Date                               | name : String            | date.dayOfMonth() : Integer   |
         *      +===========================================+==========================+===============================+
         *      | Fri Feb 07 2014 00:00:00 GMT-0500 (EST)   | Sochi                    | 7                             |
         *      +-------------------------------------------+--------------------------+-------------------------------+
         *      | Thu Jan 02 2014 00:00:00 GMT-0500 (EST)   | Chocolate rush           | 2                             |
         *      +-------------------------------------------+--------------------------+-------------------------------+
         *      | Tue Apr 15 2014 00:00:00 GMT-0400 (EDT)   | Millionth coffee drank   | 15                            |
         *      +-------------------------------------------+--------------------------+-------------------------------+
         */
        constructor: function () {

            Function.apply(this, Array.prototype.slice.call(arguments, 0));

            this.type(TInteger);

            this.name = 'DayOfMonth';

        },

        /**
         * Gets the function's return value
         * @returns {number}
         */
        value: function () {

            return value(this.parameters[0]).getDate();

        }

    },{


    });

module.exports = FDayOfMonth;