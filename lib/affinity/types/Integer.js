var TNumeric = require('./Numeric.js');
var _ = require('lodash');

var TInteger = TNumeric.extend({

    /**
     * @class Types.Integer
     * @param value
     */
    constructor: function (value) {

        TNumeric.apply(this, Array.prototype.slice.call(arguments,0));

        this.name = 'TInteger';

    }

}, {

    coerce : function(value){

        if (_.isNumber(value) || _.isString(value)){
            return parseInt(value);
        }

    },

    toString: function () {
        return 'TInteger'
    },

    primitive : true,

    type : 'TInteger'

});

module.exports = TInteger;

