var affinity = require('./../../../index.js');
var should = require('should');

describe('Join class', function(){

    describe('Join#constructor', function(){

        describe('When given two relations with headers that have attributes in common', function(){

            it('Should result in the union of these headers', function(done){

                var rel1 = new affinity.Relation([
                    {a : {type : affinity.Integer}},
                    {b : {type : affinity.Integer}},
                    {c : {type : affinity.Integer}}
                ]);

                var rel2 = new affinity.Relation([
                    {b : {type : affinity.Integer}},
                    {c : {type : affinity.Integer}},
                    {d : {type : affinity.Integer}}
                ]);

                var rel3 = rel1.join(rel2);

                rel3.header().attributes().should.be.an.Array.and.have.length(4);

                rel3.print();

                done();



            })

        });

        describe('When given two relations no common attributes', function(){

            it('Should result in the union of these headers', function(done){

                var rel1 = new affinity.Relation([
                    {a : {type : affinity.Integer}},
                    {b : {type : affinity.Integer}},
                    {c : {type : affinity.Integer}}
                ]);

                var rel2 = new affinity.Relation([
                    {d : {type : affinity.Integer}},
                    {e : {type : affinity.Integer}},
                    {f : {type : affinity.Integer}}
                ]);

                var rel3 = rel1.join(rel2);

                rel3.header().attributes().should.be.an.Array.and.have.length(6);

                rel3.print();

                done();

            })

        });

        describe('When given two relations that have common attribute names but of different type', function(){


            it('Should throw', function(done){


                var rel1 = new affinity.Relation([
                    {a : {type : affinity.Integer}},
                    {b : {type : affinity.Integer}},
                    {c : {type : affinity.Integer}}
                ]);

                var rel2 = new affinity.Relation([
                    {c : {type : affinity.String}},
                    {d : {type : affinity.Integer}},
                    {e : {type : affinity.Integer}}
                ]);

                should(function(){
                    var rel3 = rel1.join(rel2);
                    rel3.compute();
                }).throw();

                done();

            });

        });

    });

    describe('Join#buildTuples', function(){

        describe('When given tuples that have same values for one common attribute', function(){

            it('Should return the combinations of those tuples where there are common attribute values', function(done){

                var rel1 = new affinity.Relation([
                    {firstName : {type : affinity.String}},
                    {lastName : {type : affinity.String}},
                    {deptId : {type : affinity.Integer}}
                ],[
                    ['John', 'Cage', 1],
                    ['U', '2', 2],
                    ['Lady', 'Gaga', 2],
                    ['Paul', 'McCartney', 3],
                    ['Django', 'Reinhart', 3],
                ]);

                var rel2 = new affinity.Relation([
                    {deptId : {type : affinity.Integer}},
                    {deptName : {type : affinity.String}}
                ],[
                    [1, 'Doodles'],
                    [2, 'Gingles']
                ]);

                var rel3 = rel1.join(rel2);

                rel3.elements().should.be.an.Array.and.have.length(3);

                rel3.print();

                done();

            });

        });

        describe('When given tuples that have same values for more than one common attribute', function(){

            it('Should return the combinations of those tuples where there are common attribute values', function(done){

                var rel1 = new affinity.Relation([
                    {firstName : {type : affinity.String}},
                    {lastName : {type : affinity.String}},
                    {deptId : {type : affinity.Integer}}
                ],[
                    ['John', 'Cage', 1],
                    ['U', '2', 2],
                    ['Lady', 'Gaga', 2],
                    ['Paul', 'McCartney', 3],
                    ['Django', 'Reinhart', 3],
                ]);

                var rel2 = new affinity.Relation([
                    {firstName : {type : affinity.String}},
                    {lastName : {type : affinity.String}},
                    {category : {type : affinity.String}}
                ],[
                    ['John', 'Cage', 'Doodles'],
                    ['John', 'Cage', 'Bimbles'],
                    ['Paul', 'McCartney', 'Dandiddles']
                ]);

                var rel3 = rel1.join(rel2);

                rel3.body().should.be.an.Array.and.have.length(3);

                rel3.print();

                done();

            });

        });

        describe('When given tuples that have no common attribute', function(){

            it('Should return a cross product', function(done){

                var rel1 = new affinity.Relation([
                    {a : {type : affinity.Integer}},
                    {b : {type : affinity.Integer}},
                    {c : {type : affinity.Integer}}
                ],[
                    [1, 1, 3],
                    [2, 2, 3],
                    [3, 3, 2],
                    [4, 4, 2],
                    [5, 5, 2]
                ]);

                var rel2 = new affinity.Relation([
                    {d : {type : affinity.Integer}},
                    {e : {type : affinity.Integer}}
                ],[
                    [1, 3],
                    [2, 3],
                    [3, 2]
                ]);

                var rel3 = rel1.join(rel2);

                var crossProduct = rel1.product(rel2);

                rel3.equal(crossProduct).should.be.true;

                rel3.print();

                done();

            });

        });

        describe('When given tuples that have all common attribute', function(){

            it('Should return an intersection', function(done){

                var rel1 = new affinity.Relation([
                    {a : {type : affinity.Integer}},
                    {b : {type : affinity.Integer}},
                    {c : {type : affinity.Integer}}
                ],[
                    [1, 1, 3],
                    [2, 2, 3],
                    [3, 3, 2],
                    [4, 4, 2],
                    [5, 5, 2]
                ]);

                var rel2 = new affinity.Relation([
                    {a : {type : affinity.Integer}},
                    {b : {type : affinity.Integer}},
                    {c : {type : affinity.Integer}}
                ],[
                    [1, 1, 3],
                    [2, 2, 3],
                    [3, 3, 2]
                ]);

                var rel3 = rel1.join(rel2);

                var intersection = rel1.intersect(rel2);

                rel3.equal(intersection).should.be.true;

                rel3.print();

                done();

            });

        });

    });

});