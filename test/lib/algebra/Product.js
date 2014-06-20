var affinity = require('./../../../index.js');
var should = require('should');

describe('Product Class', function () {

    describe('Product#constructor', function () {

        describe('When provided with two productable relations', function () {

            it('Should perform a product on those relations', function (done) {

                var rel1 = new affinity.Relation([
                    {a: { type: affinity.Integer}},
                    {b: { type: affinity.Integer}},
                    {c: { type: affinity.Integer}}
                ], [
                    [1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 9]
                ]);

                var rel2 = new affinity.Relation([
                    {d: { type: affinity.Integer}},
                    {e: { type: affinity.Integer}},
                    {f: { type: affinity.Integer}}
                ], [
                    [1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 9]
                ]);

                var rel3 = new affinity.Product(rel1, rel2);

                rel3.header().attributes().should.be.an.Array.and.have.length(6);
                rel3.body().should.be.an.Array.and.have.length(9);

                rel3.print();

                done();

            });

        });

        describe('When provided with an empty relation and a non-empty relation', function () {

            it('Should return an empty relation', function (done) {

                var rel1 = new affinity.Relation([
                    {a: { type: affinity.Integer}},
                    {b: { type: affinity.Integer}},
                    {c: { type: affinity.Integer}}
                ], [
                    [1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 9]
                ]);

                var rel2 = new affinity.Relation([
                    {d: { type: affinity.Integer}},
                    {e: { type: affinity.Integer}},
                    {f: { type: affinity.Integer}}
                ]);

                var rel3 = new affinity.Product(rel1, rel2);

                rel3.header().attributes().should.be.an.Array.and.have.length(6);
                rel3.body().should.be.an.Array.and.have.length(0);

                rel3.print();

                done();

            });

        });

        describe('When given a relation and TABLE_DUM', function(){
            it('Should return the relation without any tuple', function(done){

                var rel1 = new affinity.Relation([
                    {a: { type: affinity.Integer}},
                    {b: { type: affinity.Integer}},
                    {c: { type: affinity.Integer}}
                ], [
                    [1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 9]
                ]);

                var rel3 = new affinity.Product(rel1, affinity.TABLE_DUM);
                rel3.header().elements().should.be.an.Array.and.have.length(3);
                rel3.body().should.be.an.Array.and.have.length(0);

                rel3.print();

                done();
            });
        });

        describe('When given a relation and TABLE_DEE', function(){
            it('Should return a copy of the relation', function(done){

                var rel1 = new affinity.Relation([
                    {a: { type: affinity.Integer}},
                    {b: { type: affinity.Integer}},
                    {c: { type: affinity.Integer}}
                ], [
                    [1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 9]
                ]);

                var rel3 = new affinity.Product(rel1, affinity.TABLE_DEE);
                rel3.header().elements().should.be.an.Array.and.have.length(3);
                rel3.body().should.be.an.Array.and.have.length(3);
                rel3.equal(rel1).should.be.true;

                rel3.print();

                done();
            });
        });

        describe('When provided with two non disjoint relations', function () {

            it('Should throw', function (done) {

                var rel1 = new affinity.Relation([
                    {a: { type: affinity.Integer}},
                    {b: { type: affinity.Integer}},
                    {c: { type: affinity.Integer}}
                ], [
                    [1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 9]
                ]);

                var rel2 = new affinity.Relation([
                    {a: { type: affinity.Integer}},
                    {e: { type: affinity.Integer}},
                    {f: { type: affinity.Integer}}
                ], [
                    [1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 9]
                ]);

                should(function(){
                    var rel3 = new affinity.Product(rel1, rel2);

                    rel3.header().attributes().should.be.an.Array.and.have.length(6);
                    rel3.body().should.be.an.Array.and.have.length(9);
                }).throw();

                done();

            });

        });

    });

});