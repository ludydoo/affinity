var Header = require('./Header.js');
var Tuple = require('./Tuple.js');
var Type = require('./Type.js');
var _ = require('lodash');
var Set = require('./Set');
var debug = require('./helpers/debug');
var coerce = require('./helpers/coerce');
var Key = require('./Key');
var ForeignKey = require('./ForeignKey');


var Relation = Set.extend(
    {

        /**
         *
         * @class Relation
         * @param {Header|Object[]|Attribute[]} header Header of the Relation
         * @param {Tuple[]|Object[]} body Body of the Relation
         * @param {Object} constraints Constraints for the relation
         * @param {String[]} constraints.pk Fields that will constitute primary key
         * @param {{String[]}[]} constraints.unique Unique field definition
         * @param {Object[]} constraints.fk Foreign key definitions
         * @extends Set
         *
         * Relation constructor
         *
         * A Relation is basically a {@link Set}, implementing the basic set operators (Union, Difference, Intersection, Product)
         * and adding more operators. It also has a {@link Header}, and adds constraints to the basic {@link Set} behavior.
         *
         *     var relation = new affinity.Relation([
         *          {id : {type : affinity.Integer}},
         *          {name : {type : affinity.String}},
         *          {born : {type : affinity.Date}},
         *     ],[
         *          [1, 'John Doe', new Date(1934, 10, 20)],
         *          [2, 'John Wilson', new Date(1922, 7, 5)],
         *     ]);
         */
        constructor: function (header, body, constraints) {

            debug.relation.trace('#constructor');

            /**
             * @property {{pk: String[], unique: {String[]}[], fk: Object[]}} _constraintArguments
             */
            this._constraintArguments = constraints;

            /**
             * @property {Key} _pk The Primary Key for the Relation
             */
            this._pk = null;

            /**
             * @property {Key[]} _uks The Primary Keys for the Relation
             */
            this._uks = [];

            /**
             * @property {Key[]} _fks The Foreign Keys for the Relation
             */
            this._fks = [];

            /**
             * @property {Header} _header The relation header
             */
            this.header(Header.coerce(header));

            var that = this;

            Set.call(this, {type: Tuple, elements: body});


        },

        bindEvents: function () {

            debug.relation.trace('#bindEvents');

            var that = this;

            this.ee.on('beforeGetElements', function () {
                that.ee.emit('beforeGetBody');
            });

            this.ee.on('beforeAdd', function (tuple) {

                // Add default values
                that.header().each(function(attribute){

                    var tupleAttribute = tuple.get(attribute.name);

                    if(tupleAttribute === null || tupleAttribute === undefined || tupleAttribute === ''){

                        tuple.set(attribute.name, attribute.default());

                    }

                });

                // Coerce tuple attributes
                that.header().each(function(attribute){

                    var attributeValue, attributeType;

                    attributeValue = tuple.get(attribute.name);

                    attributeType = attribute.type;

                    attributeValue = coerce(attributeType, attributeValue);

                    tuple.set(attribute.name, attributeValue);

                });

                // Check that the tuple is union-compatible with the relation
                if (!that.isCompatible(tuple)) {
                    throw new Error('Tuple is not union compatible');
                }

                tuple.relation = that;

            });

            this.ee.once('beforeGetElements', function () {

                var constraintArguments = that._constraintArguments;

                // Parse constraint arguments
                if (constraintArguments) {

                    // Parse primary key argument
                    if (constraintArguments.pk) {
                        that._pk = new Key(that, constraintArguments.pk);
                    }

                    // Parse foreign key arguments
                    if (constraintArguments.fk) {
                        _.forEach(constraintArguments.fk, function (fk) {
                            fk.relation = that;
                            that._fks.push(new ForeignKey(fk));
                        })
                    }

                    // Parse unique key arguments
                    if (constraintArguments.unique) {

                        _.forEach(constraintArguments.unique, function (unique) {
                            that._uks.push(new Key(that, unique));
                        }, that);

                    }

                }

                // Check that constraints are irreducible

                var constraints = _.union(that._pk === null ? undefined : [that._pk], that._uks);

                _.forEach(constraints,

                        function (constraint, index) {

                        // Check that if the constraint applies on an object, that
                        // its type has the serialize method

                        constraint.header.each(

                            function (attribute) {
                            if (!attribute.type.primitive && !_.isFunction(attribute.type.serialize)) {
                                throw new Error(
                                        'Cannot index attribute "' + attribute.name + '". ' +
                                        'Its type "' + attribute.type.type + '" must' +
                                        'have a "serialize" method for it to be indexable.');
                            }
                        });

                        // Further validation for keys

                        for (var a = index + 1, len = constraints.length; a < len; a++) {

                            var checkedKeyHeader = constraints[a].header;

                            // Check that the keys are unique
                            if (constraint.header.equal(checkedKeyHeader)) {
                                throw new Error('Constraints must be unique');
                            }

                            // Check that the keys are irreducible
                            if (constraint.header.setIntersection(checkedKeyHeader).length() !== 0) {
                                throw new Error('Constraint must be irreducible');
                            }

                        }

                    })


            });

            this.ee.on('afterAdd', function(tuple, index){
                tuple.index = index;
                tuple.relation = that;
            });

            

        },

        /**
         * Delete or add tuples to match a given relation
         * @param {Relation} relation
         */
        adjustTo: function(relation){

            this.compute();

            relation.compute();

            var that = this;

            // 1. Delete tuples that do not exist in the given relation

            // Loop through each tuple
            that.each(function(tuple, index){

                // Check if the tuple exists in the given relation
                if (!relation.exists(tuple)){
                    that.removeAt(index);
                }

            });

            // 2. Add tuples that do not exist in the relation

            // Loop through each tuple of the given relation
            relation.each(function(tuple){

                // Check if the tuple is present in this relation
                if (!that.exists(tuple)){

                    that.add(tuple.clone());

                }

            });

        },

        _index: function (element) {

            // Look for the tuple in the PK if it exists

            if (this._pk) {
                var index = this._pk.index.getIndex(element);

                if (index !== null) {
                    console.log('Found by pk');
                    return index;
                }

            }


            var result = null;

            _.any(this._uks, function (uniqueConstraint) {

                result = uniqueConstraint.index.getIndex(element);
                if (result !== null)
                    return false;

            }, this);

            return result;

        },

        /**
         * Gets the specified attribute object by name
         * @param {String} attribute Attribute name
         * @returns {Attribute|null} The attribute or null if not found
         *
         * @example
         *
         * var fn = new affinity.Attribute({name : 'firstName', type : affinity.String})
         * var ln = new affinity.Attribute({name : 'lastName', type : affinity.String})
         *
         * var relation = new affinity.Relation([
         *          fn,
         *          ln
         *      ],[
         *          ['John','Doe'],
         *          ['Hello','World'],
         *          ['Super','Duper'],
         *      ]);
         *
         * relation.get('firstName') === fn // true
         *
         *
         */
        get: function (attribute) {

            debug.relation.trace('#get');

            return this.header().get(attribute);

        },

        /**
         * Get the tuple at the given index
         * @param {number} index The index of the tuple
         * @returns {*|null}
         * @example
         * var relation = new affinity.Relation([
         *          { 'firstName' : {type : affinity.String}}
         *          { 'LastName'  : {type : affinity.String}}
         *      ],[
         *          ['John','Doe'],
         *          ['Hello','World'],
         *          ['Super','Duper'],
         *      ]);
         *
         * relation.each(function(tuple, index){
         *
         *      console.log(relation.atIndex(index) === tuple) // true
         *
         * })
         *
         * console.log(relation.atIndex(0).get('firstName')) // John
         *
         */
        atIndex: function (index) {

            debug.relation.trace('#atIndex');

            return this.elements()[index];

        },

        /**
         * @param {Set} [tuples] The new set of body
         * @returns {Set|Relation} The body/null if getter, this if setter
         *
         * Getter/Setter for the body property
         *
         * You will more likely always use the getter (Relation.body()) than the setter
         * (Relation.body(body)) part for this method.
         *     var relation = new affinity.Relation([
         *              { 'firstName' : {type : affinity.String}}
         *              { 'LastName'  : {type : affinity.String}}
         *          ]);
         *
         *     var set = new affinity.Set();
         *
         *     set.add(new affinity.Tuple({firstName : 'John', lastName : 'Doe'}))
         *     set.add(new affinity.Tuple({firstName : 'Hello', lastName : 'World'}))
         *     set.add(new affinity.Tuple({firstName : 'John', lastName : 'Cage'}))
         *
         *     relation.body(set); // Sets the relation's body
         *
         *     relation.body() // Gets the relation's body
         *
         *     console.log(relation.body() === set) // true
         *
         */
        body: function (tuples) {

            debug.relation.trace('#body');

            if (tuples) {

                this.elements(tuples);

                return this

            } else {

                this.ee.emit('beforeGetBody');

                return this.elements();

            }

        },

        /**
         * @return {Relation} Returns this for chaining
         *
         * Calculates the relation. Because the relations are only calculated when their header or their body
         * are requested, you must explicitly call compute() if you want to calculate a relation.
         *
         * You should not need to use this function. Calling body() or header() calculates the relation
         * automatically
         *
         *     var product = relation1.product(relation2);
         *
         *     // At this point, nothing has been calculated.
         *
         *     product.header() // Because we requested the header, it is calculated
         *
         *     product.body() // Because we requested the body, it is calculated
         *
         *     var product2 = relation1.product(relation2);
         *
         *     product2.compute(); // Calculates the header and the body;
         *
         */
        compute: function () {

            debug.relation.trace('#compute');

            this.header();
            this.body();

            return this;

        },

        /**
         * @param {Header} [header]
         * @returns {null|{Header}}
         *
         * Gets or sets the relation's header
         */
        header: function (header) {

            if (header) {

                debug.relation.trace('#header (set)');

                this._header = header;

                header.relation = this;

            } else {

                debug.relation.trace('#header (get)');

                this.ee.emit('beforeGetHeader');

                return this._header;

            }

        },

        /**
         * @param {Tuple|Object} tuple
         * @returns {boolean}
         *
         * Check if a tuple is compatible with the relation
         */
        isCompatible: function (tuple) {

            debug.relation.trace('#isCompatible');

            tuple = Tuple.coerce(tuple);

            var tupleKeys = Object.keys(tuple.attributes);
            var tupleKeyCount = tupleKeys.length;
            var headerKeys = Object.keys(this.header()._attributes);
            var headerKeyCount = headerKeys.length;


            /// Check if the given tuple has the same header as the relation

            // Header and Tuple must have the same number of attributes
            if (tupleKeyCount !== headerKeyCount) {
                return false;
            }

            // Header and Tuple must have the same attribute names
            return !_.some(headerKeys, function (headerAttribute) {

                // Loop through each attributes of the tuple
                return !_.some(tupleKeys, function (tupleAttribute) {

                    // Found a match
                    return (tupleAttribute === headerAttribute && (tuple.get(tupleAttribute) !== undefined) && (tuple.get(tupleAttribute) !== null));

                });

            });

        },

        /**
         * @param {Relation} relation The relation to compare to
         * @returns {boolean} If the relations are equal or not
         *
         * Tests if the relation is equal to another one
         */
        equal: function (relation) {

            debug.relation.trace('#equal');

            return this.constructor.equal(this, relation);
        },

        /**
         * Clones a relation
         * @param {boolean=true} withTuples Copies the tuples
         * @returns {Relation}
         */
        clone : function(withTuples){

            if (withTuples === undefined || withTuples === null){
                withTuples = true;
            } else {
                withTuples = false;
            }

            var newHeader = this.header().clone();

            var newRelation = new Relation(newHeader);

            if (withTuples){
                this.each(function(tuple){
                    newRelation.add(tuple.clone());
                });
            }

            return newRelation;

        },

        /**
         * Prints the printable representation of the Relation to console
         */
        print: function () {

            debug.relation.trace('#print');

            console.log(this.toString());
        },

        /**
         * Gets the string representation of the relation
         * @returns {String} The string print representation of the relation
         */
        toString: function () {

            var hspacing = 1,
                vspacing = 1,
                arr = this.arr = [],
                headerRow = [],
                maxWidths = [],
                maxHeights = [];

            debug.relation.trace('#getPrintString');

            this.compute();

            this.header().each(function (attribute) {

                headerRow.push({ width: null, height: null, lines: null, attribute: attribute, string: attribute.toString()})

            }, this);

            // [ {width, height, lines, string},{width, height, lines, string},... ] ]

            arr.push(headerRow);

            this.each(function (tuple) {

                var tupleRow = [];

                _.forEach(headerRow, function (attr) {
                    tupleRow.push({ width: null, height: null, lines: null, string: tuple.get(attr.attribute.name).toString()})
                }, this);

                arr.push(tupleRow);

            }, this);

            function findHeight(string) {

                return string.split("\n").length;

            }

            function findWidth(string) {

                var lines = string.split('\n'),
                    max = 0;

                _.forEach(lines, function (line) {

                    var lineLength = line.length;

                    if (lineLength > max)
                        max = lineLength;

                }, this);

                return max;

            }

            function findMaxWidth(arr) {

                var max = 0;

                _.forEach(arr, function (obj) {

                    var lineWidth = obj.width;

                    if (lineWidth > max)
                        max = lineWidth;

                }, this);

                return max;
            }

            function findMaxHeight(arr) {

                var max = 0;

                _.forEach(arr, function (obj) {

                    var lineHeight = obj.height;

                    if (lineHeight > max)
                        max = lineHeight;

                }, this);

                return max;

            }

            function parseLines(string) {
                return string.split("\n");
            }

            // [
            //   [{width, height, lines, string},{width, height, lines, string},... ],
            //   [{width, height, lines, string},{width, height, lines, string},... ],
            //   [{width, height, lines, string},{width, height, lines, string},... ],
            //   ...
            // ]


            _.forEach(arr, function (row, rowIndex) {

                _.forEach(row, function (col, colIndex) {

                    col.width = findWidth(col.string);
                    col.height = findHeight(col.string);
                    col.lines = parseLines(col.string);

                    if (!maxWidths[colIndex] || maxWidths[colIndex] < col.width) {
                        maxWidths[colIndex] = col.width;
                    }

                    if (!maxHeights[rowIndex] || maxHeights[rowIndex] < col.height) {
                        maxHeights[rowIndex] = col.height;
                    }

                }, this);

            }, this);

            var result = '\n';


            // Printing the top border

            result += '+';

            _.forEach(maxWidths, function (maxWidth, index) {

                for (var a = 0; a < maxWidths[index] + hspacing * 2 + 2; a++) {
                    result += '-'
                }

                result += '+'

            }, this);

            result += '\n';

            // Printing the attributes

            _.forEach(arr, function (row, rowIndex) {

                var maxHeight = maxHeights[rowIndex];

                for (var a = 0; a < maxHeight; a++) {

                    result += '|';

                    _.forEach(row, function (col, colIndex) {

                        var maxWidth = maxWidths[colIndex];

                        var line = col.lines[a];

                        if (!line) line = '';

                        for (var i = 0; i < hspacing; i++) {
                            result += ' ';
                        }

                        var lineLength = line.length;

                        result += line;

                        for (var k = 0; k < hspacing; k++) {
                            result += ' ';
                        }

                        for (var b = 0; b < maxWidth - lineLength + 2 * hspacing; b++) {
                            result += ' ';
                        }

                        result += '|';

                    }, this);

                    result += '\n';

                }

                result += '+';

                _.forEach(maxWidths, function (maxWidth, index) {

                    for (var a = 0; a < maxWidths[index] + hspacing * 2 + 2; a++) {
                        if (rowIndex === 0) {
                            result += '='
                        } else {
                            result += '-'
                        }

                    }

                    result += '+'

                }, this);


                if (rowIndex != arr.length - 1) result += '\n';


            }, this);

            return result;

        },


        /**
         * Updates tuples in the relation
         * @param predicate
         * @param values
         *
         * Example
         *
         *     relation.update(age.gt(20), { age : age.old().plus(10), name : name.old().substr(0,1) });
         */
        update : function(predicate, values){

            predicate.convertAttributeToTuple();

            _.forEach(values, function(value){
                value.convertAttributeToTuple();
            });

            this.each(function(tuple){

                if(predicate.assignTuple(tuple).value() === true){

                    _.forEach(values, function(expression, key){

                        var value = expression.assignTuple(tuple).value();

                        tuple.set(key, value);

                    })

                }

            })

        },

        //region Operations

        /**
         *
         * @param {Relation} relation The relation to compute difference against
         * @returns {Operators.Difference} The resulting relation
         *
         * Shortcut to create a Difference relation based on this relation and the specified one
         *
         *     var relation1 = new affinity.Relation([
         *              {firstName : {type : affinity.String}}
         *              {lastName : {type : affinity.String}}
         *          ],[
         *              ['John','Doe'],
         *              ['Lucino','Veo'],
         *              ['Mary','Poppins'],
         *          ]);
         *
         *     var relation2 = new affinity.Relation([
         *              {firstName : {type : affinity.String}}
         *              {lastName : {type : affinity.String}}
         *          ],[
         *              ['John','Doe']
         *          ]);
         *
         *     var diff = relation1.difference(relation2);
         *
         *     // +---------------------+--------------------+
         *     // | firstName : TString | lastName : TString |
         *     // +---------------------+--------------------+
         *     // | Lucino              | Veo                |
         *     // +---------------------+--------------------+
         *     // | Mary                | Poppins            |
         *     // +---------------------+--------------------+
         */
        difference: function (relation) {

            debug.relation.trace('#difference');

            return new (require('./algebra/Difference'))(this, relation);
        },

        /**
         * @param {Relation} relation The relation to compute intersection against
         * @returns {Operators.Intersection} The resulting relation
         *
         * Shortcut to create an Intersect relation based on this relation and the specified one
         *
         *     var relation1 = new affinity.Relation([
         *              {firstName : {type : affinity.String}}
         *              {lastName : {type : affinity.String}}
         *          ],[
         *              ['John','Doe'],
         *              ['Lucino','Veo'],
         *              ['Mary','Poppins'],
         *          ]);
         *
         *     var relation2 = new affinity.Relation([
         *              {firstName : {type : affinity.String}}
         *              {lastName : {type : affinity.String}}
         *          ],[
         *              ['John','Doe']
         *          ]);
         *
         *     var intersection = relation1.intersect(relation2);
         *
         *     // +---------------------+--------------------+
         *     // | firstName : TString | lastName : TString |
         *     // +---------------------+--------------------+
         *     // | John                | Doe                |
         *     // +---------------------+--------------------+
         */
        intersect: function (relation) {

            debug.relation.trace('#intersect');

            var Intersection = require('./algebra/Intersection');

            return new Intersection(this, relation);
        },

        /**
         *
         * @param {Relation} relation The relation to compute the join against
         * @returns {Operators.Join} The resulting relation
         *
         * Shortcut to create a Join relation based on this relation and the specified one
         *
         *     var relation1 = new affinity.Relation([
         *              {firstName : {type : affinity.String}}
         *              {lastName : {type : affinity.String}}
         *          ],[
         *              ['John','Doe'],
         *              ['Lucino','Veo'],
         *              ['Mary','Poppins'],
         *          ]);
         *
         *     var relation2 = new affinity.Relation([
         *              {LastName : {type : affinity.String}}
         *              {Title    : {type : affinity.String}}
         *          ],[
         *              ['Doe','Mr'],
         *              ['Poppins','Lady']
         *          ]);
         *
         *     var join = relation1.join(relation2);
         *
         *     // +---------------------+--------------------+-----------------+
         *     // | firstName : TString | lastName : TString | Title : TString |
         *     // +---------------------+--------------------+-----------------+
         *     // | John                | Doe                | Mr              |
         *     // +---------------------+--------------------+-----------------+
         *     // | Mary                | Poppins            | Lady            |
         *     // +---------------------+--------------------+-----------------+
         */
        join: function (relation) {

            debug.relation.trace('#join');

            return new (require('./algebra/Join'))(this, relation);
        },

        /**
         *
         * @param {Relation} relation The relation to compute product against
         * @returns {Operators.Product} The resulting relation
         *
         * Shortcut to create a Product relation based on this relation and the specified one
         *
         *     var relation1 = new affinity.Relation([
         *              {firstName : {type : affinity.String}}
         *              {lastName : {type : affinity.String}}
         *          ],[
         *              ['John','Doe'],
         *              ['Lucino','Veo'],
         *              ['Mary','Poppins'],
         *          ]);
         *
         *     var relation2 = new affinity.Relation([
         *              {title : {type : affinity.String}}
         *          ],[
         *              ['Lady'],
         *              ['Mr']
         *          ]);
         *
         *     var product = relation1.product(relation2);
         *
         *     // +---------------------+--------------------+-----------------+
         *     // | firstName : TString | lastName : TString | Title : TString |
         *     // +---------------------+--------------------+-----------------+
         *     // | John                | Doe                | Lady            |
         *     // +---------------------+--------------------+-----------------+
         *     // | John                | Doe                | Mr              |
         *     // +---------------------+--------------------+-----------------+
         *     // | Lucino              | Veo                | Lady            |
         *     // +---------------------+--------------------+-----------------+
         *     // | Lucino              | Veo                | Mr              |
         *     // +---------------------+--------------------+-----------------+
         *     // | Mary                | Poppins            | Lady            |
         *     // +---------------------+--------------------+-----------------+
         *     // | Mary                | Poppins            | Mr              |
         *     // +---------------------+--------------------+-----------------+
         */
        product: function (relation) {

            debug.relation.trace('#product');

            return new (require('./algebra/Product'))(this, relation);
        },

        /**
         * @param {String[]} attributeNames The relation to compute intersection against
         * @returns {Operators.Projection} The resulting relation
         *
         * Shortcut to create a Project relation based on this relation
         *
         * The attributeNames parameter must be in the format :
         *
         *     relation.project(['argument1', 'argument2']);
         *
         *     var relation1 = new affinity.Relation([
         *              {firstName : {type : affinity.String}}
         *              {lastName : {type : affinity.String}}
         *          ],[
         *              ['John','Doe'],
         *              ['Lucino','Veo'],
         *              ['Mary','Poppins'],
         *          ]);
         *
         *     var intersection = relation1.project(['firstName']);
         *
         *     // +---------------------+
         *     // | firstName : TString |
         *     // +---------------------+
         *     // | John                |
         *     // +---------------------+
         *     // | Lucino              |
         *     // +---------------------+
         *     // | Mary                |
         *     // +---------------------+
         */
        project: function (attributeNames) {

            debug.relation.trace('#project');

            return new (require('./algebra/Projection'))(this, attributeNames);
        },

        /**
         *
         * @param {Object} newNames An object containing the new attribute names.
         * @returns {Operators.Rename} The resulting relation
         *
         * Shortcut to create a Rename relation based on this relation
         *
         *     var relation1 = new affinity.Relation([
         *              {firstName : {type : affinity.String}}
         *              {lastName : {type : affinity.String}}
         *          ],[
         *              ['John','Doe'],
         *              ['Lucino','Veo'],
         *              ['Mary','Poppins'],
         *          ]);
         *
         *     var rename = relation1.rename({lastName : 'Boogie'});
         *
         *     // +---------------------+--------------------+
         *     // | firstName : TString | Boogie : TString   |
         *     // +---------------------+--------------------+
         *     // | John                | Doe                |
         *     // +---------------------+--------------------+
         *     // | Lucino              | Veo                |
         *     // +---------------------+--------------------+
         *     // | Mary                | Poppins            |
         *     // +---------------------+--------------------+
         */
        rename: function (newNames) {

            debug.relation.trace('#rename');

            return new (require('./algebra/Rename'))(this, newNames);
        },

        /**
         *
         * @param {Function} predicate The predicate to test the tuples against
         * @returns {Operators.Restriction} The resulting relation
         *
         * Shortcut to create a Restrict relation based on this relation
         *
         *     var relation = new affinity.Relation([
         *              {firstName : {type : affinity.String}}
         *              {lastName : {type : affinity.String}}
         *          ],[
         *              ['John','Doe'],
         *              ['Lucino','Veo'],
         *              ['Mary','Poppins'],
         *              ['Robert','Robert']
         *          ]);
         *
         *     // Multiple ways to build a predicate:
         *
         *     // Compare with static value
         *     relation.restrict(relation.get('firstName').equal('John'));
         *
         *     // +---------------------+--------------------+
         *     // | firstName : TString | Boogie : TString   |
         *     // +---------------------+--------------------+
         *     // | John                | Doe                |
         *     // +---------------------+--------------------+
         *
         *     // Compare two attributes
         *     relation.restrict(relation.get('firstName').equal(relation.get('lastName'));
         *
         *     // +---------------------+--------------------+
         *     // | firstName : TString | Boogie : TString   |
         *     // +---------------------+--------------------+
         *     // | Robert              | Robert             |
         *     // +---------------------+--------------------+
         *
         *     // Combine with and, or, not
         *     relation.restrict( (relation.get('firstName').not().equal('John')) .and( relation.get('lastName').not().equal('Veo') ) )
         *
         *     // +---------------------+--------------------+
         *     // | firstName : TString | Boogie : TString   |
         *     // +---------------------+--------------------+
         *     // | Mary                | Poppins            |
         *     // +---------------------+--------------------+
         *     // | Robert              | Robert             |
         *     // +---------------------+--------------------+
         */
        restrict: function (predicate) {

            debug.relation.trace('#restrict');

            return new (require('./algebra/Restriction'))(this, predicate);
        },

        /**
         * Shortcut to create a Union relation based on this relation and the specified one
         * @param {Relation} relation The relation to perform Union with
         * @returns {Operators.Union} The resulting relation
         */
        union: function (relation) {

            debug.relation.trace('#union');

            return new (require('./algebra/Union'))(this, relation);
        },

        /**
         * @param {Relation} relation
         * @returns {Operators.Composition} The resulting relation
         */
        compose: function (relation) {

            debug.relation.trace('#compose');

            return new (require('./algebra/Composition'))(this, relation);

        },

        /**
         * @param {String} groupingAttributeName
         * @param {String[]} groupedAttributeNames
         * @return {Operators.Group}
         */
        group: function (groupingAttributeName, groupedAttributeNames) {

            debug.relation.trace('#group');

            return new (require('./algebra/Group'))(this, groupingAttributeName, groupedAttributeNames);

        },

        /**
         * @param {String[]} groupedAttributeNames
         * @returns {Operators.Ungroup}
         */
        ungroup: function (groupedAttributeNames) {

            debug.relation.trace('#ungroup');

            return new (require('./algebra/Ungroup'))(this, groupedAttributeNames);

        },

        /**
         * SemiDifference
         * @returns {Operators.SemiDifference} The resulting relation
         * @param relation
         */
        sdifference: function (relation) {

            debug.relation.trace('#sdifference');

            return new (require('./algebra/Semidifference'))(this, relation);

        },

        /**
         * SemiJoin
         * @returns {Operators.SemiJoin} The Resulting Relation
         * @param relation
         */
        sjoin: function (relation) {

            debug.relation.trace('#sjoin');

            return new (require('./algebra/Semijoin'))(this, relation);

        },

        /**
         * Shortcut to execute a Wrap operation
         * @param wrappingAttributeName The name of the new wrapping attribute
         * @param {String[]} wrappedAttributes The attribute names to be wrapped
         * @returns {Operators.Wrap} The resulting relation
         */
        wrap: function (wrappingAttributeName, wrappedAttributes) {

            debug.relation.trace('#wrap');

            return new (require('./algebra/Wrap'))(this, wrappingAttributeName, wrappedAttributes);

        },

        /**
         * Shortcut to execute an Unwrap operation
         * @param {String[]} wrappedAttributeNames The names of the wrapped attributes to unwrap
         * @returns {Operators.Unwrap} The resulting relation
         */
        unwrap: function (wrappedAttributeNames) {

            debug.relation.trace('#unwrap');

            return new (require('./algebra/Unwrap'))(this, wrappedAttributeNames);

        },

        /**
         * Shortcut to create an Extend operation
         * @param {Object[]} expressions The expressions to evaluate
         * @returns {Operators.Extend} The resulting relation
         */
        extend: function (expressions) {

            debug.relation.trace('#extend');

            return new (require('./algebra/Extension'))(this, expressions);

        },

        /**
         * Shortcut to the Summarize operation
         * @param {String[]|Attribute[]} attributes The attributes to summarize
         * @param {Object} summaries Summary expressions
         */
        summarize : function(attributes, summaries){
            debug.relation.trace('#summarize');

            return new (require('./algebra/Summarize'))(this, attributes, summaries);

        },


        //endregion

        //region Aggregates

        all : function(predicate){

            var All = require('./functions/aggregate/All.js');

            return new All(this, predicate);

        },

        any : function(predicate){

            var Any = require('./functions/aggregate/Any.js');

            return new Any(this, predicate);

        },

        count : function(){

            var Count = require('./functions/aggregate/Count.js');

            return new Count(this);

        }
        //endregion

    }, {

        /**
         * Gets the string representation of the Relation type
         * @returns {string}

         * @static
         */
        toString: function () {
            return 'Relation'
        },

        type: 'Relation',

        /**
         * Tests for equality between two relations
         * @param {Relation} rel1
         * @param {Relation} rel2

         * @static
         * @returns {boolean}
         */
        equal: function (rel1, rel2) {

            debug.relation.trace('Relation.equal');

            if (!rel1.header().equal(rel2.header())) {
                return false;
            }

            rel1.compute();
            rel2.compute();

            return Set.equal(rel1, rel2);

        }

    });


module.exports = Relation;
