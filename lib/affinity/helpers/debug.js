
var log4js;

try {
    log4js = require("log4js");

    log4js.configure({
        appenders: [
            { type: 'console' }
        ],
        replaceConsole: false
    });

    log4js.setGlobalLogLevel(log4js.levels.WARN);

} catch(e) {
    log4js = {};

    var logger = function(){
        this.trace = this.warn = this.debug = function(){
            return;
        }
    };

    log4js.getLogger = function(){
        return new logger();
    };
}

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
var SemiDifference = module.exports.semiDifference = log4js.getLogger('SemiDifference');
var Ungroup = module.exports.ungroup = log4js.getLogger('Ungroup');
var Union = module.exports.union = log4js.getLogger('Union');
var Unwrap = module.exports.unwrap = log4js.getLogger('Unwrap');
var Wrap = module.exports.wrap = log4js.getLogger('Wrap');
var TableDump = module.exports.reldump = log4js.getLogger('TableDump');
var Test = module.exports.test = log4js.getLogger('Test');

var Index = module.exports.index = log4js.getLogger('Index');
var Key = module.exports.key = log4js.getLogger('Key');
var ForeignKey = module.exports.foreignKey = log4js.getLogger('ForeignKey');


var Clone = module.exports.clone = log4js.getLogger('Clone');
var Type = module.exports.type = log4js.getLogger('Type');
var Coerce = module.exports.coerce = log4js.getLogger('Coerce');
var Compare = module.exports.compare = log4js.getLogger('Compare');
var Value = module.exports.value = log4js.getLogger('Value');
var Equal = module.exports.equal = log4js.getLogger('Equal');


