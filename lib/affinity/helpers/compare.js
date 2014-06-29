var value = require('./value');
var _ = require('lodash');
var Function = require('./../Function');
var Type = require('./../Type');

var compare = function (type, value1, value2) {

    // Get the function return values if applicable

    value1 = value(value1);
    value2 = value(value2);


    // Access the type's equal function

    if(value1 instanceof Type){
        return value1.constructor.compare(value1, value2);
    }

    if(value2 instanceof Type){
        return value2.constructor.compare(value1, value2);
    }

    if(value1 instanceof Date){
        value1 = value1.getTime();
    }

    if(value2 instanceof Date){
        value2 = value2.getTime();
    }


    if(value1 === value2){
        return 0;
    } else if (value1 > value2){
        return 1;
    } else if (value2 > value1){
        return -1;
    }


};

module.exports = compare;