var Attribute = require('./Attribute.js');
var Tuple = require('./Tuple.js');
var Set = require('./Set.js');
var _ = require('lodash');
var TString = require('./types/String');
var TType = require('./types/Type');
var debug = require('./helpers/debug.js');

var Header = Set.extend(
    /** @lends Header.prototype */
    {

        /**
         * Constructor for the Header object
         *
         * @class Header
         * @augments Set
         * @param attributes
         * @throws {TypeError} If the attributes are not passed in Array format
         * @classdesc
         *
         * A {@link Header} is one of the two main parts of a {@link Relation}, along with the Body (which is a {@link Set}).
         *
         * It is a {@link Set} of {@link Attribute}s. It defines the structure of the{@link Tuple}s that will be part
         * of the body of the {@link Relation}. Each {@link Tuple} in a {@link Relation} must match its {@link Header}
         *
         * @example
         *
         * var header = new affinity.Header([
         *      {firstName : {type : affinity.String}},
         *      {lastName : {type : affinity.String}}
         * ])
         *
         * var relation = new affinity.Relation(); // Create an empty relation without a header and without body
         *
         * relation.header(header); // Sets the relation's header
         *
         * relation.add({firstName : 'John', lastName : 'Doe'}); // Add a tuple in the Relation that matches the header
         *
         */
        constructor: function (attributes) {

            debug.header.trace('#constructor');

            var result = [];
            this._attributes = {};
            var that = this;

            if (attributes) {

                if (!_.isObject(attributes)) {
                    throw new TypeError('Attributes must be in object format');
                }

                _.forEach(attributes, function (attribute, key) {
                    attribute.name = key;
                    result.push(attribute);
                })

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
            });

            this.ee.on('afterRemove', function (element, index) {
                delete that._attributes[element.name];
                that.refreshAttributes();
            });
        },

        refreshAttributes: function () {

            debug.header.trace('#refreshAttributes');

            this._attributes = {};

            this.each(function (element, index) {

                this._attributes[element.name] = index;
            }, this)

        },

        get: function (key) {

            debug.header.trace('#get');

            if (!this._attributes.hasOwnProperty(key)) {
                return null;
            }

            return this.elements()[this._attributes[key]];

        },

        getIndex: function (name) {

            debug.header.trace('#getIndex');

            if (!this._attributes.hasOwnProperty(name)) {
                return null;
            }

            return this._attributes[name];

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
                newHeader.add(element.clone(), false);
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

                    attributeName = attributesToRemove[a];

                    attribute = attributesToRemove[a] = this.get(attributeName);

                    if (attribute === null) {
                        throw new ReferenceError('Attribute with name ' + attributeName + ' not found in header');
                    }

                } else {

                    attribute = attributesToRemove[a];
                    attributeName = attribute.name;

                    if (!this._attributes.hasOwnProperty(attributeName)) {
                        throw new ReferenceError('Attribute with name ' + attributeName + ' not found in header');
                    } else if (this.get(attributeName) !== attribute) {
                        throw new ReferenceError('Attribute object is not in the header');
                    }

                }

                // Delete the found attributes from the resulting header

                resultHeader.removeAt(this.getIndex(attributeName));

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

        }





    }, {

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

        disjoint: function (header1, header2) {

            debug.header.trace('Header.disjoint');


            // Check that header have no common attribute names
            header1.each(function (attribute1) {

                var attributeName = attribute1;

                if (header2.get(attributeName) !== null) {
                    return false;
                }

            });

            return true;

        }

    });

module.exports = Header;