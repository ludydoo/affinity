var _ = require('lodash');

var clone = function (element) {

    if (element.clone && _.isFunction(element.clone)) {

        return element.clone();

    } else {

        return _.cloneDeep(element);

    }

};

module.exports = clone;