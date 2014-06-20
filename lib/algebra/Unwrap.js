var Relation = require('./../Relation.js');
var Header = require('./../Header.js');
var _ = require('lodash');
var debug = require('./../helpers/debug');

var RUnwrap = Relation.unwrap(
    /** @lends RUnwrap.prototype */
    {

        /**
         * @class RUnwrap
         * @augments Relation
         * @param {Relation} relationA The relation to Unwrap
         * @param {String} attributeName The name of the wrapped attribute to unwrap
         * @classdesc
         * The Unwrap operator will reverse the {@link RWrap} operation, converting a tuple-valued attribute into
         * the attributes of the tuples.
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
         * var relationB = relationA.Unwrap('UnwrappedAttribute', ['firstName','lastName']);
         *
         *
         * // +-------------------------------------------------------------------------+
         * // | characterId : TInteger | unwrappedAttribute : Tuple                     |
         * // +========================+================================================+
         * // | 1                      | Tuple{firstName : 'John', lastName : 'Doe'}    |
         * // +-------------------------------------------------------------------------+
         * // | 2                      | Tuple{firstName : 'Mary', lastName : 'Poppins'}|
         * // +-------------------------------------------------------------------------+
         * // | 3                      | Tuple{firstName : 'Lucky', lastName : 'Luke'}  |
         * // +-------------------------------------------------------------------------+
         * //
         *
         * var relationC = relationB.unwrap('unwrappedAttribute');
         *
         * // or
         *
         * var relationC = new affinity.Unwrap(relationB, 'unwrappedAttribute');
         *
         *
         * //                          <-------UNWRAPPED ATTRIBUTES--------------->
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
         */
        constructor: function (relationA, attributeName) {

            debug.unwrap.trace('#constructor');

            this.rel = relationA;
            this.attributeName = attributeName;

            Relation.call(this);

        },

        bindEvents: function () {

            debug.unwrap.trace('#bindEvents');

            // Calling the parent bindEvents
            RUnwrap.__super__.bindEvents.call(this);

            // BeforeGetBody
            this.ee.once('beforeGetBody', function () {

                debug.unwrap.trace('beforeGetBody');

                // Add Unwrap build header code here

            });

            // BeforeGetHeader
            this.ee.once('beforeGetHeader', function () {

                debug.unwrap.trace('beforeGetHeader');

                // Add Unwrap build tuples code here

            });

        }

    });

module.exports = RUnwrap;