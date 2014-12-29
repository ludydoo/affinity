var Base = require('./Base.js');

var Type = Base.extend(
    {

        /**
         * @class Type
         * @extends Base
         */
        constructor: function (value) {

            //this._value = value;

            Base.apply(this, arguments);

        },

        /**
         * Clones the object
         * @returns {Type}
         */
        clone : function(){

            return new this.constructor(this._value);

        },

        /**
         * Destroys the object
         */
        destroy : function(){

        }

    }, {

        type : 'Type',

        toString: function () {
            return 'Type'
        }

    });

module.exports = Type;