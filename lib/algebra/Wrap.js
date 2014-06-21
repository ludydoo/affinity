var Relation = require('./../Relation.js');
var Header = require('./../Header.js');
var _ = require('lodash');
var debug = require('./../helpers/debug');

var RWrap = Relation.wrap(
    /** @lends RWrap.prototype */
    {

        /**
         * @class RWrap
         * @augments Relation
         * @param {Relation} relationA The relation to wrap
         * @param {String} wrappedAttributeName The name of the wrapping attribute
         * @param {String[]} attributes The attributes to wrap
         * @classdesc
         * The Wrap will gather multiple attributes into a single one, converting them to a tuple-valued attribute
         * @example
         *
         * var relationA = new affinity.Relation([
         *          {characterId: { type: affinity.Integer}},
         *          {firstName: { type: affinity.String}},
         *          {lastName: { type: affinity.String}}
         *      ],[
         *          [1, 'John', 'Doe'],
         *          [2, 'Mary', 'Poppins'],
         *          [3, 'Lucky', 'Luke']
         *      ]);
         *
         * // +------------------------+---------------------+--------------------+
         * // | characterId : TInteger | firstName : TString | lastName : TString |
         * // +========================+=====================+====================+
         * // | 1                      | John                | Doe                |
         * // +------------------------+---------------------+--------------------+
         * // | 2                      | Mary                | Poppins            |
         * // +------------------------+---------------------+--------------------+
         * // | 3                      | Lucky               | Luke               |
         * // +------------------------+---------------------+--------------------+
         *
         * var relationC = relationA.wrap('wrappedAttribute', ['firstName','lastName']);
         *
         * // or
         *
         * var relationC = new affinity.Wrap(relationA, 'wrappedAttribute', ['firstName','lastName']);
         *
         * //                          <----WRAPPING ATTRIBUTE-------------------------->
         * // +-------------------------------------------------------------------------+
         * // | characterId : TInteger | wrappedAttribute : Tuple                       |
         * // +========================+================================================+
         * // | 1                      | Tuple{firstName : 'John', lastName : 'Doe'}    |
         * // +-------------------------------------------------------------------------+
         * // | 2                      | Tuple{firstName : 'Mary', lastName : 'Poppins'}|
         * // +-------------------------------------------------------------------------+
         * // | 3                      | Tuple{firstName : 'Lucky', lastName : 'Luke'}  |
         * // +-------------------------------------------------------------------------+
         * //
         *
         */
        constructor: function (relationA, wrappedAttributeName, attributes) {

            debug.wrap.trace('#constructor');

            this.rel = relationA;
            this.wrappedAttributeName = wrappedAttributeName;
            this.attributes = attributes;

            Relation.call(this);

        },

        bindEvents: function () {

            debug.wrap.trace('#bindEvents');

            // Calling the parent bindEvents
            RWrap.__super__.bindEvents.call(this);

            // BeforeGetBody
            this.ee.once('beforeGetBody', function () {

                debug.wrap.trace('beforeGetBody');

                // Add Wrap build header code here

            });

            // BeforeGetHeader
            this.ee.once('beforeGetHeader', function () {

                debug.wrap.trace('beforeGetHeader');

                // Add Wrap build tuples code here

            });

        }

    });

module.exports = RWrap;