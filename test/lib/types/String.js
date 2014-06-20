var affinity = require('./../../../index.js');
var should = require('should');

describe('TString class', function () {

    describe('TString constructor', function () {

        describe('When provided with arguments', function () {

            it('Should store those arguments', function (done) {

                var string = new affinity.String('Abc');

                done();

            });

        });

    });

    describe('TString.equal', function(){

        describe('When two strings are equal', function(){

            it('Should return a truey TBoolean', function(done){

                var str1 = new affinity.String('abc');
                var str2 = new affinity.String('abc');

                var result = affinity.String.equal(str1, str2);

                (result == true).should.be.equal(true);

                done();

            });

        });

        describe('When two strings are not equal', function(){

            it('Should return a falsey TBoolean', function(done){

                var str1 = new affinity.String('abc');
                var str2 = new affinity.String('def');

                var result = affinity.String.equal(str1, str2);

                (result == false).should.be.equal(true);

                done();

            });

        });

    });

});