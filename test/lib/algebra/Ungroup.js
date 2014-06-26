var affinity = require('./../../../index.js');
var should = require('should');
var debug = require('./../../../lib/affinity/helpers/debug');

describe('Ungroup Class', function () {

    describe('Ungroup#constructor', function () {

        describe('When provided one ungrouping attribute', function () {

            it('Should be able to do the ungrouping', function (done) {


                var relationA = new affinity.Relation([
                    {firstName: {type: affinity.String}},
                    {lastName: {type: affinity.String}},
                    {age: {type: affinity.Integer}}
                ], [
                    ['Maybelline', 'Durocher', 23],
                    ['Danella', 'Barbara', 23],
                    ['Daniel', 'Bandy', 87],
                    ['Bobo', 'Dada', 34]
                ]);

                var relationB = relationA.group('name', ['firstName', 'lastName']).compute();

                var relationC = relationB.ungroup(['name']).compute();

                relationC.equal(relationA).should.be.equal(true);

                debug.reldump.debug(relationC.toString());

                done();

            });

        });

        describe('When ungrouping a grouped relation that has no non grouped header', function () {

            it('Should be able to do a grouping', function (done) {


                var relationA = new affinity.Relation([
                    {firstName: {type: affinity.String}},
                    {lastName: {type: affinity.String}},
                    {age: {type: affinity.Integer}}
                ], [
                    ['Maybelline', 'Durocher', 23],
                    ['Danella', 'Barbara', 23],
                    ['Daniel', 'Bandy', 87],
                    ['Bobo', 'Dada', 34]
                ]);

                var relationB = relationA.group('name', ['firstName', 'lastName', 'age']).compute();

                debug.reldump.debug(relationB.toString());

                relationB.ungroup(['name']).equal(relationA).should.be.true;


                done();

            });

        });

        describe('When ungrouping a nested grouped relation that has no non grouped header', function () {

            it('Should be able to do a grouping', function (done) {


                var relationA = new affinity.Relation([
                    {firstName: {type: affinity.String}},
                    {lastName: {type: affinity.String}},
                    {age: {type: affinity.Integer}}
                ], [
                    ['Maybelline', 'Durocher', 23],
                    ['Danella', 'Barbara', 23],
                    ['Daniel', 'Bandy', 87],
                    ['Bobo', 'Dada', 34]
                ]);

                var relationB = relationA.group('fn', ['firstName']).compute();

                var relationC = relationB.group('name', ['fn', 'lastName']).compute();

                var relationD = relationC.ungroup(['name']).compute();

                debug.reldump.debug(relationD.toString());

                var relationE = relationD.ungroup(['fn']).compute();

                debug.reldump.debug(relationE.toString());


                done();

            });

        })

    })

});