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
         *          [new Date(2014, 02, 07), 'Sochi'],
         *          [new Date(2014, 01, 02), 'Chocolate rush'],
         *          [new Date(2014, 04, 15), 'Millionth coffee drank']
         *      ])
         *
         *      var date = events.get('date')
         *
         *      var extended = events.extend([ { day : date.dayOfMonth() } ]);
         *
         *      // or equivalent
         *
         *      var extended = events.extend([ { day : new affinity.DayOfMonth(date) } ]);
         *
         *      extended.print();
         *
         *      // +-------------+------------------------+---------------+
         *      // | date : Date | name : String          | day : Integer |
         *      // +=============+========================+===============+
         *      // | 2014/02/07  | Sochi                  | 07            |
         *      // +-------------+------------------------+---------------+
         *      // | 2014/01/02  | Chocolate Rush         | 02            |
         *      // +-------------+------------------------+---------------+
         *      // | 2014/04/15  | Millionth coffee drank | 15            |
         *      // +-------------+------------------------+---------------+
         *      //
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