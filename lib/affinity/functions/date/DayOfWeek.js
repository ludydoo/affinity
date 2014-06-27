var Function = require('./../../Function.js');
var TInteger = require('./../../types/Integer.js');
var value = require('./../../helpers/value');

var FDayOfWeek = Function.extend(
    /**
     * @lends FDayOfWeek.prototype
     */
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
         *          [new Date(2014, 02, 07), 'Sochi'],
         *          [new Date(2014, 01, 02), 'Chocolate rush'],
         *          [new Date(2014, 04, 15), 'Millionth coffee drank']
         *      ])
         *
         *      var date = events.get('date')
         *
         *      var extended = events.extend([ { day : date.dayOfWeek() } ]);
         *
         *      // or equivalent
         *
         *      var extended = events.extend([ { day : new affinity.DayOfWeek(date) } ]);
         *
         *      extended.print();
         *
         *      // +-------------+------------------------+---------------+
         *      // | date : Date | name : String          | day : Integer |
         *      // +=============+========================+===============+
         *      // | 2014/02/07  | Sochi                  | 0             |
         *      // +-------------+------------------------+---------------+
         *      // | 2014/01/02  | Chocolate Rush         | 6             |
         *      // +-------------+------------------------+---------------+
         *      // | 2014/04/15  | Millionth coffee drank | 4             |
         *      // +-------------+------------------------+---------------+
         *      //
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