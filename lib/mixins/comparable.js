var Equal = require('./../functions/comparable/Equal.js');

module.exports.equals = function (attr) {
    return new Equal(this, attr);
};