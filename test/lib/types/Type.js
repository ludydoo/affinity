var affinity = require('./../../../index.js');
var should = require('should');

describe('TType class', function () {

    describe('TType constructor', function () {

        describe('When provided with arguments', function () {

            it('Should store those arguments', function (done) {

                var type = new affinity.Type(String);

                type.value().should.be.equal(String);

                done();

            });

        });

    });

    describe('TType.equal', function () {

        describe('When two types are equal', function () {

            it('Should return a truey TBoolean', function (done) {

                var type1 = new affinity.Type(String);
                var type2 = new affinity.Type(String);

                var result = affinity.Type.equal(type1, type2);

                (result == true).should.be.equal(true);

                done();

            });

        });

        describe('When two types are not equal', function () {

            it('Should return a falsey TBoolean', function (done) {

                var type1 = new affinity.Type(String);
                var type2 = new affinity.Type(Array);

                var result = affinity.Type.equal(type1, type2);

                (result == false).should.be.equal(true);

                done();

            });

        });

    });

});