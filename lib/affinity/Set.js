var Type = require('./Type.js');
var _ = require('lodash');
var coerce = require('./helpers/coerce');
var equal = require('./helpers/equal');
var clone = require('./helpers/clone');
var EventEmitter = require('eventemitter3').EventEmitter3;
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

            this.ee.setMaxListeners(0);

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

            /**
             * If the set owns the elements. If so, if the set is destroyed, they will be destroyed too
             * @property {boolean} ownsElements
             */
            this.ownsElements = true;

            /**
             * Call bindEvents if is defined.
             */
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

                if (args.ownsElements) {
                    this.ownsElements = args.ownsElements;
                }

            }


            /**
             * Call parent constructor
             */
            Type.apply(this, arguments);

        },

        /**
         * @returns {Set}
         * @private
         *
         * Clones a set
         */
        clone: function () {

            debug.set.trace('#clone');

            var newSet = new this.constructor(this.type);

            this.each(function (element) {
                newSet.add(element, false);
            });

            return newSet;

        },

        /**
         * Destroys the set
         */
        destroy : function(){

            // Deletes the elements
            this.each(function(element, index){

                this.removeAt(index);

                if (this.ownsElements){

                    // Calls the object's destroy function if it exists
                    if (_.isFunction(element.destroy)) {
                        element.destroy();
                    }

                    // Sets the element to undefined
                    element = undefined;

                }

            });

            // Deletes the event emitter
            delete this.ee;

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
         * @param {Type} [type] The type of the Set
         * @returns {null|Type}
         *
         * Getter/Setter for the type parameter. When used without parameter, will return
         * the type of the Set. When used with a parameter, will set the set's type.
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
         * @param {Function} callback The callback function
         * @param {Object} [context] The "this" context for the callback
         *
         * Iterator function. Only an alias for lodash _.forEach
         */
        each: function (callback, context) {

            debug.set.trace('#each');

            _.forEach(this.elements(), function(element, index){

                if(element !== undefined){
                    if(callback.call(context, element, index) === false){
                        return false;
                    }
                }

            });

        },

        /**
         * @param {*} element
         * @param {boolean} [checkDuplicate=true] Tests for duplicate elements in the set. Set to false to skip this
         * verification if you are sure the element is not in the set
         * @returns {boolean} True if the element was added, false otherwise
         *
         * Directly add an element to the set.
         */
        add: function (element, checkDuplicate) {

            debug.set.trace('#add');

            if (_.isUndefined(checkDuplicate)) {
                checkDuplicate = true;
            }

            if (element) {

                debug.set.trace('#add coercing element');

                element = coerce(this.type(), element, this);

                if ((checkDuplicate && !this.exists(element)) || !checkDuplicate) {

                    this.ee.emit('beforeAdd', element);

                    var newIndex = this.elements().push(element) - 1;

                    this.ee.emit('afterAdd', element, newIndex);

                    return true;

                }

            }

            return false;

        },


        /**
         * @param {*} element The element to remove
         * @returns {boolean} Returns true if the element was removed, false otherwise
         *
         * Removes an element from the set.
         */
        remove: function (element) {

            debug.set.trace('#remove');

            element = coerce(this.type(), element);

            var index = this.index(element);

            return this.removeAt(index);

        },

        /**
         * @param {String} index The index at which to remove the element
         * @returns {Boolean} True if deleted, false otherwise
         *
         * Removes an element from the set at the specified index.
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

        /**
         * @returns {null|*} The first element or null.
         *
         * Gets the first element from the set.
         */
        first : function(){

            debug.set.trace('#first');

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
         * @param {*} object
         * @returns {number|null} Index of object if found, null otherwise
         * @private
         *
         * Find the index of an element with defined type equality methods
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
         * @param {Object} element The element to search for
         * @returns {null|number} The index of the element if found, null otherwise
         *
         * Gets the index of an element
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
         * @param {*} element The element to find
         * @returns {null|*} the resulting element or null if not found
         *
         * Finds an element
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
         * @param {*} element The element to check for
         * @returns {boolean} True if the element exists, false if not
         *
         * Checks if an element exists in the set.
         */
        exists: function (element) {

            debug.set.trace('#exists');

            return (this.index(element) !== null);

        },

        /**
         * @returns {number} Number of elements in the set
         */
        length: function () {

            debug.set.trace('#length');

            return this.elements().length-this._deletedCount;

        },

        /**
         * @param {Set} set2 The set to perform union with
         * @returns {Set} The resulting set
         *
         * Union of two sets. Returns a set containing all the elements from A and B.
         *
         *     var set1 = new affinity.Set(affinity.Integer, [1, 2, 3]);
         *
         *     var set2 = new affinity.Set(affinity.Integer, [3, 4, 5]);
         *
         *     var result = set1.setUnion(set2);
         *
         *     // Set has elements [1, 2, 3, 4, 5] (note no duplicates)
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
         *
         * @param {Set} set2 The set acting as a pastry cutter
         * @returns {Set}
         * @example
         *
         * Perform a difference between two sets. Returns a set with the elements of A without
         * those that A and B have in common.
         *
         *     var set1 = new affinity.Set(affinity.Integer, [1, 2, 3]);
         *
         *     var set2 = new affinity.Set(affinity.Integer, [3, 4, 5]);
         *
         *     var result = set1.setDifference(set2);
         *
         *     // Set has elements [1, 2]
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
         *
         * @param {Set} set2 The set to perform product with
         * @returns {Set}
         * @example
         *
         * Performs a product of two sets. Returns a set with all the possible combinations
         * of elements from A combined with those of B. This operation will return a set containing
         * tuples with attributes { 0 : attr1, 1 : attr2}. 0 is the left set element, 1 is the
         * right set element.
         *
         *     var set1 = new affinity.Set(affinity.Integer, [1, 2]);
         *
         *     var set2 = new affinity.Set(affinity.Integer, [3, 4]);
         *
         *     var result = set1.setProduct(set2);
         *
         *     // Set has elements [Tuple(0 : 1, 1 : 3),Tuple(0 : 1, 1 : 4),Tuple(0 : 2, 1 : 2),Tuple(0 : 2, 1 : 4)]
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
         *
         * @param {Set} set2 The set to be intersected with
         * @returns {Set} The resulting set
         *
         * Performs an intersection with another set. Returns a set with
         * the elements that A and B have in common.
         *
         *     var set1 = new affinity.Set(affinity.Integer, [1, 2, 3]);
         *
         *     var set2 = new affinity.Set(affinity.Integer, [3, 4, 5]);
         *
         *     var result = set1.setIntersection(set2);
         *
         *     // Set has elements [3]
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
         *
         * @param {Set} set2 The set to peform symmetric difference against
         * @returns {Set} The resulting set
         *
         * Performs a symmetric difference. Returns a set with the elements that A
         * and B do not have in common.
         *
         *     var set1 = new affinity.Set(affinity.Integer, [1, 2, 3]);
         *
         *     var set2 = new affinity.Set(affinity.Integer, [3, 4, 5]);
         *
         *     var result = set1.setSymmetricDifference(set2);
         *
         *     // Set has elements [1, 2, 4, 5]
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
         * @param aSet
         * @returns {boolean}
         *
         * Determine if the set is a subset of another set.
         */
        isSubset : function(aSet){

            debug.set.trace('#isSubset');

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
         * @param aSet
         * @returns {boolean}
         *
         * Determine if the set is a superset of another set
         */
        isSuperset : function(aSet){

            debug.set.trace('#isSuperset');

            return !aSet.isSubset(this);
        },

        /**
         * @param aSet
         * @returns {boolean}
         *
         * Determines if the set is a proper subset of another set
         */
        isProperSubset : function(aSet){

            debug.set.trace('#isProperSubset');

            if(this.length() >= aSet.length()){
                return false;
            }
            return this.isSubset(aSet);
        },

        /**
         * @param aSet
         * @returns {boolean}
         *
         * Determine if the set is a proper superset of another set
         */
        isProperSuperset : function(aSet){

            debug.set.trace('#isProperSuperset');

            return !aSet.isProperSubset(this);
        },

        /**
         * @param {Set} anotherSet
         * @returns {boolean}
         *
         * Checks if two sets are equal
         */
        equal: function (anotherSet) {

            debug.set.trace('#equal');

            return this.constructor.equal(this, anotherSet);

        },




    }, {

        /**
         *
         * @param {Set} set1 The first set to compare
         * @param {Set} set2 The second set to compare
         * @returns {boolean} True if the sets are equal, false otherwise
         * @static
         *
         * Checks if two sets are equal
         *
         */
        equal: function (set1, set2) {

            debug.set.trace('.equal');

            var setLength1 = set1.length(),
                setLength2 = set2.length(),
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