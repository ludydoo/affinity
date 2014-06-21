var affinity = require('./../../../index.js');
var should = require('should');

describe('Group Class', function(){

    describe('Group#constructor', function(){

        describe('When provided one grouping attributes', function(){

            it('Should be able to do a grouping', function(done){


                var relationA = new affinity.Relation([
                    {firstName : {type : affinity.String}},
                    {lastName : {type : affinity.String}},
                    {age : {type : affinity.Integer}}
                ],[
                    ['Maybelline', 'Durocher', 23],
                    ['Danella', 'Barbara', 23],
                    ['Daniel', 'Bandy', 87],
                    ['Bobo', 'Dada', 34]
                ]);

                var relationB = relationA.group('name', ['firstName', 'lastName']).compute();

                relationB.header().count().should.be.equal(2);

                relationB.each(function(tuple){
                    (tuple.get('name') instanceof affinity.Relation).should.be.true;
                    tuple.get('name').header().count().should.be.equal(2);
                });

                var testRel = relationA.restrict(relationA.get('age').equals(23)).project(['firstName', 'lastName']).compute();

                relationB.exists({age : 23, name : testRel}).should.be.true;

                relationA.print();
                relationB.print();

                done();

            });

        });

    })

});