var affinity = require('./../../../index.js');
var should = require('should');
var debug = require('./../../../lib/affinity/helpers/debug');

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


var relation1 = new affinity.Relation([
    { id: { type: affinity.Integer} }
], [
    [ 1 ],
    [ 2 ],
    [ 3 ]
]);

var employees_empty = new affinity.Relation([
    {id: {type: affinity.Integer}},
    {firstName: {type: affinity.String}},
    {lastName: {type: affinity.String}},
    {dept: {type: affinity.Integer}}
]);

describe('Rename Class', function () {

    describe('When given only one attribute to rename', function () {

        it('Should be able to rename that attrbute', function (done) {

            var renamed = employees.rename({ firstName: 'fn'});

            (renamed.header().get('fn') instanceof affinity.Attribute).should.be.equal(true);

            renamed.header().count().should.be.equal(4);

            debug.reldump.debug(renamed.toString());

            done();

        });

        it('Should throw if the renamed attribute will overwrite and existing attribute', function (done) {

            should(function () {
                employees.rename({firstName: 'lastName'}).compute();
            }).throw();

            done();

        });

        it('Should throw if the attribute does not exist', function (done) {

            should(function () {
                employees.rename({ unexisting: 'hello'}).compute();
            }).throw();

            done();

        });

        it('Should be able to rename an attribute even if it is the only one in the header', function (done) {

            var renamed = relation1.rename({id: 'newId'});

            renamed.header().count().should.be.equal(1);

            (renamed.header().get('newId') instanceof affinity.Attribute).should.be.equal(true);

            debug.reldump.debug(renamed.toString());

            done();

        });

        it('Should be able to rename an attribute to its own name', function (done) {

            var renamed = employees.rename({firstName: 'firstName'});

            renamed.equal(employees).should.be.equal(true);

            debug.reldump.debug(renamed.toString());

            done();

        });

    });


    describe('When passing multiple renaming attributes', function () {

        it('Should be able to rename all attributes of a header', function (done) {

            var renamed = employees.rename({id: 'newId', firstName: 'newFirstName', lastName: 'newLastName', dept: 'newDept'});

            (renamed.header().get('newId') instanceof affinity.Attribute).should.be.equal(true);
            (renamed.header().get('newFirstName') instanceof affinity.Attribute).should.be.equal(true);
            (renamed.header().get('newLastName') instanceof affinity.Attribute).should.be.equal(true);
            (renamed.header().get('newDept') instanceof affinity.Attribute).should.be.equal(true);

            renamed.header().count().should.be.equal(4);

            var revert = renamed.rename({newId: 'id', newFirstName: 'firstName', newLastName: 'lastName', newDept: 'dept'});

            revert.equal(employees).should.be.equal(true);

            debug.reldump.debug(renamed.toString());

            done();

        });

        it('Should be able to rename part of the attributes of a header', function (done) {

            var renamed = employees.rename({id: 'newId', firstName: 'newFirstName', lastName: 'newLastName'});

            (renamed.header().get('newId') instanceof affinity.Attribute).should.be.equal(true);
            (renamed.header().get('newFirstName') instanceof affinity.Attribute).should.be.equal(true);
            (renamed.header().get('newLastName') instanceof affinity.Attribute).should.be.equal(true);
            (renamed.header().get('dept') instanceof affinity.Attribute).should.be.equal(true);

            renamed.header().count().should.be.equal(4);

            var revert = renamed.rename({newId: 'id', newFirstName: 'firstName', newLastName: 'lastName'});

            revert.equal(employees).should.be.equal(true);

            debug.reldump.debug(renamed.toString());

            done();

        });

        it('Should throw if two renamed attributes would have the same name after the operation', function (done) {

            should(function () {
                var renamed = employees.rename({firstName: 'name', lastName: 'name'}).compute();
            }).throw();

            done();

        });

        it('Should throw if a renamed operation tries to rename another rename operation', function (done) {

            should(function () {
                var renamed = employees.rename({firstName: 'fn', fn: 'firstName'}).compute();
            }).throw();

            done();

        });

    });

});