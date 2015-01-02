module.exports = function ($) {

    $.mapper = function (url) {

        return {
            instrument: {
                prettify: false,
                objectDump: {
                    depth: 5,
                    propertyNumber: 20,
                    arrayLength: 20,
                    stringLength: 50
                }
            }
        };
    };

};