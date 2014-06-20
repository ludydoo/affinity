var _ = require('lodash');

var equal = function (type, value1, value2) {

    if (value1.equal && _.isFunction(value1.equal)) {
        return value1.equal(value2);
    }

    if (value2.equal && _.isFunction(value2.equal)) {
        return value2.equal(value1);
    }

    if (type && _.isFunction(type.equal)) {
        return type.equal(value1, value2);
    }

    return _.isEqual(value1, value2);

};

module.exports = equal;