var Header = require('./Header.js');
var Tuple = require('./Tuple.js');
var Type = require('./type.js');
var _ = require('lodash');
var Set = require('./Set');
var debug = require('./helpers/debug');

var Relation = Set.extend(
    /**
     * @lends Relation.prototype
     */
    {

        /**
         * Relation constructor
         *
         * A Relation is basically a {@link Set}, implementing the basic set operators (Union, Difference, Intersection, Product)
         * and adding more operators. It also has a {@link Header}, and adds constraints to the basic {@link Set} behavior.
         *
         * @param {Header|Object[]|Attribute[]} header Header of the Relation
         * @param {Tuple[]|Object[]} body Body of the Relation
         * @augments Set
         * @class Relation
         *
         *
         */
        constructor: function (header, body) {

            debug.relation.trace('#constructor');

            this._header = Header.coerce(header);
            this._header.relation = this;

            Set.call(this, {type: Tuple, elements: body});

        },

        bindEvents: function () {

            debug.relation.trace('#bindEvents');

            var that = this;

            this.ee.on('beforeGetElements', function () {
                that.ee.emit('beforeGetBody');
            });

            this.ee.on('beforeAdd', function (tuple, index) {

                if (!that.isCompatible(tuple)) {
                    throw new Error('Tuple is not union compatible');
                }
            });

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
         * @param {int} index The index of the tuple
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
         *      console.log(relation.getAt(index) === tuple) // true
         *
         * })
         *
         * console.log(relation.getAt(0).get('firstName')) // John
         *
         */
        getAt: function (index) {

            debug.relation.trace('#getAt');

            return this.elements()[index];

        },

        /**
         * Removes a tuple from the relation
         * @param {Tuple|Object} tupleToRemove The tuple to be removed
         * @return {boolean} True if the tuple was removed, false otherwise
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
         * relation.remove({firstName : 'John', 'LastName', 'Doe'}); //true
         *
         * var tuple = relation.getAt(0) // Tuple(firstName: 'Hello', lastName : 'World');
         *
         * relation.remove(tuple) // true
         *
         * relation.remove(tuple) // false, it was already removed
         *
         */
        remove: function (tupleToRemove) {

            debug.relation.trace('#remove');

            var tuple, index;

            tuple = Tuple.coerce(tupleToRemove);

            // Find the index of the tuple
            index = this.index(tuple);

            // If found, remove it.
            if (index !== null) {
                this.body().splice(index, 1);
                return true;
            }

            return false;

        },

        /**
         * Getter/Setter for the tuple property
         *
         * You will more likely always use the get than the set part for this method.
         *
         * @param {Set} [tuples] The new set of body
         * @returns {Set|Relation} The body/null if getter, this if setter
         * @example
         *
         * var relation = new affinity.Relation([
         *          { 'firstName' : {type : affinity.String}}
         *          { 'LastName'  : {type : affinity.String}}
         *      ]);
         *
         * var set = new affinity.Set();
         *
         * set.add(new affinity.Tuple({firstName : 'John', lastName : 'Doe'}))
         * set.add(new affinity.Tuple({firstName : 'Hello', lastName : 'World'}))
         * set.add(new affinity.Tuple({firstName : 'John', lastName : 'Cage'}))
         *
         * relation.body(set); // Sets the relation's body
         *
         * relation.body() // Gets the relation's body
         *
         * console.log(relation.body() === set) // true
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
         * Calculates the relation. Because the relations are only calculated when their header or their body
         * are requested, you must explicitly call compute() if you want to calculate a relation.
         *
         * You should not need to use this function. Calling body() or header() calculates the relation
         * automatically
         *
         * @return {Relation} Returns this for chaining
         * @example
         *
         * var product = relation1.product(relation2);
         *
         * // At this point, nothing has been calculated.
         *
         * product.header() // Because we requested the header, it is calculated
         *
         * product.body() // Because we requested the body, it is calculated
         *
         * var product2 = relation1.product(relation2);
         *
         * product2.compute(); // Calculates the header and the body;
         *
         */
        compute: function () {

            debug.relation.trace('#compute');

            this.header();
            this.body();

            return this;

        },


        /**
         * Gets or sets the relation's header
         * @param {Header} [header]
         * @returns {null|{Header}}
         */
        header: function (header) {

            if (header) {

                debug.relation.trace('#header (set)');

                this._header = header;

            } else {

                debug.relation.trace('#header (get)');

                this.ee.emit('beforeGetHeader');

                return this._header;

            }

        },


        /**
         * Check if a tuple is compatible with the relation
         * @param {Tuple|Object} tuple
         * @returns {boolean}
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
                    return (tupleAttribute === headerAttribute);

                });

            });

        },

        /**
         * Tests if the relation is equal to another one
         * @param {Relation} relation The relation to compare to
         * @returns {boolean} If the relations are equal or not
         */
        equal: function (relation) {

            debug.relation.trace('#equal');

            return this.constructor.equal(this, relation);
        },

        /**
         * Shortcut to create a Difference relation based on this relation and the specified one
         * @param {Relation} relation The relation to compute difference against
         * @returns {RDifference} The resulting relation
         * @example
         *
         * var relation1 = new affinity.Relation([
         *          {firstName : {type : affinity.String}}
         *          {lastName : {type : affinity.String}}
         *      ],[
         *          ['John','Doe'],
         *          ['Lucino','Veo'],
         *          ['Mary','Poppins'],
         *      ]);
         *
         * var relation2 = new affinity.Relation([
         *          {firstName : {type : affinity.String}}
         *          {lastName : {type : affinity.String}}
         *      ],[
         *          ['John','Doe']
         *      ]);
         *
         * var diff = relation1.difference(relation2);
         *
         * // +---------------------+--------------------+
         * // | firstName : TString | lastName : TString |
         * // +---------------------+--------------------+
         * // | Lucino              | Veo                |
         * // +---------------------+--------------------+
         * // | Mary                | Poppins            |
         * // +---------------------+--------------------+
         */
        difference: function (relation) {

            debug.relation.trace('#difference');

            return new (require('./algebra/Difference'))(this, relation);
        },

        /**
         * Shortcut to create an Intersect relation based on this relation and the specified one
         * @param {Relation} relation The relation to compute intersection against
         * @returns {RIntersection} The resulting relation
         * @example
         *
         * var relation1 = new affinity.Relation([
         *          {firstName : {type : affinity.String}}
         *          {lastName : {type : affinity.String}}
         *      ],[
         *          ['John','Doe'],
         *          ['Lucino','Veo'],
         *          ['Mary','Poppins'],
         *      ]);
         *
         * var relation2 = new affinity.Relation([
         *          {firstName : {type : affinity.String}}
         *          {lastName : {type : affinity.String}}
         *      ],[
         *          ['John','Doe']
         *      ]);
         *
         * var intersection = relation1.intersect(relation2);
         *
         * // +---------------------+--------------------+
         * // | firstName : TString | lastName : TString |
         * // +---------------------+--------------------+
         * // | John                | Doe                |
         * // +---------------------+--------------------+
         */
        intersect: function (relation) {

            debug.relation.trace('#intersect');

            return new (require('./algebra/Intersection'))(this, relation);
        },

        /**
         * Shortcut to create a Join relation based on this relation and the specified one
         * @param {Relation} relation The relation to compute the join against
         * @returns {RJoin} The resulting relation
         * @example
         *
         * var relation1 = new affinity.Relation([
         *          {firstName : {type : affinity.String}}
         *          {lastName : {type : affinity.String}}
         *      ],[
         *          ['John','Doe'],
         *          ['Lucino','Veo'],
         *          ['Mary','Poppins'],
         *      ]);
         *
         * var relation2 = new affinity.Relation([
         *          {LastName : {type : affinity.String}}
         *          {Title    : {type : affinity.String}}
         *      ],[
         *          ['Doe','Mr'],
         *          ['Poppins','Lady']
         *      ]);
         *
         * var join = relation1.join(relation2);
         *
         * // +---------------------+--------------------+-----------------+
         * // | firstName : TString | lastName : TString | Title : TString |
         * // +---------------------+--------------------+-----------------+
         * // | John                | Doe                | Mr              |
         * // +---------------------+--------------------+-----------------+
         * // | Mary                | Poppins            | Lady            |
         * // +---------------------+--------------------+-----------------+
         */
        join: function (relation) {

            debug.relation.trace('#join');

            return new (require('./algebra/Join'))(this, relation);
        },

        /**
         * Shortcut to create a Product relation based on this relation and the specified one
         * @param {Relation} relation The relation to compute product against
         * @returns {RProduct} The resulting relation
         * @example
         *
         * var relation1 = new affinity.Relation([
         *          {firstName : {type : affinity.String}}
         *          {lastName : {type : affinity.String}}
         *      ],[
         *          ['John','Doe'],
         *          ['Lucino','Veo'],
         *          ['Mary','Poppins'],
         *      ]);
         *
         * var relation2 = new affinity.Relation([
         *          {title : {type : affinity.String}}
         *      ],[
         *          ['Lady'],
         *          ['Mr']
         *      ]);
         *
         * var product = relation1.product(relation2);
         *
         * // +---------------------+--------------------+-----------------+
         * // | firstName : TString | lastName : TString | Title : TString |
         * // +---------------------+--------------------+-----------------+
         * // | John                | Doe                | Lady            |
         * // +---------------------+--------------------+-----------------+
         * // | John                | Doe                | Mr              |
         * // +---------------------+--------------------+-----------------+
         * // | Lucino              | Veo                | Lady            |
         * // +---------------------+--------------------+-----------------+
         * // | Lucino              | Veo                | Mr              |
         * // +---------------------+--------------------+-----------------+
         * // | Mary                | Poppins            | Lady            |
         * // +---------------------+--------------------+-----------------+
         * // | Mary                | Poppins            | Mr              |
         * // +---------------------+--------------------+-----------------+
         */
        product: function (relation) {

            debug.relation.trace('#product');

            return new (require('./algebra/Product'))(this, relation);
        },

        /**
         * Shortcut to create a Project relation based on this relation
         * <p>The attributeNames parameter must be in the format : </p>
         * <pre><code>
         *
         *     relation.project(['argument1', 'argument2']);
         *
         * </code></pre>
         *
         * @param {String[]} attributeNames The relation to compute intersection against
         * @returns {RProjection} The resulting relation
         * @example
         *          * @example
         *
         * var relation1 = new affinity.Relation([
         *          {firstName : {type : affinity.String}}
         *          {lastName : {type : affinity.String}}
         *      ],[
         *          ['John','Doe'],
         *          ['Lucino','Veo'],
         *          ['Mary','Poppins'],
         *      ]);
         *
         * var intersection = relation1.project(['firstName']);
         *
         * // +---------------------+
         * // | firstName : TString |
         * // +---------------------+
         * // | John                |
         * // +---------------------+
         * // | Lucino              |
         * // +---------------------+
         * // | Mary                |
         * // +---------------------+
         */
        project: function (attributeNames) {

            debug.relation.trace('#project');

            return new (require('./algebra/Projection'))(this, attributeNames);
        },

        /**
         * Shortcut to create a Rename relation based on this relation
         * @param {Object} newNames An object containing the new attribute names.
         * @returns {Rename} The resulting relation
         * @example
         *
         * var relation1 = new affinity.Relation([
         *          {firstName : {type : affinity.String}}
         *          {lastName : {type : affinity.String}}
         *      ],[
         *          ['John','Doe'],
         *          ['Lucino','Veo'],
         *          ['Mary','Poppins'],
         *      ]);
         *
         * var rename = relation1.rename({lastName : 'Boogie'});
         *
         * // +---------------------+--------------------+
         * // | firstName : TString | Boogie : TString   |
         * // +---------------------+--------------------+
         * // | John                | Doe                |
         * // +---------------------+--------------------+
         * // | Lucino              | Veo                |
         * // +---------------------+--------------------+
         * // | Mary                | Poppins            |
         * // +---------------------+--------------------+
         */
        rename: function (newNames) {

            debug.relation.trace('#rename');

            return new (require('./algebra/Rename'))(this, newNames);
        },

        /**
         * Shortcut to create a Restrict relation based on this relation
         * @param {Function} predicate The predicate to test the tuples against
         * @returns {RRestriction} The resulting relation
         * @example
         *
         * var relation = new affinity.Relation([
         *          {firstName : {type : affinity.String}}
         *          {lastName : {type : affinity.String}}
         *      ],[
         *          ['John','Doe'],
         *          ['Lucino','Veo'],
         *          ['Mary','Poppins'],
         *          ['Robert','Robert']
         *      ]);
         *
         * // Multiple ways to build a predicate:
         *
         * // Compare with static value
         * relation.restrict(relation.get('firstName').equal('John'));
         *
         * // +---------------------+--------------------+
         * // | firstName : TString | Boogie : TString   |
         * // +---------------------+--------------------+
         * // | John                | Doe                |
         * // +---------------------+--------------------+
         *
         * // Compare two attributes
         * relation.restrict(relation.get('firstName').equal(relation.get('lastName'));
         *
         * // +---------------------+--------------------+
         * // | firstName : TString | Boogie : TString   |
         * // +---------------------+--------------------+
         * // | Robert              | Robert             |
         * // +---------------------+--------------------+
         *
         * // Combine with and, or, not
         * relation.restrict( (relation.get('firstName').not().equal('John')) .and( relation.get('lastName').not().equal('Veo') ) )
         *
         * // +---------------------+--------------------+
         * // | firstName : TString | Boogie : TString   |
         * // +---------------------+--------------------+
         * // | Mary                | Poppins            |
         * // +---------------------+--------------------+
         * // | Robert              | Robert             |
         * // +---------------------+--------------------+
         */
        restrict: function (predicate) {

            debug.relation.trace('#restrict');

            return new (require('./algebra/Restriction'))(this, predicate);
        },

        /**
         * Shortcut to create a Union relation based on this relation and the specified one
         * @param {Relation} relation The relation to perform Union with
         * @returns {Union} The resulting relation
         */
        union: function (relation) {

            debug.relation.trace('#union');

            return new (require('./algebra/Union'))(this, relation);
        },

        compose : function(relation){

            debug.relation.trace('#compose');

            return new (require('./algebra/Compose'))(this, relation);

        },

        group : function(groupingAttributeName, groupedAttributeNames){

            debug.relation.trace('#group');

            return new (require('./algebra/Group'))(this, groupingAttributeName, groupedAttributeNames);

        },

        ungroup : function(groupedAttributeNames){

            debug.relation.trace('#ungroup');

            return new (require('./algebra/Ungroup'))(this, groupedAttributeNames);

        },

        sdifference : function(relation){

            debug.relation.trace('#sdifference');

            return new (require('./algebra/SemiDifference'))(this, relation);

        },

        sjoin : function(relation){

            debug.relation.trace('#sjoin');

            return new (require('./algebra/SemiJoin'))(this, relation);

        },

        wrap : function(wrappingAttributeName, wrappedAttributes){

            debug.relation.trace('#wrap');

            return new (require('./algebra/Wrap'))(this, wrappingAttributeName, wrappedAttributes);

        },

        unwrap : function(wrappedAttributeNames){

            debug.relation.trace('#unwrap');

            return new (require('./algebra/Unwrap'))(this, wrappedAttributeNames);

        },

        /**
         * Prints the printable representation of the Relation to console
         */
        print: function () {

            debug.relation.trace('#print');

            console.log(this.toString());
        },

        /**
         * Gets the
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

            this.header().each(function(attribute){

                headerRow.push({ width : null, height : null, lines : null, attribute : attribute, string : attribute.toString()})

            },this);

            // [ {width, height, lines, string},{width, height, lines, string},... ] ]

            arr.push(headerRow);

            this.each(function(tuple){

                var tupleRow = [];

                _.forEach(headerRow, function(attr){
                    tupleRow.push({ width : null, height : null, lines : null, string : tuple.get(attr.attribute.name).toString()})
                },this);

                arr.push(tupleRow);

            },this);

            function findHeight(string){

                return string.split("\n").length;

            }

            function findWidth(string){

                var lines = string.split('\n'),
                    max = 0;

                _.forEach(lines, function(line){

                    var lineLength = line.length;

                    if (lineLength > max)
                        max = lineLength;

                },this);

                return max;

            }

            function findMaxWidth(arr){

                var max = 0;

                _.forEach(arr, function(obj){

                    var lineWidth = obj.width;

                    if(lineWidth>max)
                        max = lineWidth;

                },this);

                return max;
            }

            function findMaxHeight(arr){

                var max = 0;

                _.forEach(arr, function(obj){

                    var lineHeight = obj.height;

                    if(lineHeight>max)
                        max = lineHeight;

                },this);

                return max;

            }

            function parseLines(string){
                return string.split("\n");
            }

            // [
            //   [{width, height, lines, string},{width, height, lines, string},... ],
            //   [{width, height, lines, string},{width, height, lines, string},... ],
            //   [{width, height, lines, string},{width, height, lines, string},... ],
            //   ...
            // ]



            _.forEach(arr, function(row, rowIndex){

                _.forEach(row, function(col, colIndex){

                    col.width = findWidth(col.string);
                    col.height = findHeight(col.string);
                    col.lines = parseLines(col.string);

                    if(!maxWidths[colIndex] || maxWidths[colIndex] < col.width){
                        maxWidths[colIndex] = col.width;
                    }

                    if(!maxHeights[rowIndex] || maxHeights[rowIndex] < col.height){
                        maxHeights[rowIndex] = col.height;
                    }

                },this);

            },this);

            var result = '\n';


            // Printing the top border

            result += '+';

            _.forEach(maxWidths, function(maxWidth, index){

                for(var a = 0 ; a < maxWidths[index] + hspacing*2 + 2; a++){
                    result += '-'
                }

                result += '+'

            },this);

            result += '\n';

            // Printing the attributes

            _.forEach(arr, function(row, rowIndex){

                var maxHeight = maxHeights[rowIndex];

                for(var a = 0; a < maxHeight; a++){

                    result += '|';

                    _.forEach(row, function(col, colIndex){

                        var maxWidth = maxWidths[colIndex];

                        var line = col.lines[a];

                        if(!line) line = '';

                        for(var i = 0; i < hspacing; i++){
                            result += ' ';
                        }

                        var lineLength = line.length;

                        result += line;

                        for(var k = 0; k < hspacing; k++){
                            result += ' ';
                        }

                        for(var b = 0; b < maxWidth - lineLength + 2*hspacing; b++){
                            result += ' ';
                        }

                        result += '|';

                    },this);

                    result += '\n';

                }

                result += '+';

                _.forEach(maxWidths, function(maxWidth, index){

                    for(var a = 0 ; a < maxWidths[index] + hspacing*2 + 2; a++){
                        if(rowIndex === 0){
                            result += '='
                        } else {
                            result += '-'
                        }

                    }

                    result += '+'

                },this);



                if(rowIndex != arr.length-1) result += '\n';



            },this);

            return result;

        }

    }, {

        toString: function () {
            return 'Relation'
        },

        type : 'Relation',

        equal: function (rel1, rel2) {

            debug.relation.trace('Relation.equal');

            if (!rel1.header().equal(rel2.header())) {
                return false;
            }

            return Set.equal(rel1, rel2);

        },

        coerce : function(){

        }

    });


module.exports = Relation;

