var affinity = require('./../../../index.js');
var should = require('should');
var debug = require('./../../../lib/affinity/helpers/debug');

describe('Union class', function () {

    describe('When given two union compatible relations', function () {

        it('Should perform a union on those relations', function (done) {

            var rel1 = new affinity.Relation(
                new affinity.Header({
                    a: {type: affinity.Integer},
                    b: {type: affinity.Integer},
                    c: {type: affinity.Integer}
                }),
                [
                    new affinity.Tuple({a: 1, b: 2, c: 3}),
                    new affinity.Tuple({a: 1, b: 2, c: 4}),
                    new affinity.Tuple({a: 1, b: 2, c: 5}),
                    new affinity.Tuple({a: 1, b: 2, c: 6})
                ]
            );


            var rel2 = new affinity.Relation(
                new affinity.Header({
                    a: {type: affinity.Integer},
                    b: {type: affinity.Integer},
                    c: {type: affinity.Integer}
                }),
                [
                    new affinity.Tuple({a: 1, b: 2, c: 7}),
                    new affinity.Tuple({a: 1, b: 2, c: 8}),
                    new affinity.Tuple({a: 1, b: 2, c: 9}),
                    new affinity.Tuple({a: 1, b: 2, c: 10})
                ]
            );

            var rel3 = new affinity.Union(rel1, rel2);

            rel3.header().elements().should.be.an.Array.and.have.length(3);
            rel3.header().should.not.be.equal(rel1.header());
            rel3.header().should.not.be.equal(rel2.header());


            rel3.body().should.be.an.Array.and.have.length(8);

            debug.reldump.debug(rel3.toString());

            done();

        });

    });

    describe('When given two non union compatible relations', function () {

        it('Should throw', function (done) {

            var rel1 = new affinity.Relation(new affinity.Header({
                a: {
                    type: affinity.Integer
                },
                b: {
                    type: affinity.Integer
                },
                c: {
                    type: affinity.Integer
                }
            }));


            var rel2 = new affinity.Relation(new affinity.Header({
                a: {
                    type: affinity.Integer
                },
                b: {
                    type: affinity.Integer
                },
                d: {
                    type: affinity.Integer
                }
            }));

            should(function () {
                var rel3 = new affinity.Union(rel1, rel2);
                rel3.header();
            }).throw();

            done();

        });

    });

    describe('When given TABLE_DEE and TABLE_DUM', function(){

        it('Should result in TABLE_DEE', function(done){

            var united = affinity.TABLE_DEE.union(affinity.TABLE_DUM);

            united.equal(affinity.TABLE_DEE).should.be.equal(true);

            united.print();

            done();

        });

    });

    describe('When given TABLE_DUM and TABLE_DUM', function(){

        it('Should result in TABLE_DUM', function(done){

            var united = affinity.TABLE_DUM.union(affinity.TABLE_DUM);

            united.equal(affinity.TABLE_DUM).should.be.equal(true);

            united.print();

            done();

        });

    });

});