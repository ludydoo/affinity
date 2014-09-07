var Base = require('./Base.js');
var _ = require('lodash');
var Attribute = require('./Attribute');

var Function = Base.extend(

    {

        /**
         * @class Function
         * @param parameters
         * @property [*[]] param
         */
        constructor: function (parameters) {

            /**
             * @type {Array}
             */
            this.parameters = [];


            for (var i = 0, j = arguments.length; i < j; i++) {

                this.parameters.push(arguments[i]);

            }

            Base.apply(this, arguments);

        },

        /**
         * Sets the function's parameter
         * @param {Object} param The parameter of the function to set
         * @returns {Function} Returns this to chain call
         */
        set: function (param) {

            for (var a in param) {
                if (param.hasOwnProperty(a))
                    this[a] = param[a];
            }

            _.forEach(this.args, function (arg) {
                if (arg instanceof Function) {
                    arg.set(param);
                }
            });

            return this;

        },

        /**
         * Helper function used to convert attributes objects into functions that will get the tuple
         * value for that attribute
         */
        convertAttributeToTuple: function () {

            _.forEach(this.parameters, function (parameter, index) {

                if (_.isFunction(parameter.convertAttributeToTuple)) {
                    parameter.convertAttributeToTuple();
                }

                if (parameter instanceof Attribute) {

                    var newFunc = new (require('./functions/tuple/Attribute'))(parameter.name);

                    newFunc.type = parameter.type;

                    this.parameters[index] = newFunc;
                }

            }, this);

        },

        assignTuple : function(tuple){

            _.forEach(this.parameters, function (parameter, index) {

                if (parameter instanceof Function) {

                    parameter.assignTuple(tuple);

                }

            }, this);

            return this;

        },


        type : function(type){

            if(type){

                this._type = type;

                _.forIn(type.payload, function (mix) {

                    _.forIn(mix, function(mixin, key){

                        this[key] = mixin;

                    }, this)

                }, this)

            } else {
                return this._type;
            }

        }

    });

module.exports = Function;