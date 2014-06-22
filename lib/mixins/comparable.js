module.exports.equals = function (attr) {

    var Equal = require('./../functions/comparable/Equal.js');

    if (this.checkNegate) {
        return this.checkNegate(new Equal(this, attr));
    }
    return new Equal(this, attr);

};
