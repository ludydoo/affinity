var affinity = require('./../../../index.js');
var should = require('should');
var debug = require('./../../../lib/helpers/debug');

var employees = new affinity.Relation([
    {id: {type: affinity.Integer}},
    {firstName: {type: affinity.String}},
    {lastName: {type: affinity.String}},
    {dept: {type: affinity.Integer}}
], [

    [1, 'Mary', 'Louise', 1],
    [2, 'Nicolas', 'McDibbins', 2],
    [3, 'Nancy', 'Bibble', 2],
    [4, 'Mark', 'Clinton', 3],
    [5, 'Doodle', 'Nibble', 3],
    [6, 'Dong', 'Dong', 1],
    [7, 'Boy', 'Black', 3]

]);

var employees_empty = new affinity.Relation([
    {id: {type: affinity.Integer}},
    {firstName: {type: affinity.String}},
    {lastName: {type: affinity.String}},
    {dept: {type: affinity.Integer}}
]);

describe('Projection Class', function () {

    describe('When provided with one argument', function () {

        it('Should return a copy of the relation with only that attribute specified', function (done) {

            var projected = employees.project(['id']);

            projected.header().count().should.be.equal(1);

            projected.count().should.be.equal(7);

            (projected.header().get('id') instanceof affinity.Attribute).should.be.equal(true);

            debug.reldump.debug(projected.toString());

            done();

        });

        it('Should return a copy of the relation with only the specified attribute, and remove duplicates', function (done) {

            var projected = employees.project(['dept']);

            projected.header().count().should.be.equal(1);

            projected.count().should.be.equal(3);

            debug.reldump.debug(projected.toString());

            done();

        });

        it('Should throw if the attribute does not exist in the header', function (done) {

            should(function () {
                var projected = employees.project(['unexisting']).compute();
            }).throw();

            done();

        });

        it('Should return TABLE_DEE if projecting an empty attribute list of a non-empty relation', function (done) {

            var projected = employees.project([]);

            projected.equal(affinity.TABLE_DEE).should.be.equal(true);

            debug.reldump.debug(projected.toString());

            done();

        });

        it('Should return TABLE_DUM if projecting an empty attribute list of an empty relation', function (done) {

            var projected = employees_empty.project([]);

            projected.equal(affinity.TABLE_DUM).should.be.equal(true);

            debug.reldump.debug(projected.toString());

            done();

        });


    });

    describe('When given multiple attributes to project', function () {

        it('Should return a relation with only specified attributes', function (done) {

            var projected = employees.project(['firstName', 'lastName']);

            projected.header().count().should.be.equal(2);

            projected.count().should.be.equal(7);

            debug.reldump.debug(projected.toString());

            done();

        });

        it('Should return a copy of the relation if all attributes are specified', function (done) {

            var projected = employees.project(['firstName', 'lastName', 'id', 'dept']);

            projected.equal(employees).should.be.equal(true);

            debug.reldump.debug(projected.toString());

            done();

        });

        it('Should throw if one of the specified attributes does not exist', function (done) {

            should(function () {
                var projected = employees.project(['dept', 'unexisting']).compute();
            }).throw();

            done();

        });

        it('Should throw if all of the specified attributes do not exist', function (done) {

            should(function () {
                var projected = employees.project(['shazaam', 'unexisting', 'jazz']).compute();
            }).throw();

            done();

        });

    });

    describe('When invalid arguments are provided', function () {

        it('Should throw if the relation is not specified', function (done) {

            should(function () {
                var projected = new affinity.Projection(undefined, ['id', 'dept']).compute();
            }).throw();

            done();

        });

        it('Should throw if no attribute names are specified', function (done) {

            should(function () {
                var projected = employees.project().compute();
            }).throw();

            done();

        });

    });

});