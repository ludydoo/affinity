var _ = require('lodash');

var coerce = function (type, value) {

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