var Relation = require('./../Relation.js');
var Header = require('./../Header.js');
var Tuple = require('./../Tuple.js');
var Set = require('./../Set.js');
var Attribute = require('./../Attribute.js');
var _ = require('lodash');
var debug = require('./../helpers/debug');



var Unwrap = Relation.extend(

    {

        /**
         * @class Operators.Unwrap
         * @extends Relation
         * @param {Relation} relation The relation to Unwrap
         * @param {String[]|String|Set|Header} attributeNames The name of the wrapped attributes to unwrap
         *
         * The Unwrap operator will reverse the {@link Operators.Wrap} operation, converting a tuple-valued attribute into
         * the attributes of the tuples.
         *
         *     var relationA = new affinity.Relation([
         *              {characterId: { type: affinity.Integer}},
         *              {firstName: { type: affinity.String}},
         *              {lastName: { type: affinity.String}}
         *          ],[
         *              [1, 'John', 'Doe'],
         *              [2, 'Mary', 'Poppins'],
         *              [3, 'Lucky', 'Luke']
         *          ]);
         *
         *     var relationB = relationA.Unwrap('UnwrappedAttribute', ['firstName','lastName']);
         *
         *
         *     // +-------------------------------------------------------------------------+
         *     // | characterId : TInteger | unwrappedAttribute : Tuple                     |
         *     // +========================+================================================+
         *     // | 1                      | Tuple{firstName : 'John', lastName : 'Doe'}    |
         *     // +-------------------------------------------------------------------------+
         *     // | 2                      | Tuple{firstName : 'Mary', lastName : 'Poppins'}|
         *     // +-------------------------------------------------------------------------+
         *     // | 3                      | Tuple{firstName : 'Lucky', lastName : 'Luke'}  |
         *     // +-------------------------------------------------------------------------+
         *     //
         *
         *     var relationC = relationB.unwrap('unwrappedAttribute');
         *
         *     // or
         *
         *     var relationC = new affinity.Unwrap(relationB, 'unwrappedAttribute');
         *
         *
         *     //                          <-------UNWRAPPED ATTRIBUTES--------------->
         *     // +------------------------+---------------------+--------------------+
         *     // | characterId : TInteger | firstName : TString | lastName : TString |
         *     // +========================+=====================+====================+
         *     // | 1                      | John                | Doe                |
         *     // +------------------------+---------------------+--------------------+
         *     // | 2                      | Mary                | Poppins            |
         *     // +------------------------+---------------------+--------------------+
         *     // | 3                      | Lucky               | Luke               |
         *     // +------------------------+---------------------+--------------------+
         *
         */
        constructor: function (relation, attributeNames) {

            debug.unwrap.trace('#constructor');

            // Check if the relation argument is of good type
            if(!(relation instanceof Relation)){
                throw new TypeError('Specified relation is of wrong type');
            }

            // If the attributeNames is a string, coerce it to an array
            if(_.isString(attributeNames)){
                attributeNames = [attributeNames];
            }

            // If the attributeNames is not an array or set, throw an error
            if(!_.isArray(attributeNames) && !(attributeNames instanceof Set)){
                throw new Error('Unsupported type of specified attributeNames to unwrap');
            }

            if(_.isArray(attributeNames) && attributeNames.length <= 0){
                throw new Error('You must specify attributes to unwrap!');
            }

            if((attributeNames instanceof Set) && attributeNames.length() <= 0){
                throw new Error('You must specify attributes to unwrap!');
            }

            this.attributeNames = attributeNames;
            this.relation = relation;

            Relation.call(this);

        },

        bindEvents: function () {

            debug.unwrap.trace('#bindEvents');

            // Calling the parent bindEvents
            Unwrap.__super__.bindEvents.call(this);

            var relation = this.relation;

            var that = this;

            // BeforeGetHeader
            this.ee.once('beforeGetHeader', function () {

                debug.unwrap.trace('beforeGetHeader');

                // Copy all attributes from the base header that will not be unwrapped
                that.header().copy(relation.header(), that.attributeNames, true);

                // Get all attributes that were wrapped in the base relation
                var alreadyWrappedAttributes = new Header();
                relation.header().each(function(attribute){
                    if(attribute.wrappedAttributes){
                        alreadyWrappedAttributes.add(attribute.clone());
                    }
                });

                // Get the attributes which will be unwrapped
                var unwrappedAttributes = new Header();
                unwrappedAttributes.copy(relation.header(), that.attributeNames);
                that.unwrappedAttributes = unwrappedAttributes;

                // Get the attributes which will not be unwrapped
                var nonUnwrappedAttributes = new Header();
                nonUnwrappedAttributes.copy(relation.header(), that.attributeNames, true);
                that.nonUnwrappedAttributes = nonUnwrappedAttributes;

                // Check that the attributes to be unwrapped are wrapped. We would not want
                // to unwrap non-wrapped attributes!
                if(!unwrappedAttributes.isSubset(alreadyWrappedAttributes)){
                    throw new Error('Specified attributes are not all wrapped attributes. Must specify attributes which are wrapped.');
                }

                // Add all nested unwrapped attributes in the header
                unwrappedAttributes.each(function(unwrappedAttribute){
                    unwrappedAttribute.wrappedAttributes.each(function(wrappedAttribute){
                        that.header().add(wrappedAttribute.clone());
                    })
                })

            });

            // BeforeGetBody
            this.ee.once('beforeGetBody', function () {

                debug.unwrap.trace('beforeGetBody');

                // Loop through each tuple of the relation
                that.relation.each(function(tuple){

                    // Create the tuple to be inserted
                    var newTuple = new Tuple();

                    // Assign the values to the attributes which will not be unwrapped
                    that.nonUnwrappedAttributes.each(function(attribute){
                        newTuple.set(attribute.name, tuple.get(attribute.name));
                    });

                    // Loop through the attributes to be unwrapped
                    that.unwrappedAttributes.each(function(unwrappedAttribute){

                        // Loop through the wrapped attribute header
                        unwrappedAttribute.wrappedAttributes.each(function(wrappedAttribute){

                            // Set the tuple value for this attribute
                            newTuple.set(wrappedAttribute.name, tuple.get(unwrappedAttribute.name).get(wrappedAttribute.name));

                        })

                    });

                    that.add(newTuple);

                })

            });

        }

    });

module.exports = Unwrap;