var Base = require('./base.js');
var _ = require('lodash');
var equal = require('./helpers/equal');
var Tuple = Base.extend(
    /** @lends Tuple.prototype */
    {

        /**
         * @class Tuple
         * @param attributes
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

            Base.apply(this, arguments);

        },


        /**
         * Iterator function that loops through each of the tuple attributes
         * @param {Function} callback Callback function
         * @param {Object} context Execution context of the callback
         */
        each : function(callback, context){
            _.forIn(this.attributes, callback, context);
        },

        copy : function(tuple, attributes, exclude){

            if (exclude !== true && exclude !== false){
                exclude = false;
            }

            if(attributes && exclude === false){

                _.forEach(attributes, function(copiedAttribute){

                    this.set(copiedAttribute, tuple.get(copiedAttribute));

                }, this)

            } else {

                _.forEach(tuple.attributes, function (attribute, key) {

                    if (attributes && exclude === true){

                        var excluded = _.any(attributes, function(excludedAttribute){
                            return excludedAttribute === key;
                        });

                        if(!excluded){
                           this.set(key, attribute);
                        }

                    } else {
                        this.set(key, attribute);
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
         * @param {String} attributeName Name of the attribute
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

        }

    }, {

        type: 'Tuple',

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