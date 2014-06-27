var Base = require('./Base.js');
var Type = require('./Type.js');
var _ = require('lodash');

var Attribute = Base.extend(


    {

        /**
         * @class Attribute
         * @extends Base
         * @param {Object} args
         * @param {String|null} args.name The name of the {@link Attribute}
         * @param {Type|null} args.type The {@link Type} of the {@link Attribute}
         *
         *
         * A {@link Relation}'s {@link Header} is composed of Attributes.
         *
         * An {@link Attribute} is simply an ordered {@link Set} {name : String, type : {@link Type}}
         *
         * The {@link Type} of an {@link Attribute} is a class that is mainly used to compare the values of the
         * Relation's tuples for this attibute.
         *
         * For example,
         * when running an {@link module:Relation/Operators~Union} on a {@link Relation}, the {@link Tuple}s will be tested for equality so that the
         * {@link Relation} does not include duplicates (as the mathematical definition of a {@link Set} tells us).
         * To do this, we compare two {@link Tuple} by comparing the value of their {@link Attribute}s. If for these two
         * {@link Tuple}s, all their {@link Attribute} values are equal, the two {@link Tuple}s are said to be equal.
         *
         * To test the equality of primitive {@link Attribute}s (String, Boolean, Integer...), this is easy.
         * We test the equality of two {@link Attribute}s with the equality operator "==".
         *
         * Though, when it comes to Object {@link Attribute}s, it is not possible to test the equality with the equality operator
         * "==". We need a function that will test the two objects for equality and that will return true/false.
         *
         * To resume, the {@link Type} of an {@link Attribute} must implement the methods used to compare the corresponding
         * {@link Tuple} {@link Attribute} values.
         *
         * For {@link TNumeric} {@link Type}s, the {@link Type} will also implement other comparison operators such as LargerThan (.lt()) ...
         *
         * For {@link TDate} {@link Type}s, the {@link Type} will also implement other operators such as DayOfWeek, ...
         *
         *     var fn = new affinity.Attribute({name : 'FirstName', type : 'affinity.String'})
         *     var ln = new affinity.Attribute({name : 'LastName', type : 'affinity.String'})
         *
         */
        constructor: function (args) {

            this.negated = false;

            // Check if the args are given
            if (args) {

                // Check if the name arg is given
                if (args.name) {

                    // Check if the name arg is of good type
                    if (!_.isString(args.name)) {

                        // If the name is not a string, throw
                        throw new TypeError('Name is of wrong type');

                    } else {

                        // Name arg seems to be legit
                        this.name = args.name;
                    }
                } else {

                    // If the name arg is not given, set it to null
                    this.name = null;
                }

                // Check if the type arg is given
                if (args.type) {

                    // Check if the type arg is of good type
                    if (!(args.type.prototype instanceof Type)) {

                        // If the type arg is not of type Type, throw
                        throw new TypeError('Type is of wrong type')

                    } else {
                        // Type arg seems to be legit
                        this.type = args.type;

                        _.forIn(args.type.payload, function(mix){

                            _.forIn(mix, function (mixin, key) {

                                this[key] = mixin;

                            },this)

                        },this);

                    }

                } else {
                    // If the type arg is not given, set it to null
                    this.type = null;
                }

            }

            Base.apply(this, arguments);
        },


        /**
         * Clones the Attribute object
         * @return {Attribute} cloned attribute
         * @example
         *
         * var fn = new affinity.Attribute({name : 'FirstName',affinity.String});
         *
         * var ln = attribute.clone();
         *
         * ln.equal(fn) // true
         *
         * ln.name = 'LastName';
         *
         * ln.equal(fn) // false
         *
         *
         */
        clone: function () {

            var attr = new this.constructor({type: this.type, name: this.name});

            if (this.relationHeader) {
                attr.relationHeader = this.relationHeader;
;           }

            if (this.wrappedAttributes){
                attr.wrappedAttributes = this.wrappedAttributes;
            }

            return attr;
        },

        /**
         * Checks if the attribute is being negated in a predicate
         * @param expression
         * @returns {*}
         * @private
         */
        _checkNegatedAttribute: function (expression) {

            if (this.negated) {
                this.negated = false;
                return new (require('./functions/connective/Not.js'))(expression);

            } else {

                return expression;
            }

        },

        /**
         * String representation of the attribute. Used to print a Relation into console
         * as a Unicode Table.

         * @instance
         * @private
         */
        toString: function () {

            return this.name + ' : ' + this.type.toString();

        },

        /**
         * Checks if two attributes are equal
         * @param attribute

         * @instance
         * @returns {boolean}
         */
        equal : function(attribute){

            return this.constructor.equal(this, attribute);

        }

    }, {

        type : 'Attribute',

        /**
         * Asserts that a given name is valid for an attribute
         * @private
         * @param name
         */
        assertValidName : function(name){

            if(!_.isString(name)){
                throw new Error('Name must be a string')
            }

            if(name === ''){
                throw new Error('Attribute name cannot be empty string');
            }

        },

        /**
         * Tests for equality between two attributes
         *
         * Warning! This method is not the same as {@link Attribute#equals}
         *
         * This method returns a Boolean. It cannot be part of a predicate.
         *
         * @param {Attribute} attribute1
         * @param {Attribute} attribute2
         * @returns {boolean}
         * @static

         */
        equal: function (attribute1, attribute2) {

            return ((attribute1.name === attribute2.name) && (attribute1.type === attribute2.type))

        },

        /**
         * Coerces an arbitrary object to type Attribute
         * @param {Attribute|Object} attribute
         * @returns {Attribute}
         * @static

         * @example
         *
         * var fn1 = new affinity.Attribute({name : 'FirstName', type : affinity.String});
         *
         * var fn2 = {name : 'FirstName' , type : affinity.String}
         *
         * affinity.Attribute.coerce(fn1) === fn1 // true, the object was already an Attribute.
         * affinity.Attribute.coerce(fn2) === fn2 // false, the object had to be coerced
         *
         * affinity.Attribute.coerce(fn2).equal(fn1) // true
         *
         */
        coerce: function (attribute) {

            if (attribute instanceof Attribute) {

                return attribute;

            }

            if(_.isObject(attribute)){

                var name;
                var type;
                var attr;
                var keys;

                // Attribute is of the type {name : <name>, type : <type>}
                if(attribute.type && attribute.name){

                    name = attribute.name;
                    type = attribute.type;

                } else {

                    // Attribute is either
                    // { <name> : { type : <type> } }
                    // { <name> : <Attribute> }

                    keys = _.keys(attribute);

                    if (keys.length !== 1){
                        throw new Error('Unsupported Attribute declaration');
                    }

                    // Name of the Attribute
                    name = keys[0];

                    // Attribute object
                    attr = attribute[name];


                    if(attr instanceof Attribute){

                        // Attribute is { <name> : <Attribute>}

                        attr.name = name;

                        return attr;

                    } else if(attr.type){

                        // Attribute is { <name> : { type : <type> } }

                        type = attribute[name].type;
                    }

                }

            }

            return new Attribute({name : name, type : type});

        }

    });

module.exports = Attribute;
