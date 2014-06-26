var Type = require('./Type.js');
var _ = require('lodash');
var coerce = require('./helpers/coerce');
var equal = require('./helpers/equal');
var clone = require('./helpers/clone');
var EventEmitter = require('eventemitter2').EventEmitter2;
var debug = require('./helpers/debug.js');

var Set = Type.extend(

    {

        /**
         * @class Set
         * @param {Object} args Constructor arguments
         * @param {Type} [args.type] Type of the elements contained in the set
         * @extends Type
         * A Set is an unordered collection of distinct objects (no duplicates).
         */
        constructor: function (args) {

            debug.set.trace('#constructor');

            /**
             * @property {EventEmitter} ee
             */
            this.ee = new EventEmitter();

            /**
             * @property {Type} _type
             */
            this._type = null;

            /**
             * @property {Array} _elements
             */
            this._elements = [];

            /**
             * @property {Number} _deletedCount
             */
            this._deletedCount = 0;

            if (_.isFunction(this.bindEvents)) {
                this.bindEvents();
            }

            if (args) {

                if (args.type) {
                    this.type(args.type);
                }

                if (args.elements) {
                    this.elements(args.elements);
                }

            }


            Type.apply(this, arguments);

        },


        /**
         * Gets or sets the elements of the set
         * @param {Array} [elements] elements of the set
         * @returns {null|Array}
         * @throws Will throw if the type of the Set has not been set
         */
        elements: function (elements) {

            debug.set.trace('#elements');

            if (this.type() === null) {
                throw new Error('Must define the type of the set first');
            }

            if (elements) {

                if (!_.isArray(elements)) {
                    throw new TypeError('elements must be in array format')
                }

                this.ee.emit('beforeSetElements', elements);

                _.forEach(elements, function (element) {

                    this.add(element);

                }, this);

                this.ee.emit('afterSetElements', elements);

            } else {

                this.ee.emit('beforeGetElements');

                return this._elements;
            }

        },

        /**
         * Getter/Setter for the type parameter
         * @param {Type} [type] The type of the Set
         * @returns {null|Type}
         */
        type: function (type) {

            debug.set.trace('#type');

            if (type) {
                this._type = type;
            } else {
                return this._type;
            }

        },

        /**
         * Iterator function for the set
         * @param {Function} callback The callback function
         * @param {Object} [context] The "this" context for the callback
         */
        each: function (callback, context) {

            debug.set.trace('#each');

            _.forEach(this.elements(), callback, context);

        },

        /**
         * Adds an element to the set
         * @param {*} element
         * @param {boolean} [checkDuplicate=true] Tests for duplicate elements in the set. Set to false to skip this
         * verification if you are sure the element is not in the set
         * @returns {boolean} True if the element was added, false otherwise
         */
        add: function (element, checkDuplicate) {

            if (_.isUndefined(checkDuplicate)) {
                checkDuplicate = true;
            }

            debug.set.trace('#add');

            if (element) {

                element = coerce(this.type(), element, this);

                if ((checkDuplicate && !this.exists(element)) || !checkDuplicate) {

                    this.ee.emit('beforeAdd', element);

                    var newIndex = this.elements().push(element) - 1;

                    element.collection = this;

                    this.ee.emit('afterAdd', element, newIndex);

                    return true;

                }

            }

            return false;

        },


        /**
         * Removes an element from the set
         * @param {*} element The element to remove
         * @returns {boolean} Returns true if the element was removed, false otherwise
         */
        remove: function (element) {

            debug.set.trace('#remove');

            element = coerce(this.type(), element);

            var index = this.index(element);

            if (index !== null) {

                this.ee.emit('beforeRemove', element, index);

                this.removeAt(index);

                return true;

            } else {
                return false;
            }

        },

        /**
         * Removes an element at the specified index
         * @param {String} index The index at which to remove the element
         * @returns {Boolean} True if deleted, false otherwise
         */
        removeAt: function (index) {

            debug.set.trace('#removeAt');

            var element = this.atIndex(index);

            if(element === undefined){
                return false;
            }

            this.ee.emit('beforeRemove', element, index);

            this.elements()[index] = undefined;

            this._deletedCount++;

            this.ee.emit('afterRemove', element, index);

            return true;

        },

        first : function(){

            var result = _.find(this.elements(), function(element){

                if(!_.isUndefined(element)){
                    return true;
                }

            });

            if(_.isUndefined(result)){
                return null;
            } else {
                return result;
            }

        },

        /**
         * Finds the index of an object by comparing equality
         * @param {*} object
         * @returns {number|null} Index of object if found, null otherwise
         * @private
         */
        _indexByEquality: function (object) {

            debug.set.trace('#indexByEquality');

            var result = null;

            this.each(function (element, key) {

                if (equal(this.type(), element, object)) {
                    result = key;
                    return false;
                }

            }, this);

            return result;

        },

        /**
         * Get the index of an element
         * @param {Object} element The element to search for
         * @returns {null|number} The index of the element if found, null otherwise
         */
        index: function (element) {

            debug.set.trace('#index');

            var result = null;

            element = coerce(this.type(), element);

            if(this._index){
                result = this._index(element);
            }

            if (result !== null) return result;

            return this._indexByEquality(element);

        },

        /**
         * Gets the element at the specified index
         * @param {number} index The index of the element
         * @returns {*} The resulting element
         */
        atIndex: function (index) {

            debug.set.trace('#atIndex');

            return this.elements()[index];
        },


        /**
         * Finds an element
         * @param {*} element The element to find
         * @returns {null|*} the resulting element or null if not found
         */
        find: function (element) {

            debug.set.trace('#find');

            var index = this.index(element);

            if (index !== null) {
                return this.atIndex(index);
            } else {
                return null;
            }

        },

        /**
         * Checks if an element exists in the set
         * @param {*} element The element to check for
         * @returns {boolean} True if the element exists, false if not
         */
        exists: function (element) {

            debug.set.trace('#exists');

            var index = this.index(element);

            return (index !== null);

        },

        /**
         * Returns the number of elements in the set
         * @returns {number} Number of elements in the set
         */
        count: function () {

            return this.elements().length-this._deletedCount;

        },

        /**
         * Alias for {@link Set#count}
         * @returns {number} Number of elements in the set
         */
        length: function () {

            return this.count();

        },

        /**
         * Unites two sets
         * @param {Set} set2 The set to perform union with
         * @returns {Set} The resulting set
         * @example
         *
         * var set1 = new affinity.Set(affinity.Integer, [1, 2, 3]);
         *
         * var set2 = new affinity.Set(affinity.Integer, [3, 4, 5]);
         *
         * var result = set1.setUnion(set2);
         *
         * // Set has elements [1, 2, 3, 4, 5] (note no duplicates)
         */
        setUnion: function (set2) {

            debug.set.trace('#union');

            var thisType = this.type();
            var otherType = set2.type();

            var type = (thisType === otherType) ? thisType : null;

            var newSet = new this.constructor();

            newSet.type(type);

            _.forEach([this, set2], function (aSet) {

                aSet.each(function (element) {
                    newSet.add(clone(element));
                });

            });

            return newSet;

        },

        /**
         * Perform a difference between two sets
         * @param {Set} set2 The set acting as a pastry cutter
         * @returns {Set}
         * @example
         *
         * var set1 = new affinity.Set(affinity.Integer, [1, 2, 3]);
         *
         * var set2 = new affinity.Set(affinity.Integer, [3, 4, 5]);
         *
         * var result = set1.setDifference(set2);
         *
         * // Set has elements [1, 2]
         */
        setDifference: function (set2) {

            debug.set.trace('#difference');

            var newSet = new this.constructor();
            newSet.type(this.type());

            this.each(function (element) {

                if(!set2.exists(element)){
                    newSet.add(clone(element), false);
                }

            });

            return newSet;

        },

        /**
         * Performs a product on two sets
         * @param {Set} set2 The set to perform product with
         * @returns {Set}
         * @example
         *
         * var set1 = new affinity.Set(affinity.Integer, [1, 2]);
         *
         * var set2 = new affinity.Set(affinity.Integer, [3, 4]);
         *
         * var result = set1.setProduct(set2);
         *
         * // Set has elements [Tuple(1 : 1, 2 : 3),Tuple(1 : 1, 2 : 4),Tuple(1 : 2, 2 : 2),Tuple(1 : 2, 2 : 4)]
         */
        setProduct: function (set2) {

            debug.set.trace('#product');

            var Tuple = require('./Tuple.js');

            var newSet = new Set({type: Tuple});

            this.each(function (element1) {

                set2.each(function (element2) {

                    var tuple = new Tuple({0: element1, 1: element2});
                    newSet.add(tuple, false);

                });

            });

            return newSet;

        },

        /**
         * Performs an intersection with another set
         * @param {Set} set2 The set to be intersected with
         * @returns {Set} The resulting set
         * @example
         *
         * var set1 = new affinity.Set(affinity.Integer, [1, 2, 3]);
         *
         * var set2 = new affinity.Set(affinity.Integer, [3, 4, 5]);
         *
         * var result = set1.setIntersection(set2);
         *
         * // Set has elements [3]
         */
        setIntersection: function (set2) {

            debug.set.trace('#intersection');

            var newSet = new this.constructor();
            newSet.type(this.type());

            this.each(function (element1) {

                if (set2.exists(element1)) {
                    newSet.add(clone(element1), false);
                }

            }, this);

            return newSet;

        },

        /**
         * Performs a symmetric difference
         * @param {Set} set2 The set to peform symmetric difference against
         * @returns {Set} The resulting set
         * @example
         *
         * var set1 = new affinity.Set(affinity.Integer, [1, 2, 3]);
         *
         * var set2 = new affinity.Set(affinity.Integer, [3, 4, 5]);
         *
         * var result = set1.setSymmetricDifference(set2);
         *
         * // Set has elements [1, 2, 4, 5]
         */
        setSymmetricDifference: function (set2) {

            debug.set.trace('#symmetricDifference');

            var newSet = new this.constructor({type: this.type()});

            var set1 = this;

            set1.each(function (element1) {

                if (!set2.exists(element1)) {
                    newSet.add(clone(element1));
                }

            });

            set2.each(function (element2) {

                if (!set1.exists(element2)) {
                    newSet.add(clone(element2));
                }

            });

            return newSet;

        },

        /**
         * Determine if the set is a subset of another set
         * @param aSet
         * @returns {boolean}
         */
        isSubset : function(aSet){

            var match = true;

            this.each(function(element){
                if(!aSet.exists(element)){
                    match = false;
                    return false;
                }
            });

            return match;

        },

        /**
         * Determine if the set is a superset of another set
         * @param aSet
         * @returns {boolean}
         */
        isSuperset : function(aSet){
            return !aSet.isSubset(this);
        },

        /**
         * Determines if the set is a proper subset of another set
         * @param aSet
         * @returns {boolean}
         */
        isProperSubset : function(aSet){
            if(this.count() >= aSet.count()){
                return false;
            }
            return this.isSubset(aSet);
        },

        /**
         * Determine if the set is a proper superset of another set
         * @param aSet
         * @returns {boolean}
         */
        isProperSuperset : function(aSet){
            return !aSet.isProperSubset(this);
        },

        /**
         * Checks if two sets are equal
         * @param {Set} anotherSet
         * @returns {boolean}
         */
        equal: function (anotherSet) {

            debug.set.trace('#equal');

            return this.constructor.equal(this, anotherSet);

        },

        /**
         * Clones a set
         * @returns {Set}
         * @private
         */
        clone: function () {

            debug.set.trace('#clone');

            var newSet = new this.constructor(this.type);

            this.each(function (element) {
                newSet.add(element, false);
            });

            return newSet;

        }


    }, {

        /**
         * Checks if two sets are equal
         * @param {Set} set1 The first set to compare
         * @param {Set} set2 The second set to compare
         * @returns {boolean} True if the sets are equal, false otherwise

         * @static
         */
        equal: function (set1, set2) {

            debug.set.trace('#equal');

            var setLength1 = set1.elements().length,
                setLength2 = set2.elements().length,
                mismatch = false;

            // Check that both sets are of the same type

            if (set1.type() && set2.type() && (set1.type() !== set2.type())) {
                return false;
            }

            // Check that both sets are of the same length
            if (setLength1 !== setLength2) {
                return false;
            }

            // Find each set1 items in set2
            set1.each(function (element1) {

                var index2 = set2.index(element1);

                if (index2 === null) {
                    mismatch = true;
                    return false;
                }

            });

            return !mismatch;

        }

    });

module.exports = Set;