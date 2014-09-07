var affinity = require('./../../../index.js');
var should = require('should')
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

var employees_2 = new affinity.Relation([
    {id: {type: affinity.Integer}},
    {firstName: {type: affinity.String}},
    {lastName: {type: affinity.String}},
    {dept: {type: affinity.Integer}}
], [

    [1, 'Mary', 'Louise', 1],
    [2, 'Nicolas', 'McDibbins', 2],
    [3, 'Nancy', 'Bibble', 2],
    [4, 'Mark', 'Clinton', 3]

]);

var employees_changed_attribute = new affinity.Relation([
    {id: {type: affinity.Integer}},
    {firstName: {type: affinity.String}},
    {lastName: {type: affinity.String}},
    {dept: {type: affinity.String}}
], [

    [1, 'Mary', 'Louise', "1"],
    [2, 'Nicolas', 'McDibbins', "1"],
    [3, 'Nancy', 'Bibble', "1"],
    [4, 'Mark', 'Clinton', "1"]

]);

var scores = new affinity.Relation([
    {firstName: {type: affinity.String}},
    {lastName: {type: affinity.String}},
    {score: {type: affinity.Integer}}
], [
    ['Mary', 'Louise', 56],
    ['Nicolas', 'McDibbins', 87],
    ['Mark', 'Clinton', 20],
    ['Boy', 'Black', 12],
    ['Gingo', 'Binder', 12]
]);

var depts = new affinity.Relation([
    {dept: {type: affinity.Integer}},
    {deptName: {type: affinity.Integer}},
    {opened: {type: affinity.Boolean}}
], [
    [1, 'Communication', true],
    [2, 'Sales', true],
    [3, 'R&D', true],
    [4, 'Snazzles', false],
    [5, 'Dizzles', false]
]);

var depts2 = new affinity.Relation([
    {deptName: {type: affinity.String}},
    {dept: {type: affinity.String}},
    {opened: {type: affinity.Boolean}}
]);

var pets = new affinity.Relation([
    {name: {type: affinity.String}},
    {animal: {type: affinity.String}},
    {alive: {type: affinity.Boolean}}
], [
    ['Tommy 1', 'Dog', false],
    ['Tommy 2', 'Dog', false],
    ['Zoé', 'Dog', true],
    ['Max', 'Dog', false],
    ['Maurice', 'Cat', true],
    ['Chat', 'Cat', true],
    ['Bernard', 'Cat', true],
    ['Henri', 'Hamster', false]
]);

var animals = new affinity.Relation([
    {animal: {type: affinity.String}},
    {legNumber: {type: affinity.Integer}},
    {height: {type: affinity.Integer}}
], [
    ['Dog', 4, 60],
    ['Cat', 4, 30],
    ['Hamster', 4, 8],
    ['Bird', 2, 15],
    ['Bear', 4, 120],
    ['Giraffe', 2, 800]
]);

describe('Join class', function () {

    describe('When given two relations that have attribute in common', function () {

        it('Should be able to join the attributes if there are only one attribute in common', function (done) {

            var joined = employees.join(depts).compute();

            joined.header().length().should.be.equal(employees.header().length() + depts.header().length() - 1);

            joined.length().should.be.equal(7);

            var resultHeader = employees.header().clone().copy(depts.header(), 'dept', true);

            joined.header().equal(resultHeader).should.be.equal(true);

            debug.reldump.debug(joined.toString());

            done();

        });

        it('Should be able to join the relations if they have more than one attributes in common', function (done) {

            var joined = employees.join(scores);

            joined.header().length().should.be.equal(employees.header().length() + scores.header().length() - 2);

            var resultHeader = employees.header().clone().copy(scores.header(), ['firstName', 'lastName'], true);

            joined.header().equal(resultHeader).should.be.equal(true);

            debug.reldump.debug(joined.toString());

            done();

        });

        it('Should be able to join the relations if they have all attributes in common', function (done) {

            var joined = employees.join(employees_2);

            joined.header().equal(employees.header()).should.be.equal(true);

            joined.header().length().should.be.equal(employees_2.length());

            debug.reldump.debug(joined.toString());

            done();

        });

        it('Should throw if an attribute in A has the same name in B but not of the same type', function (done) {

            should(function () {
                var joined = employees.join(employees_changed_attribute).compute();
            }).throw();

            done();

        });

    });

    describe('When given relations that have no attributes in common', function () {

        it('Should return the cross product of A and B', function (done) {

            var joined = employees.join(pets);

            joined.equal(employees.product(pets)).should.be.equal(true);

            debug.reldump.debug(joined.toString());

            done();

        });

        it('Should return relationA if it is joined by TABLE_DEE', function (done) {

            var joined = employees.join(affinity.TABLE_DEE);

            joined.equal(employees).should.be.equal(true);

            debug.reldump.debug(joined.toString());

            done();

        });

        it('Should return empty relationA if it is joined by TABLE_DUM', function (done) {

            var joined = employees.join(affinity.TABLE_DUM);

            joined.header().equal(employees.header()).should.be.equal(true);

            joined.length().should.be.equal(0);

            debug.reldump.debug(joined.toString());

            done();

        });

    });

    describe('When given invalid arguments', function () {

        it('Should throw if relation A is not specified', function (done) {

            should(function () {
                var joined = new affinity.Join(undefined, employees).compute();
            }).throw();

            done();

        });

        it('Should throw if relation B is not specified', function (done) {

            should(function () {
                var joined = new affinity.Join(employees, undefined).compute();
            }).throw();

            done();

        });

    });

});