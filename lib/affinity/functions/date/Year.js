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
         *      var extended = events.extend([ { year : date.year() } ]);
         *
         *      // or equivalent
         *
         *      var extended = events.extend([ { year : new affinity.Year(date) } ]);
         *
         *      extended.print();
         *
         *      // +-------------+----------------+
         *      // | date : Date | year : Integer |
         *      // +=============+================+
         *      // | 2013/01/02  | 2013           |
         *      // +-------------+----------------+
         *      // | 2011/06/30  | 2011           |
         *      // +-------------+----------------+
         *      // | 2010/04/15  | 2010           |
         *      // +-------------+----------------+
         *      //
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