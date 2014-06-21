var affinity = require('./../../../index.js');
var should = require('should');

describe.only('SemiJoin class', function(){

    describe('SemiJoin#constructor', function(){

        describe('When given two relations with headers that have attributes in common', function(){

            it('The result relation header should be equal to the relation A header', function(done){

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

                var rel3 = rel1.sjoin(rel2);

                rel3.header().count().should.be.equal(3);

                rel3.header().equal(rel1.header()).should.be.true;

                rel3.print();

                done();

            })

        });

        describe('When given two relations no common attributes', function(){

            it('The result relation header should be equal to the relation A header', function(done){

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

                var rel3 = rel1.sjoin(rel2);

                rel3.header().count().should.be.equal(3);

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
                    var rel3 = rel1.sjoin(rel2);
                    rel3.compute();
                }).throw();

                done();

            });

        });

    });

    describe('SemiJoin#buildTuples', function(){

        describe('When given tuples that have same values for one common attribute', function(){

            it('Should result in the tuples of A that have a counterpart in B', function(done){

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

                var result = new affinity.Relation([
                    {firstName : {type : affinity.String}},
                    {lastName : {type : affinity.String}},
                    {deptId : {type : affinity.Integer}}
                ],[
                    ['John', 'Cage', 1],
                    ['U', '2', 2],
                    ['Lady', 'Gaga', 2]
                ]);

                var rel3 = rel1.sjoin(rel2);

                rel3.equal(result).should.be.true;

                rel3.print();

                done();

            });

        });

        describe('When given tuples that have same values for more than one common attribute', function(){

            it('Should result in the tuples of A that have a counterpart in B', function(done){

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

                var result = new affinity.Relation([
                    {firstName : {type : affinity.String}},
                    {lastName : {type : affinity.String}},
                    {deptId : {type : affinity.Integer}}
                ],[
                    ['John', 'Cage', 1],
                    ['Paul', 'McCartney', 3]
                ]);

                var rel3 = rel1.sjoin(rel2);

                rel3.equal(result).should.be.true;

                rel3.print();

                done();

            });

        });

        describe('When given tuples that have no common attribute', function(){

            it('Should return an empty relation with the header of A', function(done){

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

                var result = new affinity.Relation([
                    {a : {type : affinity.Integer}},
                    {b : {type : affinity.Integer}},
                    {c : {type : affinity.Integer}}
                ]);

                var rel3 = rel1.sjoin(rel2);

                rel3.equal(result).should.be.true;

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

                var result = new affinity.Relation([
                    {a : {type : affinity.Integer}},
                    {b : {type : affinity.Integer}},
                    {c : {type : affinity.Integer}}
                ],[
                    [1, 1, 3],
                    [2, 2, 3],
                    [3, 3, 2]
                ]);

                var rel3 = rel1.sjoin(rel2);

                rel3.equal(result).should.be.true;

                rel3.print();

                done();

            });

        });

    });

});