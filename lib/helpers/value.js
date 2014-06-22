var Function = require('./../Function');

var value = function (value) {

    if(value instanceof Function){

        value = value.value();

    }

    return value;

};

module.exports = value;