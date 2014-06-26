var value = require('./value');
var _ = require('lodash');
var Function = require('./../Function');
var Type = require('./../Type');

var equal = function (type, value1, value2) {

    // Get the function return values if applicable

    value1 = value(value1);
    value2 = value(value2);

    if(_.isUndefined(value1) && _.isUndefined(value2)){
        return true;
    } else if (_.isUndefined(value1) || _.isUndefined(value2)){
        return false;
    } else if (_.isNull(value1) && _.isNull(value2)){
        return true;
    } else if (_.isNull(value1) || _.isNull(value2)){
        return false;
    }


    // Access the type's equal function

    if(value1.constructor && value1.constructor.equal){
        return value1.constructor.equal(value1, value2);
    }

    if(value2.constructor && value2.constructor.equal){
        return value2.constructor.equal(value1, value2);
    }


    // Fallback on good'ol lodash

    return _.isEqual(value1, value2);


};

module.exports = equal;