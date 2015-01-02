var _ = require('lodash');
var debug = require('./debug');

var coerce = function (type, value) {

    debug.coerce.trace('#coerce');

    if(value instanceof type){

        return value;

    } else if (type && _.isFunction(type.coerce)) {

        return type.coerce.apply(this, Array.prototype.slice.call(arguments, 1));

    } else {

        if (type && value instanceof type) {
            return value;
        }
        if (type) {
            var result = new (type.prototype.constructor.bind.apply(type, (Array.prototype.slice.call(arguments, 0))));
        } else {
            result = value;
        }

        return result;

    }

};

module.exports = coerce;