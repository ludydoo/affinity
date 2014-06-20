var Base = require('./Base.js');

var Type = Base.extend(
    /** @lends Type.prototype */
    {

        /**
         * @class Type
         * @param value
         */
        constructor: function (value) {

            this.value = value;

            Base.apply(this, arguments);

        },

        eval: function () {
            return this;
        }

    }, {

        toString: function () {
            return 'Type'
        }

    });

module.exports = Type;