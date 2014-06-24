module.exports.dayOfMonth = function () {

    var DayOfMonth = require('./../functions/date/DayOfMonth.js');

    if (this.checkNegate) {
        return this.checkNegate(new DayOfMonth(this));
    }

    return new DayOfMonth(this);

};

module.exports.dayOfWeek = function () {

    var DayOfWeek = require('./../functions/date/DayOfWeek.js');

    if (this.checkNegate) {
        return this.checkNegate(new DayOfWeek(this));
    }

    return new DayOfWeek(this);

};

module.exports.dayOfYear = function () {

    var DayOfYear = require('./../functions/date/DayOfYear.js');

    if (this.checkNegate) {
        return this.checkNegate(new DayOfYear(this));
    }

    return new DayOfYear(this);

};


module.exports.month = function () {

    var Month = require('./../functions/date/Month.js');

    if (this.checkNegate) {
        return this.checkNegate(new Month(this));
    }

    return new Month(this);

};

module.exports.ts = function () {

    var Timestamp = require('./../functions/date/Timestamp.js');

    if (this.checkNegate) {
        return this.checkNegate(new Timestamp(this));
    }

    return new Timestamp(this);

};

module.exports.weekOfYear = function () {

    var WeekOfYear = require('./../functions/date/WeekOfYear.js');

    if (this.checkNegate) {
        return this.checkNegate(new WeekOfYear(this));
    }

    return new WeekOfYear(this);

};

module.exports.year = function () {

    var Year = require('./../functions/date/Year.js');

    if (this.checkNegate) {
        return this.checkNegate(new Year(this));
    }

    return new Year(this);

};