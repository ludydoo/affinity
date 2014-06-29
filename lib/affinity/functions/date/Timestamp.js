var Function = require('./../../Function.js');
var Integer = require('./../../types/Integer.js');
var value = require('./../../helpers/value');

var Timestamp = Function.extend(

    {

        /**
         * @class Functions.Date.Timestamp
         * @extends Function
         *
         * Function that extracts a date's timestamp
         *
         * With extend operation :
         *
         *      var events = new affinity.Relation([
         *          {date : {type : affinity.Date}},
         *          {name : {type : affinity.String}}
         *      ],[
         *          [new Date(), 'Now'],
         *      ])
         *
         *      var date = events.get('date')
         *
         *      var extended = events.extend([ { "date.timestamp()" : date.ts() } ]);
         *
         *      // or equivalent
         *
         *      var extended = events.extend([ { "date.timestamp()" : new affinity.Timestamp(date) } ]);
         *
         *      extended.print();
         *
         *      // +-------------------------------------------+-----------------+------------------------------+
         *      // | date : Date                               | name : String   | date.timestamp() : Integer   |
         *      // +===========================================+=================+==============================+
         *      // | Sun Jun 29 2014 10:02:34 GMT-0400 (EDT)   | Now             | 1404050554805                |
         *      // +-------------------------------------------+-----------------+------------------------------+
         */
        constructor: function () {

            Function.apply(this, Array.prototype.slice.call(arguments, 0));

            this.type(Integer);

            this.name = 'Timestamp';

        },

        value: function () {

            var param = value(this.parameters[0]);

            return value(this.parameters[0]).getTime();

        }

    },{


    });

module.exports = Timestamp;