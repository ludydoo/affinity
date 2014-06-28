var Function = require('./../../Function.js');
var TInteger = require('./../../types/Integer.js');
var value = require('./../../helpers/value');

var WeekOfYear = Function.extend(
    {

        /**
         * @class Functions.Date.WeekOfYear
         * @extends Function
         *
         * Function that extracts a date's week number (0-51)
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
         *      var extended = events.extend([ { week : date.weekOfYear() } ]);
         *
         *      // or equivalent
         *
         *      var extended = events.extend([ { week : new affinity.weekOfYear(date) } ]);
         *
         *      extended.print();
         *
         *      // +-------------+------------------------+----------------+
         *      // | date : Date | name : String          | week : Integer |
         *      // +=============+========================+================+
         *      // | 2014/02/07  | Sochi                  | 6              |
         *      // +-------------+------------------------+----------------+
         *      // | 2014/01/02  | Chocolate Rush         | 0              |
         *      // +-------------+------------------------+----------------+
         *      // | 2014/04/15  | Millionth coffee drank | 15             |
         *      // +-------------+------------------------+----------------+
         *      //
         */
        constructor: function () {

            Function.apply(this, Array.prototype.slice.call(arguments, 0));

            this.type(TInteger);

            this.name = 'WeekOfYear';

        },

        /**
         * Gets the function return value
         * @returns {number}
         */
        value: function () {

            var d = new Date(+value(this.parameters[0]));
            d.setHours(0,0,0);
            d.setDate(d.getDate()+4-(d.getDay()||7));
            return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);

        }

    },{


    });

module.exports = WeekOfYear;