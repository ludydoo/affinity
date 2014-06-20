var affinity = require('./../../../index.js');
var should = require('should');

describe('Rename class', function () {

    describe('Rename constructor', function () {

        describe('When given valid renaming arguments', function () {

            it('Should perform a renaming on specified attributes', function (done) {

                var rel1 = new affinity.Relation(
                    new affinity.Header({
                        a : {type : affinity.Integer},
                        b : {type : affinity.Integer},
                        c : {type : affinity.Integer}}
                    ),
                    [
                        new affinity.Tuple({a : 1, b : 2, c : 3}),
                        new affinity.Tuple({a : 1, b : 2, c : 4}),
                        new affinity.Tuple({a : 1, b : 2, c : 5}),
                        new affinity.Tuple({a : 1, b : 2, c : 6})
                    ]
                );

                var rel3 = new affinity.Rename(rel1, {a : 'd'});

                rel3.header().elements().should.be.an.Array.and.have.length(3);
                rel3.header()._attributes.should.have.property('d');
                rel3.header()._attributes.should.not.have.property('a');
                rel3.header().should.not.be.equal(rel1.header());
                rel3.body().should.be.an.Array.and.have.length(4);

                rel3.print();

                done();

            });

        });

        describe('When ordered to rename an unexisting attribute', function () {

            it('Should throw', function (done) {

                var rel1 = new affinity.Relation(
                    new affinity.Header({
                        a : {type : affinity.Integer},
                        b : {type : affinity.Integer},
                        c : {type : affinity.Integer}
                    }),
                    [
                        new affinity.Tuple({a : 1, b : 2, c : 3}),
                        new affinity.Tuple({a : 1, b : 2, c : 4}),
                        new affinity.Tuple({a : 1, b : 2, c : 5}),
                        new affinity.Tuple({a : 1, b : 2, c : 6})
                    ]
                );

                should(function(){
                    var rel3 = new affinity.Rename({d : 'a'});
                    rel3.header();
                    rel3.body();
                }).throw();

                done();

            });

        });

    });

});