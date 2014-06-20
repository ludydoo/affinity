var _ = require('lodash');

var coerce = function (type, value) {

    if (type && _.isFunction(type.coerce)) {

        return type.coerce(value);

    } else {

        if (type && value instanceof type) {
            return value;
        }
        if (type) {
            var result = new type(value);
        } else {
            result = value;
        }

        return result;

    }

};

module.exports = coerce;