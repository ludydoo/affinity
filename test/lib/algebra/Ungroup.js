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

        });

        describe('When ungrouping a grouped relation that has no non grouped header', function(){

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

                var relationB = relationA.group('name', ['firstName', 'lastName', 'age']).compute();


                relationB.ungroup(['name']).equal(relationA).should.be.true;

                done();

            });

        });

        describe('When ungrouping a nested grouped relation that has no non grouped header', function(){

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

                var relationB = relationA.group('fn', ['firstName']).compute();

                //relationB.print();

                var relationC = relationB.group('name', ['fn', 'lastName']).compute();

                //relationC.print();

                var relationD = relationC.ungroup(['name']).compute();

                relationD.print();

                var relationE = relationD.ungroup(['fn']).compute();

                //relationE.print();


                done();

            });

        })

    })

});