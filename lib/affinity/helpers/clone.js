var _ = require('lodash');
var debug = require('./debug');

var clone = function (element) {

    debug.clone.trace('#clone');

    if (element.clone && _.isFunction(element.clone)) {

        return element.clone();

    } else {

        return _.cloneDeep(element);

    }

};

module.exports = clone;