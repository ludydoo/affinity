module.exports.dayOfMonth = function () {

    var DayOfMonth = require('./../functions/date/DayOfMonth.js');

    if (this._checkNegatedAttribute) {
        return this._checkNegatedAttribute(new DayOfMonth(this));
    }

    return new DayOfMonth(this);

};

module.exports.dayOfWeek = function () {

    var DayOfWeek = require('./../functions/date/DayOfWeek.js');

    if (this._checkNegatedAttribute) {
        return this._checkNegatedAttribute(new DayOfWeek(this));
    }

    return new DayOfWeek(this);

};

module.exports.dayOfYear = function () {

    var DayOfYear = require('./../functions/date/DayOfYear.js');

    if (this._checkNegatedAttribute) {
        return this._checkNegatedAttribute(new DayOfYear(this));
    }

    return new DayOfYear(this);

};


module.exports.month = function () {

    var Month = require('./../functions/date/Month.js');

    if (this._checkNegatedAttribute) {
        return this._checkNegatedAttribute(new Month(this));
    }

    return new Month(this);

};

module.exports.ts = function () {

    var Timestamp = require('./../functions/date/Timestamp.js');

    if (this._checkNegatedAttribute) {
        return this._checkNegatedAttribute(new Timestamp(this));
    }

    return new Timestamp(this);

};

module.exports.weekOfYear = function () {

    var WeekOfYear = require('./../functions/date/WeekOfYear.js');

    if (this._checkNegatedAttribute) {
        return this._checkNegatedAttribute(new WeekOfYear(this));
    }

    return new WeekOfYear(this);

};

module.exports.year = function () {

    var Year = require('./../functions/date/Year.js');

    if (this._checkNegatedAttribute) {
        return this._checkNegatedAttribute(new Year(this));
    }

    return new Year(this);

};