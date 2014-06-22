var value = require('./value');
var _ = require('lodash');
var Function = require('./../Function');
var Type = require('./../Type');

var equal = function (type, value1, value2) {

    // Get the function return values if applicable

    value1 = value(value1);
    value2 = value(value2);


    // Access the type's equal function

    if(value1 instanceof Type){
        return value1.constructor.equal(value1, value2);
    }

    if(value2 instanceof Type){
        return value2.constructor.equal(value1, value2);
    }


    // Fallback on good'ol lodash

    return _.isEqual(value1, value2);


};

module.exports = equal;