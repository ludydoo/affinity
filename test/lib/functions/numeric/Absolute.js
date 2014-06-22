var affinity = require('./../../../../index.js');
var should = require('should');

describe('FAbsolute Class', function () {


    describe('When provided with a negative integer', function () {


        it('Should return a positive integer if the provided integer is negative', function (done) {

            var abs = new affinity.Absolute(-10);

            (abs.value()).should.be.equal(10);

            done();

        });

        it('Should return a positive integer if the provided integer is positive', function (done) {

            var abs = new affinity.Absolute(10);

            (abs.value()).should.be.equal(10);

            done();

        })

    });


    describe('When provided with a decimal', function () {


        it('Should return a positive decimal if the provided decimal is negative', function (done) {

            var abs = new affinity.Absolute(-10.2);

            (abs.value()).should.be.equal(10.2);

            done();

        });

        it('Should return a positive decimal if the provided decimal is positive', function (done) {

            var abs = new affinity.Absolute(10.2);

            (abs.value()).should.be.equal(10.2);

            done();

        })

    });

    describe('When provided with an hexadecimal', function () {


        it('Should return a positive hex if the provided hex is negative', function (done) {

            var abs = new affinity.Absolute(-0x02);

            (abs.value()).should.be.equal(0x02);

            done();

        });

        it('Should return a positive hex if the provided hex is positive', function (done) {

            var abs = new affinity.Absolute(0x02);

            (abs.value()).should.be.equal(0x02);

            done();

        })

    });

    describe('When provided with an exp', function () {


        it('Should return a positive exp if the provided exp is negative', function (done) {

            var abs = new affinity.Absolute(-10e-2);

            (abs.value()).should.be.equal(10e-2);

            done();

        });

        it('Should return a positive exp if the provided exp is positive', function (done) {

            var abs = new affinity.Absolute(10e2);

            (abs.value()).should.be.equal(10e2);

            done();

        })

    });

});