var affinity = require('./../../index.js');
var should = require('should');
var _ = require('lodash');

describe('Tuple Class', function () {

    describe('Tuple()', function () {

        describe('When provided with no attributes', function () {

            it('Should create an empty tuple', function (done) {

                var tuple = new affinity.Tuple();

                Object.keys(tuple.attributes).should.be.an.Array.and.have.length(0);

                done();

            })

        });

        describe('When provided with hash attributes', function () {

            it('Should register those attributes', function (done) {

                var tuple = new affinity.Tuple({a: 0, b: 1});

                Object.keys(tuple.attributes).should.be.an.Array.and.have.length(2);

                tuple.attributes.a.should.be.equal(0);
                tuple.attributes.b.should.be.equal(1);

                done();

            })

        });

        describe('When provided with associative array attributes', function () {

            it('Should register those attributes', function (done) {

                var arr = [];
                arr['a'] = 0;
                arr['b'] = 1;
                var tuple = new affinity.Tuple(arr);

                Object.keys(tuple.attributes).should.be.an.Array.and.have.length(2);

                tuple.attributes.a.should.be.equal(0);
                tuple.attributes.b.should.be.equal(1);

                done();

            });

        });

        describe('When provided with unsupported attribute type', function () {

            it('Should throw an error', function (done) {

                should(function () {
                    var tuple = new affinity.Tuple(5);
                }).throw();


                done();

            });

        });

    });

    describe('Tuple.equal', function () {

        describe('When provided with two identical tuples', function () {

            it('Should return true', function (done) {

                var tuple1 = new affinity.Tuple({a: 1, b: 2});
                var tuple2 = new affinity.Tuple({a: 1, b: 2});

                affinity.Tuple.equal(tuple1, tuple2).should.be.true;

                done();

            });

        });

        describe('When provided with slightly different tuples', function () {

            it('Should return false', function (done) {

                var tuple1 = new affinity.Tuple({a: 1, b: 2});
                var tuple2 = new affinity.Tuple({a: 1, b: 1});

                affinity.Tuple.equal(tuple1, tuple2).should.be.false;

                done();

            });

        });

        describe('When provided with completely different tuples', function () {

            it('Should return false', function (done) {

                var tuple1 = new affinity.Tuple({a: 1, b: 2});
                var tuple2 = new affinity.Tuple({c: 1, d: 1});

                affinity.Tuple.equal(tuple1, tuple2).should.be.false;

                done();

            });

        });

        describe('When provided with only one tuple', function () {

            it('Should return true', function (done) {

                var tuple1 = new affinity.Tuple({a: 1, b: 2});

                should(function () {
                    affinity.Tuple.equal(tuple1)
                }).throw();

                done();

            });

        });

        describe('When provided with nothing', function () {

            it('Should return true', function (done) {

                should(function () {
                    affinity.Tuple.equal()
                }).throw();

                done();

            });

        });

        describe('When not even provided with tuples', function () {

            it('Should throw', function (done) {

                var tuple1 = 1;
                var tuple2 = new affinity.Tuple({c: 1, d: 1});

                should(function () {
                    affinity.Tuple.equal(tuple1, tuple2)
                }).throw();

                done();

            });

        });

    });

    describe('Tuple.toObject', function(){

        describe('When provided with a tuple', function(){

            it('should return an object', function(done){

                var tuple = new affinity.Tuple({a : 1, b : 1});

                _.isObject(tuple).should.be.true;

                done();

            });

            it('Should add the tuple attributes to the object', function(done){

                var tuple = new affinity.Tuple({a : 1, b : 1});

                var obj = tuple.toObject();

                obj.hasOwnProperty('a').should.be.true;
                obj.hasOwnProperty('b').should.be.true;
                obj.a.should.be.equal(1);
                obj.b.should.be.equal(1);
                done();

            });

        });

        describe('When provided with a relation tuple', function(){

            it('Should be able to recursively convert a tuple to object', function(done){

                var relation = new affinity.Relation([
                    { tuple : { type : affinity.Tuple } }
                ],[
                    [{ a : 1, b : 2 }]
                ]);

                var result = relation.first().toObject(true);

                var expectedResult = {
                    tuple : {
                        a : 1,
                        b : 2
                    }
                };

                _.isEqual(result, expectedResult).should.be.true;

                done();

            })

        });

    })

});