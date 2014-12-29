var Base = require('./Base');

var Index = Base.extend(
    /**
     * @lends Index.prototype
     */
    {

        /**
         * The Index class is a simple utility class allowing tuples to be indexed.
         * It speeds up operations on relations as iterations are reduced.
         * @class Index
         * @extends Base
         */
        constructor: function (header) {

            /** @property {Header} header */
            this.header = header;

            /** @property {int} levels */
            this.levels = header.length();

            /** @property {Object} elements */
            this.elements = {};

            /** @property {Array} headerLevels */
            this.headerLevels = [];

            /* Recursively iterating through the header and populating the headerLevels array*/

            var targetHeader = this.header;

            for(var k = 0; k < this.levels; k++){

                this.headerLevels[k] = targetHeader;
                targetHeader = targetHeader.remove(targetHeader.first());

            }

        },

        /**
         * Adds a tuple to the index
         * @param {Tuple} tuple
         * @param {int} index
         */
        add: function (tuple, index) {

            var context = this;

            var headerCount = this.header.length();

            for (var a = 0; a <= headerCount - 1; a++) {

                var attribute = context.header.first();
                var tupleAttributeValue;

                if(!attribute.type.primitive){
                    tupleAttributeValue = attribute.type.serialize(tuple.get(attribute.name));
                } else {
                    tupleAttributeValue = tuple.get(attribute.name);
                }

                if (a === headerCount - 1) {

                    context.elements[tupleAttributeValue] = index

                } else {

                    if (!context.elements.hasOwnProperty(tupleAttributeValue)) {

                        var newIndex = new Index(this.headerLevels[a+1]);

                        context.elements[tupleAttributeValue] = newIndex;

                        context = newIndex;

                    } else {

                        context = context.elements[tupleAttributeValue];

                    }

                }

            }

        },

        /**
         * Get the index for a tuple
         * @param {Tuple} tuple
         * @returns {int|null}
         */
        getIndex: function (tuple) {

            var context = this;

            var headerCount = this.header.length();

            for (var a = 0; a <= headerCount - 1; a++) {

                var attribute = context.header.first();
                var tupleAttributeValue;

                if(!attribute.type.primitive){
                    tupleAttributeValue = attribute.type.serialize(tuple.get(attribute.name));
                } else {
                    tupleAttributeValue = tuple.get(attribute.name);
                }

                if (a === headerCount - 1) {

                    if (!context.elements.hasOwnProperty(tupleAttributeValue)) {
                        return null;
                    }

                    return context.elements[tupleAttributeValue];

                } else {

                    if (!context.elements.hasOwnProperty(tupleAttributeValue)) {

                        return null;

                    }

                    context = context.elements[tupleAttributeValue];


                }

            }

        },

        /**
         * Removes a tuple from the index
         * @param {Tuple} tuple
         * @returns {boolean} True if removed, false otherwise
         */
        remove: function (tuple) {

            var context = this;

            var headerCount = this.header.length();

            for (var a = 0; a <= headerCount - 1; a++) {

                var attribute = context.header.first();
                var tupleAttributeValue;

                if(!attribute.type.primitive){
                    tupleAttributeValue = attribute.type.serialize(tuple.get(attribute.name));
                } else {
                    tupleAttributeValue = tuple.get(attribute.name);
                }

                if (a === headerCount - 1) {

                    if (!context.elements.hasOwnProperty(tupleAttributeValue)) {
                        return false;
                    }

                    delete context.elements[tupleAttributeValue];

                    return true;

                } else {

                    if (!context.elements.hasOwnProperty(tupleAttributeValue)) {

                        return false;

                    }

                    context = context.elements[tupleAttributeValue];

                }

            }

        }

    });

module.exports = Index;