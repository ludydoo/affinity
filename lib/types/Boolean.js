var Type = require('./../Type');

var TBoolean = Type.extend({

    constructor: function (value) {
        Type.apply(this, arguments);
    },

    inverse: function () {
        return new this.constructor(!this.value);
    },

    isTrue: function () {
        return this.value;
    },

    isFalse: function () {
        return !this.value;
    },

    valueOf: function () {

        return this.value;

    }

}, {

    equal: function (boolean1, boolean2) {

        return new TBoolean(boolean1.value === boolean2.value);

    },

    toString: function () {
        return 'TBoolean'
    },

    type : 'TBoolean'

});


module.exports = TBoolean;

