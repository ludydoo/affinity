var Base = require('./Base.js');
var Type = require('./Type.js');
var _ = require('lodash');

var Attribute = Base.extend(
    /** @lends Attribute.prototype */

    {

        /**
         * @class Attribute
         * @augments Base
         * @param {Object} args
         * @param {String|null} args.name The name of the {@link Attribute}
         * @param {Type|null} args.type The {@link Type} of the {@link Attribute}
         * @classdesc
         * A {@link Relation}'s {@link Header} is composed of Attributes.
         *
         * An {@link Attribute} is simply an ordered {@link Set} {name : String, type : {@link Type}}
         *
         * The {@link Type} of an {@link Attribute} is a class that is mainly used to compare the values of the
         * Relation's tuples for this attibute.
         *
         * For example,
         * when running an {@link RUnion} on a {@link Relation}, the {@link Tuple}s will be tested for equality so that the
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
         * @example
         *
         * var fn = new affinity.Attribute({name : 'FirstName', type : 'affinity.String'})
         * var ln = new affinity.Attribute({name : 'LastName', type : 'affinity.String'})
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
         * var fn = new affinity.Attribute({name : 'FirstName', type: affinity.String});
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
         * Negates the attribute expression when building a predicate
         * @returns {Attribute} The current negated attribute
         */
        not: function () {

            this.negated = true;
            return this;
        },

        /**
         * Shortcut method for {@link FEqual}
         *
         * This method is used when building predicates for a {@link RRestriction} operation.
         *
         * @param {*} expression Predicate Expression
         * @returns {FEqual|FNot} Function
         * @example
         *
         * var relation = new affinity.Relation([
         *          {'firstName' : {type : affinity.String}},
         *          {'lastName' : {type : affinity.String}},
         *      ],[
         *          ['John', 'Doe'],
         *          ['Mary', 'Poppins']
         *      ])
         *
         * var firstName = relation.get('firstName');
         *
         * var restricted = relation.restrict(firstName.equals('John'));
         *
         */
        equals: function (expression) {

            return this.checkNegate(new (require('./functions/comparable/Equal.js'))(this, expression));

        },

        /**
         * Shortcut method for {@link FLargerThan}
         *
         * This method is used when building predicates for {@link RRestriction} operations.
         * @param {*} expression Predicate Expression
         * @returns {FLargerThan|FNot}
         * @example
         *
         * var relation = new affinity.Relation([
         *          {'firstName' : {type : affinity.String}},
         *          {'lastName' : {type : affinity.String}},
         *          {'age', {type : affinity.Integer}}
         *      ],[
         *          ['John', 'Doe', 34],
         *          ['Mary', 'Poppins', 98]
         *      ])
         *
         * var age = relation.get('age');
         *
         * var restricted = relation.restrict(age.lt(50));
         *
         */
        lt: function (expression) {

            return this.checkNegate(new (require('./functions/comparable/LargerThan.js'))(this, expression));

        },

        /**
         * Shortcut method for {@link FLargerThanEqual}
         *
         * This method is used when building predicates for {@link RRestriction} operations.
         * @param {*} expression Predicate Expression
         * @returns {FLargerThanEqual|FNot} Function
         * @example
         *
         * var relation = new affinity.Relation([
         *          {'firstName' : {type : affinity.String}},
         *          {'lastName' : {type : affinity.String}},
         *          {'age', {type : affinity.Integer}}
         *      ],[
         *          ['John', 'Doe', 34],
         *          ['Mary', 'Poppins', 98]
         *      ])
         *
         * var age = relation.get('age');
         *
         * var restricted = relation.restrict(age.lte(34));
         *
         */
        lte: function (expression) {

            return this.checkNegate(new (require('./functions/comparable/LargerThanEqual.js'))(this, expression));
        },

        /**
         * Shortcut method for {@link FSmallerThan}
         *
         * This method is used when building predicates for {@link RRestriction} operations.
         * @param {*} expression Predicate Expression
         * @returns {FSmallerThan|FNot} Function
         * @example
         *
         * var relation = new affinity.Relation([
         *          {'firstName' : {type : affinity.String}},
         *          {'lastName' : {type : affinity.String}},
         *          {'age', {type : affinity.Integer}}
         *      ],[
         *          ['John', 'Doe', 34],
         *          ['Mary', 'Poppins', 98]
         *      ])
         *
         * var age = relation.get('age');
         *
         * var restricted = relation.restrict(age.st(50));
         *
         */
        st: function (expression) {

            return this.checkNegate(new (require('./functions/comparable/SmallerThan.js'))(this, expression));

        },

        /**
         * Shortcut method for {@link FSmallerThanEqual}
         *
         * This method is used when building predicates for {@link RRestriction} operations.
         * @param {*} expression Predicate Expression
         * @returns {FSmallerThanEqual|FNot} Function
         * @example
         *
         * var relation = new affinity.Relation([
         *          {'firstName' : {type : affinity.String}},
         *          {'lastName' : {type : affinity.String}},
         *          {'age', {type : affinity.Integer}}
         *      ],[
         *          ['John', 'Doe', 34],
         *          ['Mary', 'Poppins', 98]
         *      ])
         *
         * var age = relation.get('age');
         *
         * var restricted = relation.restrict(age.st(50));
         *
         */
        ste: function (expression) {

            return this.checkNegate(new (require('./functions/comparable/SmallerThanEqual.js'))(this, expression));

        },

        /**
         * Shortcut to Absolute operator
         * @param attr
         */
        abs : function(attr){
            return new (require('./functions/numeric/Absolute.js'))(this);
        },

        checkNegate: function (expression) {

            if (this.negated) {
                this.negated = false;
                return new (require('./functions/operator/Not.js'))(expression);

            } else {

                return expression;
            }

        },

        /**
         * String representation of the attribute. Used to print a Relation into console
         * as a Unicode Table.
         */
        toString: function () {

            return this.name + ' : ' + this.type.toString();

        },

        equal : function(attribute){

            return this.constructor.equal(this, attribute);

        }

    }, {

        type : 'Attribute',

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
         * @memberof Attribute
         */
        equal: function (attribute1, attribute2) {

            return ((attribute1.name === attribute2.name) && (attribute1.type === attribute2.type))

        },

        /**
         * Coerces an arbitrary object to type Attribute
         * @param {Attribute|Object} attribute
         * @returns {Attribute}
         * @static
         * @memberof Attribute
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

/*

 age = relation.get('age')
 firstName = relation.get('firstName')

 age.not().st(2).or(age.gt(1))).and(age.lt(2));
 affinity.or( affinity.not(age.st(2)), affinity.and(age.gt(1), age.lt(2)));

 age.not.equal(age.count())

 Attribute -> not, st, ste, eq, gt, gte
 GreaterThanEqual -> or, and

 */