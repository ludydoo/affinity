var affinity = require('./../../../index.js');
var should = require('should');

describe('Ungroup Class', function(){

    describe('Ungroup#constructor', function(){

        describe('When provided one ungrouping attribute', function(){

            it('Should be able to do the ungrouping', function(done){


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

                var relationC = relationB.ungroup(['name']).compute();

                relationC.equal(relationA).should.be.true;

                done();

            });

        })

    })

});