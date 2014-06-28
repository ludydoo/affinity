var Function = require('./../../Function.js');
var TInteger = require('./../../types/Integer.js');
var value = require('./../../helpers/value');

var FTimestamp = Function.extend(
    /**
     * @lends FTimestamp.prototype
     */
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
         *      var extended = events.extend([ { seconds : date.ts() } ]);
         *
         *      // or equivalent
         *
         *      var extended = events.extend([ { seconds : new affinity.Timestamp(date) } ]);
         *
         *      extended.print();
         *
         *      // +-------------+------------------------+---------------------+
         *      // | date : Date | name : String          | timestamp : Integer |
         *      // +=============+========================+=====================+
         *      // | 2014/06/26  | Now                    | 1403836635563       |
         *      // +-------------+------------------------+---------------------+
         *      //
         */
        constructor: function () {

            Function.apply(this, Array.prototype.slice.call(arguments, 0));

            this.type(TInteger);

            this.name = 'Timestamp';

        },

        value: function () {

            if (!Date.now) {
                value(this.parameters[0]).getTime();
            } else {
                value(this.parameters[0]).now();
            }

        }

    },{


    });

module.exports = FTimestamp;