var Function = require('./../../Function.js');
var TInteger = require('./../../types/Integer.js');
var value = require('./../../helpers/value');

var FDayOfYear = Function.extend(
    /**
     * @lends FDayOfYear.prototype
     */
    {

        /**
         * @class Functions.Date.DayOfYear
         * @extends Function
         *
         * Function that extracts a date's day of the year
         *
         * January 1st is 0
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
         *      var extended = events.extend([ { day : date.dayOfYear() } ]);
         *
         *      // or equivalent
         *
         *      var extended = events.extend([ { day : new affinity.DayOfYear(date) } ]);
         *
         *      extended.print();
         *
         *      // +-------------+------------------------+---------------+
         *      // | date : Date | name : String          | day : Integer |
         *      // +=============+========================+===============+
         *      // | 2014/02/07  | Sochi                  | 37            |
         *      // +-------------+------------------------+---------------+
         *      // | 2014/01/02  | Chocolate Rush         | 1             |
         *      // +-------------+------------------------+---------------+
         *      // | 2014/04/15  | Millionth coffee drank | 104           |
         *      // +-------------+------------------------+---------------+
         *      //
         *
         */
        constructor: function () {

            Function.apply(this, Array.prototype.slice.call(arguments, 0));

            this.type(TInteger);

            this.name = 'DayOfYear';

        },

        value: function () {

            var date = value(this.parameters[0]);

            var begin = new Date(date.getFullYear(),0,1);

            return Math.ceil((date - begin) / 86400000);

        }

    },{


    });

module.exports = FDayOfYear;