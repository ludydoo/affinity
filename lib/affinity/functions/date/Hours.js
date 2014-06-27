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
         *      var extended = events.extend([ { hour : time.hours() } ]);
         *
         *      // or equivalent
         *
         *      var extended = events.extend([ { hour : new affinity.Hours(time) } ]);
         *
         *      extended.print();
         *
         *      // +--------------+------------------------+----------------+
         *      // | time : Date  | name : String          | hour : Integer |
         *      // +==============+========================+================+
         *      // | (8 o'clock)  | Woke Up                | 8              |
         *      // +--------------+------------------------+----------------+
         *      // | (9 o'clock)  | Breakfast              | 9              |
         *      // +--------------+------------------------+----------------+
         *      // | (18 o'clock) | Dinner                 | 18             |
         *      // +--------------+------------------------+----------------+
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