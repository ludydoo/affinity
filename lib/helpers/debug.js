var log4js = require('log4js');

log4js.configure({
    appenders: [
        { type: 'console' }
    ]
});

log4js.setGlobalLogLevel(log4js.levels.ERROR);

var Set = module.exports.set = log4js.getLogger('Set');
var Relation = module.exports.relation = log4js.getLogger('Relation');
var Header = module.exports.header = log4js.getLogger('Header');


var Compose = module.exports.compose = log4js.getLogger('Compose');
var Difference = module.exports.difference = log4js.getLogger('Difference');
var Extend = module.exports.extend = log4js.getLogger('Extend');
var Group = module.exports.group = log4js.getLogger('Group');
var Intersection = module.exports.intersection = log4js.getLogger('Intersection');
var Join = module.exports.join = log4js.getLogger('Join');
var Product = module.exports.product = log4js.getLogger('Product');
var Projection = module.exports.projection = log4js.getLogger('Projection');
var Rename = module.exports.rename = log4js.getLogger('Rename');
var Restriction = module.exports.restriction = log4js.getLogger('Restriction');
var SemiJoin = module.exports.semiJoin = log4js.getLogger('SemiJoin');
var Ungroup = module.exports.ungroup = log4js.getLogger('Ungroup');
var Union = module.exports.union = log4js.getLogger('Union');
var Unwrap = module.exports.unwrap = log4js.getLogger('Unwrap');
var Wrap = module.exports.wrap = log4js.getLogger('Wrap');

var indent = 0;
var indentSize = 4;

module.exports.group = function () {
    indent += indentSize;
};

module.exports.ungroup = function () {
    indent -= indentSize;
};

getIndent = function () {
    var result = '';
    for (var a = 0; a < indent; a++) {
        indent += ' ';
    }
};

