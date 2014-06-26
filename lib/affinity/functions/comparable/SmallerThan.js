var Function = require('./../../Function.js');
var compare = require('./../../helpers/compare');
var TBoolean = require('./../../types/Boolean.js');
var _ = require('lodash');

var FSmallerThan = Function.extend(

    {

        /**
         * @class Functions.Comparable.SmallerThan
         * @extends Function
         */
        constructor: function () {

            Function.apply(this, arguments);

            this.name = 'SmallerThan';

            this.type(TBoolean);

        },

        value: function () {

            return (compare(null, this.parameters[0], this.parameters[1]) < 0);

        }

    },{



    });

module.exports = FSmallerThan;