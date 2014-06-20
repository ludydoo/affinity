var affinity = require('./../../../index.js');
var should = require('should');

describe('Compose Class', function(){

    describe('Compose#constructor', function(){

        describe('When provided two relations with attributes in common', function(){

            it('Should be able to do a compose operator when there is one attribute in common', function(done){


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

                var relationB = new affinity.Relation([
                    {age : {type : affinity.Integer}},
                    {condition : {type : affinity.String}}
                ],[
                    [23, 'Good'],
                    [30, 'Okay'],
                    [34, 'Mediocre'],
                    [99, 'Bad'],
                ]);

                var composed = relationA.compose(relationB);

                composed.header().count().should.be.equal(3);
                composed.count().should.be.equal(3);

                done();


            })

        })

    })

});