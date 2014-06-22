var affinity = require('./../../../index.js');
var should = require('should');
var _ = require('lodash');
var debug = require('./../../../lib/helpers/debug');

var relationA = new affinity.Relation([
    { firstName: { type: affinity.String} },
    { lastName: { type: affinity.String }},
    { age: { type: affinity.Integer }}
], [
    ['Maybelline', 'Durocher', 23],
    ['Danella', 'Barbara', 23],
    ['Daniel', 'Bandy', 87],
    ['Bobo', 'Dada', 34]
]);

var relation1 = new affinity.Relation([
    { id: { type: affinity.Integer} }
], [
    [ 1 ],
    [ 2 ],
    [ 3 ]
]);


describe('Group class', function () {

    describe('When provided with one grouping argument', function () {

        it('Should be able to do the grouping for that attribute', function (done) {

            var grouped = relationA.group('fn', ['firstName']);

            grouped.each(function (tuple) {

                var subRelation = tuple.get('fn');

                (subRelation instanceof affinity.Relation).should.be.equal(true);

                var subHeader = subRelation.header();

                (subHeader.get('firstName') instanceof affinity.Attribute).should.be.equal(true);

            });

            grouped.count().should.be.equal(4);

            debug.reldump.debug(grouped.toString());

            done();

        });

        it('Should be able to group even if the argument is the only attribute in the header', function (done) {

            var grouped = relation1.group('newId', ['id']);

            grouped.header().count().should.be.equal(1);

            grouped.each(function (tuple) {

                var subRelation = tuple.get('newId');

                (subRelation instanceof affinity.Relation).should.be.equal(true);

                subRelation.header().count().should.be.equal(1);

                (subRelation.get('id') instanceof affinity.Attribute).should.be.equal(true);

            });

            debug.reldump.debug(grouped.toString());

            done();

        });

        it('Should throw if the specified argument do not exist in the header', function (done) {

            should(function () {
                var grouped = relationA.group('status', ['status']).compute();
            }).throw();

            done();

        });

        it('Should be able to group an already grouped attribute', function (done) {

            var grouped = relationA.group('name', ['firstName', 'lastName']);

            var grouped2 = grouped.group('nameBis', ['name']);

            var groupHeader = grouped2.header();

            (groupHeader.get('nameBis') instanceof affinity.Attribute).should.be.equal(true)

            grouped2.each(function (tuple) {

                var subRelation = tuple.get('nameBis');

                (subRelation instanceof affinity.Relation).should.be.equal(true);

                (subRelation.get('name') instanceof affinity.Attribute).should.be.equal(true);

            });

            debug.reldump.debug(grouped2.toString());

            done();

        });

    });

    describe('When passing multiple grouping attributes', function () {

        it('Should be able to do a grouping of these attributes', function (done) {

            var grouped = relationA.group('name', ['firstName', 'lastName']);

            (grouped.header().get('name') instanceof affinity.Attribute).should.be.equal(true);

            grouped.each(function (tuple) {

                var subRelation = tuple.get('name');
                (subRelation instanceof affinity.Relation).should.be.equal(true);

                (subRelation.header().get('firstName') instanceof affinity.Attribute).should.be.equal(true);
                (subRelation.header().get('lastName') instanceof affinity.Attribute).should.be.equal(true);

                subRelation.each(function (subTuple) {

                    _.isString(subTuple.get('firstName')).should.be.equal(true);
                    _.isString(subTuple.get('lastName')).should.be.equal(true);

                })

            });

            debug.reldump.debug(grouped.toString());

            done();

        });

        it('Should throw if one of the attributes does not exist in the header', function (done) {

            should(function () {
                var grouped = relationA.group('name', ['firstName', 'unexisting']).compute();
            }).throw();

            done();

        });

        it('Should be able to group a relation even if all the attributes are grouped', function (done) {

            var grouped = relationA.group('total', ['age', 'firstName', 'lastName']);

            (grouped.header().get('total') instanceof affinity.Attribute).should.be.equal(true);

            grouped.each(function (tuple) {

                var subRelation = tuple.get('total');

                (subRelation instanceof affinity.Relation).should.be.equal(true);

                (subRelation.header().get('firstName') instanceof affinity.Attribute).should.be.equal(true);
                (subRelation.header().get('lastName') instanceof affinity.Attribute).should.be.equal(true);
                (subRelation.header().get('age') instanceof affinity.Attribute).should.be.equal(true);

            });

            debug.reldump.debug(grouped.toString());

            done();

        });

        it('Should be able to group a relation even if it already contains grouped attributes', function (done) {

            var groupedA = relationA.group('fn', ['firstName']);
            var groupedB = groupedA.group('ln', ['lastName']);

            var grouped = groupedB.group('total', ['fn', 'ln', 'age']);

            (grouped.header().get('total') instanceof affinity.Attribute).should.be.equal(true);

            grouped.each(function (tuple) {

                var subRelation = tuple.get('total');

                subRelation.each(function (subTuple) {

                    var subRelationA = subTuple.get('fn');
                    var subRelationB = subTuple.get('ln');

                    (subRelationA instanceof affinity.Relation).should.be.equal(true);
                    (subRelationB instanceof affinity.Relation).should.be.equal(true);

                })

            });

            debug.reldump.debug(grouped.toString());

            done();

        });

    });

});