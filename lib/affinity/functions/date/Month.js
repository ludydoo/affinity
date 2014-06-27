var Function = require('./../../Function.js');
var TInteger = require('./../../types/Integer.js');
var value = require('./../../helpers/value');

var FMonth = Function.extend(
    /**
     * @lends FMonth.prototype
     */
    {

        /**
         * @class Functions.Date.Month
         * @extends Function
         *
         * Function that extracts a date's month number
         *
         * January is 0
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
         *      var extended = events.extend([ { month : date.month() } ]);
         *
         *      // or equivalent
         *
         *      var extended = events.extend([ { month : new affinity.Month(date) } ]);
         *
         *      extended.print();
         *
         *      // +-------------+------------------------+-----------------+
         *      // | date : Date | name : String          | month : Integer |
         *      // +=============+========================+=================+
         *      // | 2014/02/07  | Sochi                  | 1               |
         *      // +-------------+------------------------+-----------------+
         *      // | 2014/01/02  | Chocolate Rush         | 0               |
         *      // +-------------+------------------------+-----------------+
         *      // | 2014/04/15  | Millionth coffee drank | 3               |
         *      // +-------------+------------------------+-----------------+
         *      //
         */
        constructor: function () {

            Function.apply(this, Array.prototype.slice.call(arguments, 0));

            this.type(TInteger);

            this.name = 'Month';

        },

        value: function () {

            return value(this.parameters[0]).getMonth();

        }

    },{


    });

module.exports = FMonth;