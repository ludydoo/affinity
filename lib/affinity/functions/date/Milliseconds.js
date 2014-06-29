var Function = require('./../../Function.js');
var TInteger = require('./../../types/Integer.js');
var value = require('./../../helpers/value');

var FMilliseconds = Function.extend(
    /**
     * @lends FMilliseconds.prototype
     */
    {

        /**
         * @class Functions.Date.Milliseconds
         * @extends Function
         *
         * Function that extracts a date's milliseconds component
         *
         * Midnight is 0
         *
         * With extend operation :
         *
         *      var date1 = new Date();
         *      date1.setMilliseconds(100);
         *
         *
         *      var date2 = new Date();
         *      date2.setMilliseconds(200);
         *
         *      var date3 = new Date();
         *      date3.setMilliseocnds(300);
         *
         *      var events = new affinity.Relation([
         *          {time : {type : affinity.Date}}
         *      ],[
         *         [date1], [date2], [date3]
         *      ])
         *
         *      var time = events.get('time')
         *
         *      var extended = events.extend([ { "time.milliseconds()" : time.milliseconds() } ]);
         *
         *      // or equivalent
         *
         *      var extended = events.extend([ { "time.milliseconds()" : new affinity.Milliseconds(time) } ]);
         *
         *      extended.print();
         *
         *      // +-------------------------------------------+---------------------------------+
         *      // | time : Date                               | time.milliseconds() : Integer   |
         *      // +===========================================+=================================+
         *      // | Sun Jun 29 2014 08:44:17 GMT-0400 (EDT)   | 100                             |
         *      // +-------------------------------------------+---------------------------------+
         *      // | Sun Jun 29 2014 08:44:17 GMT-0400 (EDT)   | 200                             |
         *      // +-------------------------------------------+---------------------------------+
         *      // | Sun Jun 29 2014 08:44:17 GMT-0400 (EDT)   | 557                             |
         *      // +-------------------------------------------+---------------------------------+
         *
         */
        constructor: function () {

            Function.apply(this, Array.prototype.slice.call(arguments, 0));

            this.type(TInteger);

            this.name = 'Milliseconds';

        },

        /**
         * Gets the function return value
         * @returns {number}
         */
        value: function () {

            return value(this.parameters[0]).getMilliseconds();

        }

    },{


    });

module.exports = FMilliseconds;