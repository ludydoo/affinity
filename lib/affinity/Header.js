var Attribute = require('./Attribute.js');
var Set = require('./Set.js');
var _ = require('lodash');
var TString = require('./types/String');
var TType = require('./types/Type');
var debug = require('./helpers/debug.js');

var Header = Set.extend(

    {

        /**
         * Header object constructor.
         *
         * @class Header
         * @extends Set
         * @param {Object} [attributes]
         * @throws The attributes are not passed in Array format
         *
         *
         * A {@link Header} is one of the two main parts of a
         * {@link Relation}, along with the Body (which is a {@link Set}).
         *
         * It is a {@link Set} of {@link Attribute}s. It defines the structure of the
         * {@link Tuple}s that will be part of the body of the
         * {@link Relation}. Each {@link Tuple} in a
         * {@link Relation} must match its {@link Header}
         *
         *     var header = new affinity.header([
         *          {firstname : affinity.string},
         *          {lastname : affinity.string}
         *     ])
         *
         *     var relation = new affinity.relation(); // create an empty relation without a header and without body
         *
         *     relation.header(header); // sets the relation's header
         *
         *     relation.add({firstName : 'John', lastName : 'Doe'}); // Add a tuple in the Relation that matches the header
         *
         *
         */
        constructor: function (attributes) {

            debug.header.trace('#constructor');

            var result = [];

            this._attributes = {};

            this.orderedDeclaration = false;

            if (attributes) {

                // There are attributes in the arguments

                if(_.isObject(attributes)){

                    // Attributes is either an array or an object

                    if(!_.isArray(attributes)){

                        // Attributes is an Object
                        // { <name> : {type : <type>}, <name> : {type : <type>}, ... }
                        // { <name> : <attribute>, <name> : <attribute>, <name> : <attribute>, ... }

                        _.forOwn(attributes, function(attribute, key){

                            var attr = {};
                            attr[key] = attribute;
                            result.push(attr);

                        });

                    } else {

                        // Attributes is an Array
                        // [ { <name> : {type : <type>} }, { <name> : {type : <type>} }, ... ]
                        // [{ <name> : <attribute>}, {<name> : <attribute>}, {<name> : <attribute>}, ... ]

                        this.orderedDeclaration = true;

                        _.forEach(attributes, function (attribute, key) {

                            result.push(attribute);

                        },this)

                    }

                } else {
                    throw new TypeError('Unsupported attribute declaration format');
                }

            } else {

                result = []

            }

            Set.call(this, {type: Attribute, elements: result});

        },

        bindEvents: function () {

            debug.header.trace('#bindEvents');

            var that = this;

            this.ee.on('beforeAdd', function (element) {

                if (that._attributes.hasOwnProperty(element.name)) {
                    throw new Error('Attribute with name ' + element.name + ' already exists in header');
                }

            });

            this.ee.on('afterAdd', function (element, index) {

                that._attributes[element.name] = index;

                element.header = that;

            });

            this.ee.on('afterRemove', function (element) {
                delete that._attributes[element.name];
                that.refreshAttributes();
            });
        },

        refreshAttributes: function () {

            debug.header.trace('#refreshAttributes');

            this._attributes = {};

            this.each(function (element, index) {

                if(!_.isUndefined(element)){
                    this._attributes[element.name] = index;
                }

            }, this)

        },

        get: function (key) {

            debug.header.trace('#get');

            if(key instanceof Attribute){

                if (!this._attributes.hasOwnProperty(key.name)) {
                    return null;
                }

                var attr = this.get(key.name);

                if(!attr.equals(key)){
                    return null;
                } else {
                    return attr;
                }

            } else if (_.isString(key)){

                if (!this._attributes.hasOwnProperty(key)) {
                    return null;
                }

                return this.elements()[this._attributes[key]];

            }

        },

        getIndex: function (name) {

            debug.header.trace('#getIndex');

            if (!this._attributes.hasOwnProperty(name)) {
                return null;
            }

            return this._attributes[name];

        },

        getAt : function(index){

            if(this._elements[index] !== undefined){
                return this._elements[index];
            }
            return null;

        },

        attributes: function (attributes) {

            debug.header.trace('#attributes');

            if (attributes) {

                return this.elements(attributes);

            } else {

                return this.elements();

            }

        },

        /**
         * Clone a header and its attributes
         * @returns {Header}
         */
        clone: function () {

            debug.header.trace('#clone');

            var newHeader = new this.constructor();

            this.each(function (element) {

                if(!_.isUndefined(element)){
                    newHeader.add(element.clone(), false);
                }

            });

            return newHeader;

        },

        /**
         * Project operation on Header object
         * @param {String[]|Attribute[]} projectedAttributes
         * @returns {Header}
         */
        project: function (projectedAttributes) {

            debug.header.trace('#project');

            var resultAttributes = {},
                a;

            a = projectedAttributes.length;

            while (a--) {

                var projectedAttribute = projectedAttributes[a];

                // If string given, find the attribute with this name
                if (_.isString(projectedAttribute)) {

                    var attributeName = projectedAttribute;

                    projectedAttribute = this.get(attributeName);

                    if (projectedAttribute === null) {
                        throw new ReferenceError('Attribute with name ' + attributeName + ' not found in header');
                    }

                } else if (projectedAttribute instanceof Attribute) {

                    // Find attribute in the header

                    var found = _.find(this.elements(), function (attribute) {
                        return attribute === projectedAttribute;
                    });

                    if (!found) {
                        throw new ReferenceError('Attribute not found in the header');
                    }

                } else {
                    throw new TypeError('Wrong format given for attributes in Header project operation');
                }

                resultAttributes[projectedAttribute.name] = projectedAttribute.clone();
            }

            return new Header(resultAttributes);
        },


        /**
         * Perform a removal operation on the header
         * @param {Attribute[]|String[]|Attribute|String} attributesToRemove attributes to remove from the header
         * @return {Header} the resulting header
         */
        remove: function (attributesToRemove) {

            debug.header.trace('#remove');

            var resultHeader = this.clone(),
                a,
                attribute,
                attributeName;

            // Coerce the arguments to an array
            if (_.isString(attributesToRemove) || attributesToRemove instanceof Attribute) {

                attributesToRemove = [attributesToRemove];

            } else if (!_.isArray(attributesToRemove)) {

                throw new TypeError('Wrong argument type for removal operation');

            }

            a = attributesToRemove.length;

            // Loop through each given attributes to remove

            while (a--) {

                // Check that given attributesToRemove are in the header

                if (_.isString(attributesToRemove[a])) {

                    // Passed attribute is a string.
                    // We will check if the attribute name exists.

                    attributeName = attributesToRemove[a];

                    attribute = attributesToRemove[a] = this.get(attributeName);

                    if (attribute === null) {
                        throw new ReferenceError('Attribute with name ' + attributeName + ' not found in header');
                    }

                } else {

                    // Passed attribute is an Attribute object
                    // We will check if it exists in the header

                    attribute = attributesToRemove[a];

                    attributeName = attribute.name;

                    if (!this._attributes.hasOwnProperty(attributeName)) {

                        // The attribute name doesn't exist in the header

                        throw new ReferenceError('Attribute with name ' + attributeName + ' not found in header');

                    } else if (this.get(attributeName).equal(attribute) === false) {

                        // The attribute is found but doesn't have the same type

                        throw new ReferenceError('Attribute object found in the header but not of same type');
                    }

                }

                // Delete the found attributes from the resulting header

                resultHeader.removeAt(resultHeader.getIndex(attributeName));

            }

            return resultHeader;
        },

        rename: function (attributes) {

            debug.header.trace('#rename');

            var resultHeader = this.clone(),
                key;

            if (_.isObject(attributes)) {

                for (key in attributes) {

                    if (attributes.hasOwnProperty(key)) {

                        var newName = attributes[key];

                        // Check if the specified name is a string
                        if (!_.isString(newName)) {
                            throw new TypeError('New name for attribute ' + key + ' must be a string');
                        }

                        var targetAttribute = this.get(key);

                        // Check if the key exists in the current header
                        if (targetAttribute === null) {
                            throw new ReferenceError('Attribute with name ' + key + ' doesn\'t exist in header');
                        }

                        // Check if the renamed operation does not overwrite an existing key in the header
                        if (this._attributes.hasOwnProperty(newName) && newName !== key) {
                            throw new ReferenceError('New attribute name ' + newName + ' already exists in the header');
                        }

                        // Check if the new name is not the same as the old name
                        if (newName === key) {
                            debug.header.warn('Useless renaming operations : ' + key + ' -> ' + newName);
                        }

                        // Check if two renamed attributes don't have the same target name
                        for (var a in attributes) {
                            if (attributes.hasOwnProperty(a) && a !== key) {
                                if (newName === attributes[a]) {
                                    throw new ReferenceError('Two renamed attributes have the same target name');
                                }
                            }
                        }

                        resultHeader._attributes[newName] = resultHeader._attributes[key];

                        if (key !== newName) {
                            delete resultHeader._attributes[key];
                        }

                        resultHeader.get(newName).name = newName;

                    }
                }

            } else {

                throw new TypeError('Wrong argument type for rename operation');
            }

            return resultHeader;

        },

        /**
         * @returns {Relation} The relation representation of the header
         */
        toRelation: function () {

            debug.header.trace('#toRelation');

            var rel = new (require('./Relation.js'))([
                {name: {type: TString}},
                {type: {type: TType}}
            ]);

            this.each(function (attribute) {
                rel.add({name: attribute.name, type: attribute.type});
            });

            return rel;

        },

        /**
         * @returns {string[]} An array containing the string names of the attributes
         */
        toNameArray : function(){
            var result = [];

            this.each(function(attribute){
                result.push(attribute.name);
            });

            return result;

        },

        /**
         * @param relation
         * @returns {Header}
         */
        fromRelation : function(relation){

            // Check that the relation has the right header
            if(!relation.header().exists({name : 'name', type : TString}) || !relation.header().exists({ name : 'type', type : TType}) || !(relation.header().length()==2)){
                throw new Error('Cannot convert relation to header');
            }

            relation.each(function(tuple){
                this.add({name : tuple.get('name'), type : tuple.get('type')}, false);
            }, this);

            return this;

        },

        copy : function(header, attributesArgument, exclude){

            var that = this;

            if(exclude !== true && exclude !== false){
                exclude = false;
            }

            if (attributesArgument){

                // Coerce the attributesArgument arguments to a header argument

                if(!(attributesArgument instanceof Header)){

                    var tempHeader = new Header();

                    if(attributesArgument instanceof Set){

                        attributesArgument.each(function(attribute){
                            if(_.isString(attribute)){


                                var attr = header.get(attribute);


                                if(attr === null){
                                    throw new Error('Attribute with name "' + attribute + '" not found in the header');
                                }

                                tempHeader.add(header.get(attribute).clone());


                            } else if(attribute instanceof Attribute) {

                                if(header.get(attribute.name) === null){
                                    throw new Error('Attribute with name "' + attribute.name + '" not found in the header');
                                }

                                tempHeader.add(attribute.clone());

                            }
                        })

                    } else if (_.isArray(attributesArgument)){

                        _.forEach(attributesArgument, function(attribute){
                            if(_.isString(attribute)){

                                var attr = header.get(attribute);

                                if(attr === null){
                                    throw new Error('Attribute with name "' + attribute + '" not found in the header');
                                }

                                tempHeader.add(attr.clone());

                            } else if(attribute instanceof Attribute) {

                                if(header.get(attribute.name) === null){
                                    throw new Error('Attribute with name "' + attribute.name + '" not found in the header');
                                }

                                tempHeader.add(attribute.clone());

                            }
                        })

                    } else if (_.isString(attributesArgument)){

                        var attr = header.get(attributesArgument);

                        if(attr === null){
                            throw new Error('Attribute with name ' + attributesArgument + ' not found in the header');
                        }

                        tempHeader.add(attr);

                    }

                    attributesArgument = tempHeader;

                } else {

                    attributesArgument.each(function(attribute){

                        if(header.get(attribute.name) === null){
                            throw new Error('Attribute with name ' + attribute.name + ' not found in the header');
                        }

                    })

                }

            }

            if (exclude && attributesArgument){

                header.each(function(attribute){

                    var isExcluded = false;

                    attributesArgument.each(function(excludedAttribute){
                        if(attribute.equal(excludedAttribute)){
                            isExcluded = true;
                        }
                    }, this);

                    if(!isExcluded){
                        this.add(attribute.clone());
                    }

                }, this)


            } else if (!exclude && attributesArgument){

                attributesArgument.each(function(includedAttribute){

                    this.add(header.get(includedAttribute.name).clone());

                }, this)

            } else {

                header.each(function(attribute){
                    this.add(attribute.clone());
                },this)
            }

            return this;

        }


    }, {

        /**
         * @static
         * @param {Header} header
         * @param {string[]|Attribute[]} attributes
         */
        assertAttributesExist : function(header, attributes){

            var mismatch = false;

            _.forEach(attributes, function(attribute){

                if(_.isString(attribute)){
                    if(header.get(attribute) === null){
                        throw new Error('Attribute with name ' + attribute + ' does not exist in the header');
                    }
                } else if (attribute instanceof Attribute){
                    if(!header.exists(attribute)){
                        throw new Error('Attribute with name ' + attribute.name + ' does not exist in the header');
                    }
                } else {
                    throw new Error('Attribute is of wrong type');
                }

            });

        },

        /**
         * @static
         * @param {Header} header1
         * @param {Header} header2
         */
        assertSameNameSameType : function(header1, header2){

            header1.each(function(attribute1){

                header2.each(function(attribute2){

                    if(attribute1.name === attribute2.name && attribute1.type !== attribute2.type){
                        throw new Error('Headers must have same type on attributes of same naem');
                    }

                })

            })

        },

        /**
         * @static
         * @param {Header} header1
         * @param {Header} header2
         */
        assertUnionCompatible : function(header1, header2){

            if (!this.equal(header1, header2)) {
                throw new Error('Relations are not union compatible');
            }

        },

        /**
         * @static
         * @param {Header} header1
         * @param {Header} header2
         */
        assertDisjoint : function(header1, header2){

            if(!this.disjoint(header1, header2)){
                throw new Error('Headers must be disjoint');
            }

        },

        /**
         * @static
         * @param {Header} header1
         * @param {Header} header2
         * @returns {Set|*}
         */
        commonAttributes : function(header1, header2){

            return header1.setIntersection(header2);

        },

        /**
         * Converts a relation into a header.
         * The relation must have the header only with attributes name : TString and type : TType.
         * @static
         * @param relation
         * @returns {Header}
         */
        fromRelation : function(relation){

            var header = new Header();

            return header.fromRelation(relation);

        },

        /**
         * @static
         * @param {Header} header1
         * @param {Header} header2
         * @returns {boolean}
         */
        equal: function (header1, header2) {

            debug.header.trace('Header.equal');

            if (Object.keys(header1._attributes).length !== Object.keys(header2._attributes).length) {
                return false;
            }

            var mismatch = false;

            header1.each(function (attribute1) {

                var attribute1Name = attribute1.name;

                if (!header2._attributes.hasOwnProperty(attribute1Name)) {
                    mismatch = true;
                    return false;
                }

                if (!Attribute.equal(attribute1, header2.get(attribute1.name))) {
                    mismatch = true;
                    return false;
                }


            });

            return !mismatch;

        },

        /**
         * @static
         * @param {Header} header1
         * @param {Header} header2
         * @returns {boolean}
         */
        disjoint: function (header1, header2) {

            debug.header.trace('Header.disjoint');

            var headers = header1.length() > header2.length() ? [header1,header2] : [header2,header1];

            var different = true;

            // Check that header have no common attribute names
            headers[0].each(function (attribute1) {

                if (headers[1].get(attribute1.name) !== null) {
                    different = false;
                    return false;
                }

            });

            return different;

        },

        /**
         * @static
         * @param {Header|*} header
         * @returns {Header}
         */
        coerce : function(header){

            if(header instanceof this){
                return header;
            } else {
                return new Header(header);
            }
        }

    });

module.exports = Header;