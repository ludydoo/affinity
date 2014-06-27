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

        clone : function(){

            return new this.constructor(this._value);

        }

    }, {

        type : 'Type',

        toString: function () {
            return 'Type'
        }

    });

module.exports = Type;