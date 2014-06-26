var value = require('./value');
var _ = require('lodash');
var Function = require('./../Function');
var Attribute = require('./../Attribute');
var Type = require('./../Type');

var TBoolean = require('./../types/Boolean');
var TString = require('./../types/String');
var TDate = require('./../types/Date');
var TInteger = require('./../types/Integer');
var TNumeric = require('./../types/Numeric');
var TFloat = require('./../types/Float');


var type = function(thang){

    if(thang instanceof Attribute){
        return thang.type;
    }

    if(thang instanceof Type){
        return thang.constructor;
    }

    if(thang instanceof Function){
        return thang.type();
    }

    if(_.isBoolean(thang)){
        return TBoolean;
    }

    if(_.isNumber(thang)){
        return TNumeric;
    }

    if(_.isDate(thang)){
        return TDate;
    }

};

module.exports = type;

