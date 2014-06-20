var Base = require('./Base.js');
var _ = require('lodash');
var Attribute = require('./Attribute');

var Function = Base.extend(
    /** @lends Function.prototype */
    {

        /**
         * @class Function
         * @param args
         */
        constructor: function (args) {

            this.args = [];

            for (var i = 0, j = arguments.length; i < j; i++) {

                this.args.push(arguments[i]);

            }

            Base.apply(this, arguments);

        },

        /**
         * Shortcut to add And operator
         * @param attr
         */
        and: function (attr) {
            return new (require('./functions/operator/And.js'))(this, attr);
        },


        /**
         * Shortcut to add Or operator
         * @param attr
         */
        or: function (attr) {
            return new (require('./functions/operator/Or.js'))(this, attr);
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

            _.forEach(this.args, function (arg, index) {

                if (_.isFunction(arg.convertAttributeToTuple)) {
                    arg.convertAttributeToTuple();
                }

                if (arg instanceof Attribute) {

                    var newFunc = new (require('./functions/tuple/Attribute'))(arg.name);
                    this.args[index] = newFunc;
                }

            }, this)

        }

    });

module.exports = Function;