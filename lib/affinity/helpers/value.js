
var debug = require('./debug');
var Function = require('./../Function');

var value = function (value) {

    debug.value.trace('#value');

    if(value instanceof Function){

        value = value.value();

    }

    return value;

};

module.exports = value;