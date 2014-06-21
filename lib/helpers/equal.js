var _ = require('lodash');

var equal = function (type, value1, value2) {

    if(_.isUndefined(value1) && _.isUndefined(value2)){
        return true;
    } else if (_.isUndefined(value1)){
        return false
    } else if (_.isUndefined(value2)){
        return false;
    }

    if (value1.constructor && value1.constructor.equal){
        return value1.constructor.equal(value1, value2).valueOf();
    }

    if (value2.constructor && value2.constructor.equal){
        return value2.constructor.equal(value2, value1).valueOf();
    }

    if (value1.equal && _.isFunction(value1.equal)) {
        return value1.equal(value2).valueOf();
    }

    if (value2.equal && _.isFunction(value2.equal)) {
        return value2.equal(value1).valueOf();
    }

    if (type && _.isFunction(type.equal)) {
        return type.equal(value1, value2).valueOf();
    }

    return _.isEqual(value1, value2);

};

module.exports = equal;