var affinity = require('./../../../index.js');
var should = require('should');

describe('Difference Class', function(){

    describe('Difference#constructor', function(){

        describe('When provided with two union compatible relations that have tuples in common', function(){

            it('Should return a relation without the tuples in common', function(done){

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
                    {b: { type: affinity.Integer}},
                    {c: { type: affinity.Integer}}
                ], [
                    [1, 2, 3]
                ]);

                var result = new affinity.Relation([
                    {a: { type: affinity.Integer}},
                    {b: { type: affinity.Integer}},
                    {c: { type: affinity.Integer}}
                ], [
                    [4, 5, 6],
                    [7, 8, 9]
                ]);

                var rel3 = rel1.difference(rel2);

                rel3.header().attributes().should.be.an.Array.and.have.length(3);
                rel3.body().should.be.an.Array.and.have.length(2);
                rel3.equal(result).should.be.true;

                rel3.print();

                done();

            });

        });

        describe('When provided with two union compatible relations that have no tuples in common', function(){

            it('Should return the same as the first relation', function(done){

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
                    {b: { type: affinity.Integer}},
                    {c: { type: affinity.Integer}}
                ], [
                    [10, 11, 12]
                ]);

                var rel3 = rel1.difference(rel2);

                rel3.equal(rel1).should.be.true;

                rel3.print();

                done();

            });

        });

        describe('When provided with two identical relations', function(){

            it('Should return an empty relation', function(done){

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
                    {b: { type: affinity.Integer}},
                    {c: { type: affinity.Integer}}
                ], [
                    [1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 9]
                ]);

                var rel3 = rel1.difference(rel2);

                rel3.equal(rel1.product(affinity.TABLE_DUM)).should.be.true;

                rel3.print();

                done();

            });

        });

    });

});