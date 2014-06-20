var affinity = require('./../../../index.js');
var should = require('should');

describe('Projection Class', function(){

    describe('Projection#constructor', function(){

        describe('When provided existing attribute names', function(){

            it('Should return a relation with the specified attributes only', function(done){

                var rel1 = new affinity.Relation([
                    {a: { type: affinity.Integer}},
                    {b: { type: affinity.Integer}},
                    {c: { type: affinity.Integer}}
                ], [
                    [1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 9]
                ]);

                var rel = rel1.project(['a', 'b']);

                rel.header().attributes().should.be.an.Array.and.have.length(2);
                rel.body();

                rel.print();

                done();

            });

        });

        describe('When provided non existing attribute names', function(){

            it('Should throw', function(done){

                var rel1 = new affinity.Relation([
                    {a: { type: affinity.Integer}},
                    {b: { type: affinity.Integer}},
                    {c: { type: affinity.Integer}}
                ], [
                    [1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 9]
                ]);

                should(function () {
                    var rel = rel1.project(['a', 'b', 'c', 'd', 'e']);
                }).throw();

                done();

            });

        });

    });

});