var Type = require('./Type.js');
var Header = require('./Type.js');
var TString = require('./types/String.js');
var Attribute = require('./Attribute.js');
var _ = require('lodash');
var equal = require('./helpers/equal');
var Set = require('./Set.js');
var Tuple = Type.extend(
    /** @lends Tuple.prototype */
    {

        /**
         * @class Tuple
         * @param attributes
         * @augments Type
         */
        constructor: function (attributes) {

            this.attributes = {};

            if (attributes) {

                if (!_.isObject(attributes)) {
                    throw new TypeError('Tuple attributes in wrong format')
                }

                var a;

                for (a in attributes) {

                    if (attributes.hasOwnProperty(a)) {
                        this.set(a, attributes[a]);
                    }

                }
            }

            Type.apply(this, arguments);

        },


        /**
         * Iterator function that loops through each of the tuple attributes
         * @param {Function} callback Callback function
         * @param {Object} context Execution context of the callback
         */
        each : function(callback, context){
            _.forIn(this.attributes, callback, context);
        },

        copy : function(tuple, attributesArgument, exclude){

            if (exclude !== true && exclude !== false){
                exclude = false;
            }

            if (!_.isUndefined(attributesArgument) && !_.isNull(attributesArgument)) {

                var result = new Set({type: TString});

                // Coerce the attributes argument to Set of string
                if (attributesArgument instanceof Header) {
                    attributesArgument.each(function (attribute) {
                        result.add(attribute.name);
                    })
                } else if (attributesArgument instanceof Set) {
                    attributesArgument.each(function (attributeArgument) {

                        if (attributeArgument instanceof Attribute) {
                            result.add(attributeArgument.name);
                        } else if (_.isString(attributeArgument)) {
                            result.add(attributeArgument);
                        }

                    })
                } else if (_.isArray(attributesArgument)) {
                    _.forEach(attributesArgument, function (attributeArgument) {
                        if (attributeArgument instanceof Attribute) {
                            result.add(attributeArgument.name);
                        } else if (_.isString(attributeArgument)) {
                            result.add(attributeArgument);
                        }
                    })
                } else if (_.isString(attributesArgument)) {
                    result.add(attributesArgument);
                }

                attributesArgument = result;

            }

            if(attributesArgument && exclude === false){

                attributesArgument.each(function(copiedAttribute){

                    this.set(copiedAttribute.value(), tuple.get(copiedAttribute.value()));

                }, this)

            } else {

                _.forEach(tuple.attributes, function (tupleAttribute, tupleAttributeKey) {

                    if (attributesArgument && exclude === true){

                        var isExcludedAttribute = false;

                        attributesArgument.each(function(excludedAttribute){

                            if (equal(TString, excludedAttribute, tupleAttributeKey)){
                                isExcludedAttribute = true;
                                return false;
                            }

                        });

                        if(!isExcludedAttribute){
                           this.set(tupleAttributeKey, tupleAttribute);
                        }

                    } else {
                        this.set(tupleAttributeKey, tupleAttribute);
                    }

                }, this)

            }

        },

        /**
         * Test for equality with another tuple
         * @param {Tuple} tuple
         * @returns {boolean}
         */
        equals: function (tuple) {
            return Tuple.equal(this, tuple);
        },

        /**
         * Sets an attribute value
         * @param {String} attributeName Name of the attribute
         * @param {*} value Value of the attribute
         */
        set: function (attributeName, value) {
            this.attributes[attributeName] = value;
        },

        /**
         * Gets and attribute value
         * @param {Attribute|String} attributeName Name of the attribute
         * @returns {*}
         */
        get: function (attributeName) {

            return this.attributes[attributeName];

        },

        /**
         * Deletes an attribute from the tuple
         * @param {String} attributeName The attribute name to delete
         */
        delete: function (attributeName) {
            delete this.attributes[attributeName];
        },

        /**
         * Clones a tuple
         * @returns {Tuple}
         */
        clone: function () {

            var attr,
                newTuple = new this.constructor();

            _.forEach(this.attributes, function (attribute, key) {

                if (_.isFunction(attribute.clone)) {
                    attr = attribute.clone();
                } else {
                    attr = attribute;
                }

                newTuple.set(key, attr);

            }, this);

            return newTuple;

        },

        toString : function(){

            var count = 0;

            var attrLength = Object.keys(this.attributes).length
            var attrs = ['Tuple({'];

            this.each(function(attribute, key){

                attrs.push(key.toString()+ ' : ' + attribute.toString());

                if(count !== attrLength-1){
                    attrs.push(', ')
                }

                count++;

            },this);

            attrs.push('})')

            return attrs.join('');

        }


    }, {

        type: 'Tuple',

        toString: function () {
            return 'Tuple'
        },

        /**
         * Test for equality between two tuples
         * @param {Tuple} tuple1
         * @param {Tuple} tuple2
         * @returns {boolean}
         * @static
         * @memberof Tuple
         */
        equal: function (tuple1, tuple2) {

            var key;

            if (!(tuple1 instanceof Tuple) || !(tuple2 instanceof Tuple)) {
                throw new Error('Provided tuples are of the wrong type');
            }

            var match = true;

            tuple1.each(function(attr, key){

                if(tuple2.get(key) === null){
                    match = false;
                    return false;
                }

                if(!equal(null, attr, tuple2.get(key))){
                    match = false;
                    return false;
                }

            });

            return match;

        },

        matchOnAttributes : function(tuple1, tuple2, attributes){

            var match = true;

            attributes.each(function(attribute){

               var attributeName = attribute.name;

                if(!equal(null, tuple1.get(attributeName), tuple2.get(attributeName))){
                    match = false;
                    return false;
                }

            });

            return match;

        },

        /**
         * Coerces an arbitrary object to type Tuple
         * @param {Object|Tuple} tuple
         * @returns {Tuple}
         * @static
         * @memberof Tuple
         */
        coerce: function (tuple, collection) {


            if(tuple instanceof Tuple){

                // Given tuple is of type Tuple.

                return tuple;

            } else {

                if(!_.isObject(tuple)){

                    // It is not an object. It can't be coerced.

                    throw new TypeError('Wrong parameter type. Expected an object or a Tuple')
                }

                // It is not a Tuple instance. Check if it might be coerced.
                if (_.isArray(tuple)) {

                    if (_.isUndefined(collection) || _.isNull(collection)) {
                        throw new Error('Cannot coerce array-declared tuple if no collection is specified')
                    }

                    if (_.isFunction(collection.header)) {

                        // Collection has header

                        var header = collection.header(),
                            headerCount = header.count();

                        if (headerCount > 0) {

                            // Header has one or more attributes

                            if(!header.orderedDeclaration){
                                throw new Error('Cannot coerce an array declared tuple if the header has not been declared in array format')
                            }

                            if(headerCount !== tuple.length){
                                throw new Error('Cannot coerse Tuple, it does not have the same number of attributes as the header');
                            }

                            var newTuple = new Tuple();

                            // Iterate through each attributes of the header in order

                            header.each(function(attribute, index){

                                // Set the corresponding tuple attribute

                                newTuple.set(attribute.name, tuple[index]);

                            });

                            return newTuple;

                        }

                    }

                }

                tuple = new Tuple(tuple);

                return tuple;

            }

        }

    });

module.exports = Tuple;