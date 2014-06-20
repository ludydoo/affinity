var Base = require('./base.js');
var _ = require('lodash');
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

            for (key in tuple1.attributes) {
                if (tuple1.attributes.hasOwnProperty(key)) {
                    if ((!tuple2.attributes.hasOwnProperty(key)) || (tuple1.attributes[key] !== tuple2.attributes[key]))
                        return false;
                }
            }

            return true;
        },

        /**
         * Coerces an arbitrary object to type Tuple
         * @param {Object|Tuple} tuple
         * @returns {Tuple}
         * @static
         * @memberof Tuple
         */
        coerce: function (tuple) {

            // Check if the tuple is not of type Tuple (raw format)
            if (!(tuple instanceof Tuple)) {

                // It is not a Tuple instance. Check if it might be coerced.
                if (_.isObject(tuple)) {

                    // It is an object. Try to coerce it.
                    tuple = new this(tuple);

                } else {

                    // It is not an object. It can't be coerced.
                    throw new TypeError('Wrong parameter type. Expected an object or a Tuple')
                }

                return tuple;

            } else {

                // Given tuple is of type Tuple.
                return tuple;
            }

        }

    });

module.exports = Tuple;