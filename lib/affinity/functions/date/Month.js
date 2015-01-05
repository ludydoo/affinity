var Function = require('./../../Function.js');
var TInteger = require('./../../types/Integer.js');
var value = require('./../../helpers/value');

var FMonth = Function.extend(
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
         *          [new Date(2014, 1, 07), 'Sochi'],
         *          [new Date(2014, 0, 02), 'Chocolate rush'],
         *          [new Date(2014, 3, 15), 'Millionth coffee drank']
         *      ])
         *
         *      var date = events.get('date')
         *
         *      var extended = events.extend([ { "date.month()" : date.month() } ]);
         *
         *      // or equivalent
         *
         *      var extended = events.extend([ { "date.month()" : new affinity.Month(date) } ]);
         *
         *      extended.print();
         *
         *      // +-------------------------------------------+--------------------------+--------------------------+
         *      // | date : Date                               | name : String            | date.month() : Integer   |
         *      // +===========================================+==========================+==========================+
         *      // | Fri Feb 07 2014 00:00:00 GMT-0500 (EST)   | Sochi                    | 1                        |
         *      // +-------------------------------------------+--------------------------+--------------------------+
         *      // | Thu Jan 02 2014 00:00:00 GMT-0500 (EST)   | Chocolate rush           | 0                        |
         *      // +-------------------------------------------+--------------------------+--------------------------+
         *      // | Tue Apr 15 2014 00:00:00 GMT-0400 (EDT)   | Millionth coffee drank   | 3                        |
         *      // +-------------------------------------------+--------------------------+--------------------------+
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