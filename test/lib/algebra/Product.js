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
    {alive: {type: affinity.Boolean}},
    {animal: {type: affinity.String}}
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

describe('Product Class', function () {

    describe('When given two relations that have no attributes in common', function () {

        it('Should return a relation with all the combinations of tuples contained in the two tables', function (done) {

            var product = employees.product(pets);

            product.count().should.be.equal(employees.count() * pets.count());

            product.header().count().should.be.equal(employees.header().count() + pets.header().count());

            debug.reldump.debug(product.toString());

            done();

        });

        it('Should return relation A if relation B is TABLE_DEE', function (done) {

            var product = employees.product(affinity.TABLE_DEE);

            product.equal(product).should.be.equal(true);

            debug.reldump.debug(product.toString());

            done();

        });

        it('Should return empty relation A if relation B is TABLE_DUM', function (done) {

            var product = employees.product(affinity.TABLE_DUM);

            product.header().equal(employees.header());

            product.count().should.be.equal(0);

            debug.reldump.debug(product.toString());

            done();

        });

    });

    describe('When provided with relations that have attributes in common', function () {

        it('Should throw if one of the attribute name is the same', function (done) {

            should(function () {
                var joined = employees.product(depts).compute();
            }).throw();

            done();

        });

        it('Should throw if all the attributes are the same', function (done) {

            should(function () {
                var joined = employees.product(employees).compute();
            }).throw();

            done();

        });

        it('Should throw if A and B have an attribute name in common but of different type', function (done) {

            should(function () {
                var joined = employees.product(employees_changed_attribute).compute();
            }).throw();

            done();

        });

    });

    describe('When provided with invalid arguments', function () {

        it('Should throw if relation A is not specified', function (done) {

            should(function () {
                var joined = affinity.Product(undefined, employees);
            }).throw();

            done();

        });

        it('Should throw if relation B is not specified', function (done) {

            should(function () {
                var joined = affinity.Product(employees, undefined);
            }).throw();

            done();

        });

    });

});