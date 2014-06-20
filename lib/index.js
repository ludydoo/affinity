var affinity = {};

affinity.Set = require('./Set.js');


affinity.Relation = require('./Relation.js');
affinity.Tuple = require('./Tuple.js');
affinity.Header = require('./Header.js');
affinity.Attribute = require('./Attribute.js');

affinity.And = require('./functions/operator/And.js');
affinity.Or = require('./functions/operator/Or.js');
affinity.Not = require('./functions/operator/Not.js');

affinity.Equal = require('./functions/comparable/Equal.js');

affinity.Absolute = require('./functions/numeric/Absolute.js');

affinity.Type = require('./types/Type.js');
affinity.Integer = require('./types/Integer');
affinity.String = require('./types/String');
affinity.Boolean = require('./types/Boolean');

affinity.Union = require('./algebra/Union.js');
affinity.Rename = require('./algebra/Rename.js');
affinity.Product = require('./algebra/Product.js');
affinity.Difference = require('./algebra/Difference.js');
affinity.Intersection = require('./algebra/Intersection.js');

affinity.TABLE_DUM = new affinity.Relation([]);
affinity.TABLE_DEE = new affinity.Relation([], [
    []
]);

module.exports = affinity;