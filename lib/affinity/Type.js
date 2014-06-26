var Base = require('./Base.js');

var Type = Base.extend(
    {

        /**
         * @class Type
         * @param value
         */
        constructor: function (value) {

            this._value = value;

            this.name = 'Type';

            Base.apply(this, arguments);

        },

        value : function(){
            return this._value;
        },

        eval: function () {
            return this;
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