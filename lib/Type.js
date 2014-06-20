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

            this.name = 'Type';

            Base.apply(this, arguments);

        },

        eval: function () {
            return this;
        },

        clone : function(){

            return new this.constructor(this.value);

        }

    }, {

        type : 'Type',

        toString: function () {
            return 'Type'
        }

    });

module.exports = Type;