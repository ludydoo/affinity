var affinity = require('./../../../index.js');
var should = require('should');

describe('Intersection Class', function(){

    describe('Intersection#constructor', function(){

        describe('When provided with two union compatible relations that have tuples in common', function(){

            it('Should return a relation with the tuples in common', function(done){

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
                    [1,2,3]
                ]);

                var rel3 = new affinity.Intersection(rel1, rel2);

                rel3.equal(result).should.be.true;

                rel3.print();

                done();

            });

        });

        describe('When provided with two union compatible relations that have no tuples in common', function(){

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
                    [10, 11, 12]
                ]);

                var rel3 = new affinity.Intersection(rel1, rel2);

                rel3.equal(new affinity.Product(rel1, affinity.TABLE_DUM)).should.be.true;

                rel3.print();

                done();

            });

        });

        describe('When provided with two identical relations', function(){

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
                    [1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 9]
                ]);

                var rel3 = new affinity.Intersection(rel1, rel2);

                rel3.equal(rel1).should.be.true;

                rel3.print();

                done();

            });

        });

    });

});