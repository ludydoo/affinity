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
], [

]);

var id = employees.get('id');
var firstName = employees.get('firstName');
var lastName = employees.get('lastName');
var dept = employees.get('dept');

describe('Restrict class', function () {

    describe('When given a predicate linking to a single attribute', function () {

        it('Should be able to perform the restrict operation', function (done) {

            var restricted = employees.restrict(dept.eq(1));

            restricted.count().should.be.equal(2);

            debug.reldump.debug(restricted.toString());

            done();

        });

        it('Should throw if restrict operation links to an undefined attribute', function (done) {

            should(function () {
                var restricted = employees.restrict(employees.get('unexisting').eq(1)).compute();
            }).throw();

            done();

        });

        it('Should return the whole relation if the expression is always true', function (done) {

            var restricted = employees.restrict(affinity.eq(true, true));

            restricted.equal(employees).should.be.equal(true);

            debug.reldump.debug(restricted.toString());

            done();

        });

        it('Should return an empty relation if the expression is always false', function (done) {

            var restricted = employees.restrict(affinity.eq(true, false));

            restricted.header().equal(employees.header()).should.be.equal(true);

            restricted.count().should.be.equal(0);

            debug.reldump.debug(restricted.toString());

            done();

        });

    });

    describe('When links to multiple attributes exists', function () {

        it('Should be able to do calculations with these attributes', function (done) {

            var restricted = employees.restrict(id.eq(1).and(dept.eq(1)));

            restricted.count().should.be.equal(1);

            restricted.header().equal(employees.header()).should.be.equal(true);

            debug.reldump.debug(restricted.toString());

            done();

        });

        it('Should throw if there exists links to unexisting attributes', function (done) {

            should(function () {
                var restricted = employees.restrict(employees.get('hey').eq(2).and(id.eq(1))).compute();
            }).throw();

            done();

        });

    });

    describe('When the expression is a user defined function', function () {

        it('Should be able to evaluate the user function', function (done) {

            var restricted = employees.restrict(function (tuple) {

                (tuple instanceof affinity.Tuple).should.be.equal(true);

                return (tuple.get('id') === 1);

            });

            restricted.count().should.be.equal(1);

            debug.reldump.debug(restricted.toString());

            done();

        });

    });

});