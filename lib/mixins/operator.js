module.exports.and = function () {

    var And = require('./../functions/operator/And.js');

    if (this.checkNegate) {
        return this.checkNegate(new And(this));
    }

    return new And(this);

};

module.exports.or = function () {

    var Or = require('./../functions/operator/Or.js');

    if (this.checkNegate) {
        return this.checkNegate(new Or(this));
    }

    return new Or(this);

};