var Function = require('./../../Function.js');
var Type = require('./../../Type.js');
var TBoolean = require('./../../types/Boolean.js');
var _ = require('lodash');

var FSmallerThan = Function.extend(
    /** @lends FSmallerThan.prototype */
    {

        /**
         * @class FSmallerThan
         * @augments Function
         */
        constructor: function () {

            this.name = 'Equal';

            this.minArgs = 2;

            this.maxArgs = 2;

            this.expect = Type;

            this.return = TBoolean;

            Function.apply(this, arguments);

        },

        valueOf: function () {

            var a;

            var value1 = this.args[0].valueOf();
            var value2 = this.args[1].valueOf();

            if (value1.constructor && _.isFunction(value1.constructor.equal)) {
                return value1.constructor.equal(value1, value2);
            }

            if (value2.constructor && _.isFunction(value2.constructor.equal)) {
                return value2.constructor.equal(value1, value2);
            }

            return (value1 == value2);

        }

    });

module.exports = FSmallerThan;