var Function = require('./../../Function.js');
var TInteger = require('./../../types/Integer.js');
var value = require('./../../helpers/value');

var FMinutes = Function.extend(
    /**
     * @lends FMinutes.prototype
     */
    {

        /**
         * @class Functions.Date.Minutes
         * @extends Function
         *
         * Function that extracts a date's minutes component as an integer
         *
         *
         * With extend operation :
         *
         *      var quarterToFive = new Date();
         *      wokeUp.setHours(4);
         *      wokeUp.setMinutes(45);
         *
         *      var five = new Date();
         *      five.setHours(5)
         *      five.setMinutes(0);
         *
         *      var sixThirty = new Date();
         *      sixThirty.setHours(6);
         *      sixThirty.setMinutes(30);
         *
         *
         *      var events = new affinity.Relation([
         *          {time : {type : affinity.Date}},
         *          {name : {type : affinity.String}}
         *      ],[
         *          [quarterToFive, 'Quarter to Five'],
         *          [five, 'Five'],
         *          [sixThirty, 'Six Thirty']
         *      ])
         *
         *      var time = events.get('time')
         *
         *      var extended = events.extend([ { minute : time.minutes() } ]);
         *
         *      // or equivalent
         *
         *      var extended = events.extend([ { minute : new affinity.Minutes(time) } ]);
         *
         *      extended.print();
         *
         *      // +--------------+------------------------+------------------+
         *      // | time : Date  | name : String          | minute : Integer |
         *      // +==============+========================+==================+
         *      // | 4:45         | Quarter to Five        | 45               |
         *      // +--------------+------------------------+------------------+
         *      // | 5:00         | Five                   | 0                |
         *      // +--------------+------------------------+------------------+
         *      // | 6:30         | Six Thirty             | 30               |
         *      // +--------------+------------------------+------------------+
         */
        constructor: function () {

            Function.apply(this, Array.prototype.slice.call(arguments, 0));

            this.type(TInteger);

            this.name = 'Minutes';

        },

        value: function () {

            return value(this.parameters[0]).getMinutes();

        }

    },{


    });

module.exports = FMinutes;