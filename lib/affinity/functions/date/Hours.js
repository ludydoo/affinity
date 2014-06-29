var Function = require('./../../Function.js');
var TInteger = require('./../../types/Integer.js');
var value = require('./../../helpers/value');

var FHours = Function.extend(
    /**
     * @lends FHours.prototype
     */
    {

        /**
         * @class Functions.Date.Hours
         * @extends Function
         *
         * Function that extracts a date's hours component as an integer
         *
         * Midnight is 0
         *
         * With extend operation :
         *
         *      var wokeUp = new Date();
         *      wokeUp.setHours(8);
         *
         *      var breakfast = new Date();
         *      breakfast.setHours(9)
         *
         *      var dinner = new Date();
         *      dinner.setHours(18);
         *
         *      var events = new affinity.Relation([
         *          {time : {type : affinity.Date}},
         *          {name : {type : affinity.String}}
         *      ],[
         *          [wokeUp, 'Woke Up'],
         *          [breakfast, 'Breakfast'],
         *          [dinner, 'Dinner']
         *      ])
         *
         *      var time = events.get('time')
         *
         *      var extended = events.extend([ { "time.hours()" : time.hours() } ]);
         *
         *      // or equivalent
         *
         *      var extended = events.extend([ { "time.hours()" : new affinity.Hours(time) } ]);
         *
         *      extended.print();
         *
         *      // +-------------------------------------------+-----------------+--------------------------+
         *      // | time : Date                               | name : String   | time.hours() : Integer   |
         *      // +===========================================+=================+==========================+
         *      // | Sun Jun 29 2014 08:43:39 GMT-0400 (EDT)   | Woke Up         | 8                        |
         *      // +-------------------------------------------+-----------------+--------------------------+
         *      // | Sun Jun 29 2014 09:43:39 GMT-0400 (EDT)   | Breakfast       | 9                        |
         *      // +-------------------------------------------+-----------------+--------------------------+
         *      // | Sun Jun 29 2014 18:43:39 GMT-0400 (EDT)   | Dinner          | 18                       |
         *      // +-------------------------------------------+-----------------+--------------------------+
         *
         */
        constructor: function () {

            Function.apply(this, Array.prototype.slice.call(arguments, 0));

            this.type(TInteger);

            this.name = 'Hours';

        },

        /**
         * Gets the function's return value
         * @returns {number}
         */
        value: function () {

            return value(this.parameters[0]).getHours();

        }

    },{


    });

module.exports = FHours;