var Relation = require('./../Relation.js');
var Set = require('./../Set.js');
var Header = require('./../Header.js');
var Attribute = require('./../Attribute.js');
var Tuple = require('./../Tuple.js');
var _ = require('lodash');
var debug = require('./../helpers/debug');



var Wrap = Relation.extend(

    {

        /**
         * @class Operators.Wrap
         * @extends Relation
         * @param {Relation} relationA The relation to wrap
         * @param {String} wrappingAttributeName The name of the wrapping attribute
         * @param {String[]} wrappedAttributes The wrappedAttributes to wrap
         *
         * The Wrap will gather multiple wrappedAttributes into a single one, converting them to a tuple-valued attribute
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
         *     var relationC = relationA.wrap('wrappedAttribute', ['firstName','lastName']);
         *
         *     // or
         *
         *     var relationC = new affinity.Wrap(relationA, 'wrappedAttribute', ['firstName','lastName']);
         *
         *     //                          <----WRAPPING ATTRIBUTE-------------------------->
         *     // +-------------------------------------------------------------------------+
         *     // | characterId : TInteger | wrappedAttribute : Tuple                       |
         *     // +========================+================================================+
         *     // | 1                      | Tuple{firstName : 'John', lastName : 'Doe'}    |
         *     // +-------------------------------------------------------------------------+
         *     // | 2                      | Tuple{firstName : 'Mary', lastName : 'Poppins'}|
         *     // +-------------------------------------------------------------------------+
         *     // | 3                      | Tuple{firstName : 'Lucky', lastName : 'Luke'}  |
         *     // +-------------------------------------------------------------------------+
         *     //
         *
         */
        constructor: function (relationA, wrappingAttributeName, wrappedAttributes) {

            debug.wrap.trace('#constructor');

            this.relation = relationA;

            Attribute.assertValidName(wrappingAttributeName);

            if(!_.isArray(wrappedAttributes) && !(wrappedAttributes instanceof Set)){
                throw new Error('Wrapped attributes must be an array or set of attributes / attribute names');
            }

            if(_.isArray(wrappedAttributes) && wrappedAttributes.length <= 0){
                throw new Error('There must be at least one attribute to wrap');
            }

            if(wrappedAttributes instanceof Set && wrappedAttributes.length() <= 0){
                throw new Error('There must be at least one attribute to wrap');
            }

            this.wrappedAttributeName = wrappingAttributeName;
            this.wrappedAttributes = wrappedAttributes;

            Relation.call(this);

        },

        bindEvents: function () {

            debug.wrap.trace('#bindEvents');

            // Calling the parent bindEvents
            Wrap.__super__.bindEvents.call(this);

            var that = this;

            // BeforeGetHeader
            this.ee.once('beforeGetHeader', function () {

                debug.wrap.trace('beforeGetHeader');

                // Check that the passed attributes exist in the base header
                Header.assertAttributesExist(that.relation, that.wrappedAttributes);

                // Extract the wrapped attributes, convert them to a Header instance
                var wrappedAttributes = new Header();
                wrappedAttributes.copy(that.relation.header(), that.wrappedAttributes);
                that.wrappedAttributes = wrappedAttributes;

                // Extract the non wrapped attributes in another variable, and
                // copy the attributes in this header
                that.nonWrappedAttributes = new Header();
                that.nonWrappedAttributes.copy(that.relation.header(), that.wrappedAttributes, true);
                that.header().copy(that.nonWrappedAttributes);

                // Create the wrapped attribute
                var newWrappedAttribute = new Attribute({name : that.wrappedAttributeName, type : Tuple})

                // Store the wrapped header in the attribute
                newWrappedAttribute.wrappedAttributes = that.wrappedAttributes;

                // Add it to the header
                that.header().add(newWrappedAttribute);

            });


            // BeforeGetBody
            this.ee.once('beforeGetBody', function () {

                debug.wrap.trace('beforeGetBody');

                that.relation.each(function(tuple){

                    // Create the tuple we will later insert
                    var newTuple = new Tuple();

                    // Copy the value of the non-wrapped attributes
                    newTuple.copy(tuple, that.nonWrappedAttributes);

                    // Create the nested tuple
                    var nestedTuple = new Tuple();

                    // Copy the values of the wrapped attributes in the nested tuple
                    nestedTuple.copy(tuple, that.wrappedAttributes);

                    // Add the nested tuple to the containing tuple
                    newTuple.set(that.wrappedAttributeName, nestedTuple);

                    that.add(newTuple);

                })

            });

        },

        afterAdd : function(relation, tuple){
            var result = this.relation.wrap(this.wrappedAttributeName, this.wrappedAttributes);
            this.adjustTo(result);
        },

        afterRemove : function(relation, tuple){
            var result = this.relation.wrap(this.wrappedAttributeName, this.wrappedAttributes);
            this.adjustTo(result);
        },

        afterUpdate : function(relation, tuple, attributeName, value, oldValue){
            var result = this.relation.wrap(this.wrappedAttributeName, this.wrappedAttributes);
            this.adjustTo(result);
        }

    }, {

        type : 'Wrap'

    });

module.exports = Wrap;