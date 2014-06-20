var affinity = require('./../../../index.js');
var should = require('should');

describe('Restrict class', function(){

    describe('Restrict#constructor', function(){

        describe('When applying a simple restrict condition', function(){

            it('Should return only tuples where the condition holds', function(done){

                var rel1 = new affinity.Relation([
                    {a: { type: affinity.Integer}},
                    {b: { type: affinity.Integer}},
                    {c: { type: affinity.Integer}}
                ], [
                    [1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 7]
                ]);

                var a = rel1.get('a');
                var b = rel1.get('b');
                var c = rel1.get('c');

                var rel2 = rel1.restrict(a.equals(1));

                rel2.compute();

                rel2.exists({a : 1, b : 2, c : 3}).should.be.true;
                rel2.exists({a : 4, b : 5, c : 6}).should.not.be.true;
                rel2.exists({a : 7, b : 8, c : 7}).should.not.be.true;

                rel2.print();

                done();

            });

        });

        describe('When applying a restrict condition with an Or', function(){

            it('Should return only tuples where the condition holds', function(done){

                var rel1 = new affinity.Relation([
                    {a: { type: affinity.Integer}},
                    {b: { type: affinity.Integer}},
                    {c: { type: affinity.Integer}}
                ], [
                    [1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 7]
                ]);

                var a = rel1.get('a');
                var b = rel1.get('b');
                var c = rel1.get('c');

                var rel2 = rel1.restrict(a.equals(1).or(a.equals(c)));

                rel2.compute();

                rel2.exists({a : 1, b : 2, c : 3}).should.be.true;
                rel2.exists({a : 4, b : 5, c : 6}).should.not.be.true;
                rel2.exists({a : 7, b : 8, c : 7}).should.be.true;

                rel2.print();

                done();

            });

        });

        describe('When applying a restrict condition with an And', function(){

            it('Should return only tuples where the condition holds', function(done){

                var rel1 = new affinity.Relation([
                    {a: { type: affinity.Integer}},
                    {b: { type: affinity.Integer}},
                    {c: { type: affinity.Integer}}
                ], [
                    [1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 7]
                ]);

                var a = rel1.get('a');
                var b = rel1.get('b');
                var c = rel1.get('c');

                var rel2 = rel1.restrict(a.equals(1).and(c.equals(3)));

                rel2.compute();

                rel2.exists({a : 1, b : 2, c : 3}).should.be.true;
                rel2.exists({a : 4, b : 5, c : 6}).should.not.be.true;
                rel2.exists({a : 7, b : 8, c : 7}).should.not.be.true;

                rel2.print();

                done();

            });

        });

        describe('When applying a restrict condition with a Not', function(){

            it('Should return only tuples where the condition holds', function(done){

                var rel1 = new affinity.Relation([
                    {a: { type: affinity.Integer}},
                    {b: { type: affinity.Integer}},
                    {c: { type: affinity.Integer}}
                ], [
                    [1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 7]
                ]);

                var a = rel1.get('a');
                var b = rel1.get('b');
                var c = rel1.get('c');

                var rel2 = rel1.restrict(a.not().equals(1));

                rel2.compute();

                rel2.exists({a : 1, b : 2, c : 3}).should.be.not.true;
                rel2.exists({a : 4, b : 5, c : 6}).should.be.true;
                rel2.exists({a : 7, b : 8, c : 7}).should.be.true;

                rel2.print();

                done();

            });

        });

        describe('When applying a restrict condition with Nots and And', function(){

            it('Should return only tuples where the condition holds', function(done){

                var rel1 = new affinity.Relation([
                    {a: { type: affinity.Integer}},
                    {b: { type: affinity.Integer}},
                    {c: { type: affinity.Integer}}
                ], [
                    [1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 7]
                ]);

                var a = rel1.get('a');
                var b = rel1.get('b');
                var c = rel1.get('c');

                var rel2 = rel1.restrict(a.not().equals(1).and(b.not().equals(5)));

                rel2.compute();

                rel2.exists({a : 1, b : 2, c : 3}).should.not.be.true;
                rel2.exists({a : 4, b : 5, c : 6}).should.not.be.true;
                rel2.exists({a : 7, b : 8, c : 7}).should.be.true;

                rel2.print();

                done();

            });

        });

        describe('When applying multiple nots and non-nots on the same attribute', function(){

            it('Should return only tuples where the condition holds', function(done){

                var rel1 = new affinity.Relation([
                    {a: { type: affinity.Integer}},
                    {b: { type: affinity.Integer}},
                    {c: { type: affinity.Integer}}
                ], [
                    [1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 7]
                ]);

                var a = rel1.get('a');
                var b = rel1.get('b');
                var c = rel1.get('c');

                var rel2 = rel1.restrict(a.not().equals(1).and(a.equals(4)));

                rel2.compute();

                rel2.exists({a : 1, b : 2, c : 3}).should.not.be.true;
                rel2.exists({a : 4, b : 5, c : 6}).should.be.true;
                rel2.exists({a : 7, b : 8, c : 7}).should.not.be.true;

                rel2.print();

                done();

            });

        });

        describe('When giving super complex predicates', function(){

            it.only('Should return only tuples where the condition holds', function(done){

                var rel1 = new affinity.Relation([
                    {id: { type: affinity.Integer}},
                    {firstName: { type: affinity.String}},
                    {lastName: { type: affinity.String}},
                    {alive: { type: affinity.Boolean}},
                    {age: { type: affinity.Integer}}
                ], [
                    [0, 'John', 'Doe', true, 34],
                    [1, 'Mary', 'Poppins', false, 95],
                    [2, 'Mark', 'Clinton', true, 2],
                    [3, 'Hopty', 'Duddy', false, 10],
                    [4, 'Hootenanny', 'Wilson', false, 23],
                    [5, 'Jesus', 'Christ', true, 2014],
                    [6, 'Voo-Doo', 'Nilson', false, 12]
                ]);

                var id = rel1.get('id');
                var firstName = rel1.get('firstName');
                var lastName = rel1.get('lastName');
                var alive = rel1.get('alive');
                var age = rel1.get('age');

                var rel2 = rel1.restrict(id.equals(0).or(firstName.equals('Mary')).or(lastName.equals('Clinton')).or(age.abs().equals(10)));

                rel2.exists({id : 0, firstName : 'John', lastName : 'Doe', alive : true, age : 34}).should.be.true;
                rel2.exists({id : 1, firstName : 'Mary', lastName : 'Poppins', alive : false, age : 95}).should.be.true;
                rel2.exists({id : 2, firstName : 'Mark', lastName : 'Clinton', alive : true, age : 2}).should.be.true;
                rel2.exists({id : 3, firstName : 'Hopty', lastName : 'Duddy', alive : false, age : 10}).should.be.true;

                var rel3 = rel1.restrict(id.equals(0).and(
                    firstName.equals('John').and(
                        lastName.equals('Doe').and(
                            alive.equals(true).and(
                                age.equals(34)
                    )))));

                rel3.count().should.be.equal(1);

                rel2.print();

                done();

            });

        });

    });

});
/**

 age.abs().equals(10);

 Attribute -> abs()

 Absolute(Attribute) -> equals()



 */