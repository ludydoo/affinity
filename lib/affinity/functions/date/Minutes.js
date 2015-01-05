var Function = require('./../../Function.js');
var TInteger = require('./../../types/Integer.js');
var value = require('./../../helpers/value');

var FMinutes = Function.extend(
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
         *      quarterToFive.setHours(4);
         *      quarterToFive.setMinutes(45);
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
         *      var extended = events.extend([ { "time.minutes()" : time.minutes() } ]);
         *
         *      // or equivalent
         *
         *      var extended = events.extend([ { "time.minutes()" : new affinity.Minutes(time) } ]);
         *
         *      extended.print();
         *
         *      // +-------------------------------------------+-------------------+----------------------------+
         *      // | time : Date                               | name : String     | time.minutes() : Integer   |
         *      // +===========================================+===================+============================+
         *      // | Sun Jun 29 2014 04:45:49 GMT-0400 (EDT)   | Quarter to Five   | 45                         |
         *      // +-------------------------------------------+-------------------+----------------------------+
         *      // | Sun Jun 29 2014 05:00:49 GMT-0400 (EDT)   | Five              | 0                          |
         *      // +-------------------------------------------+-------------------+----------------------------+
         *      // | Sun Jun 29 2014 06:30:49 GMT-0400 (EDT)   | Six Thirty        | 30                         |
         *      // +-------------------------------------------+-------------------+----------------------------+
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