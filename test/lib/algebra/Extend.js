var affinity = require('./../../../index.js');
var should = require('should');
var debug = require('./../../../lib/affinity/helpers/debug');
var _ = require('lodash');

var relation = new affinity.Relation([
    {born: { type: affinity.Integer}},
    {died: { type: affinity.Integer}}
], [
    [1920, 1945],
    [1920, 1952],
    [1950, 2010],
    [1800, 1860]
]);

var relation2 = new affinity.Relation([
    {born: { type: affinity.Date}}
], [
    [new Date(1945,4,10)],
    [new Date(1920,2,23)],
    [new Date(1920,8,2)],
    [new Date(1820,10,14)]
]);

var born = relation.get('born');
var died = relation.get('died');

var born2 = relation2.get('born');

describe('Extend Class', function () {

    describe('When passing only one attribute to extend', function () {

        it('Should be able to extend the relation if the equation refers to an existing field', function (done) {

            var extended = relation2.extend([
                {day: born2.dayOfMonth()},
                {month: born2.month()},
            ]).compute();

            debug.reldump.debug(extended.toString());

            done();

        });

        it('Should throw if the equation refers to a non existing field', function (done) {

            should(function () {
                relation.extend([
                    {lived: relation.get('hello').minus(born)}
                ]).compute()
            }).throw();

            done();

        });

        it('Should throw if the attribute to add has the same name as an attribute which already exists', function (done) {

            should(function () {

                relation.extend([
                    {born: born.minus(died)}
                ]).compute();

            }).throw();

            done();

        });

    });

    describe('When passing multiple attributes', function () {

        it('Should be able to create multiple extended attributes if they refer to existing ones', function (done) {

            var result = relation.extend([
                {lived: died.minus(born)},
                {since: affinity.minus(2014, died)}
            ]);

            debug.reldump.debug(result.toString());

            done();

        });

        it('Should be able to create multiple extended values even if they refer to a previously declared attribute in the sequence', function (done) {

            var extended = relation.extend([
                {lived: died.minus(born)},
                {wouldBeBorn: affinity.minus(2014, affinity.value(relation, 'lived'))}
            ]);

            debug.reldump.debug(extended.toString());

            done();

        });

        it('Should throw if one of the expressions refer to a non-existing attribute', function (done) {

            should(function () {
                var extended = relation.extend([
                    {lived: died.minus(born)},
                    {wouldBeBorn: affinity.minus(2014, relation.get('unexisting'))}
                ]).compute();
            }).throw();

            done();

        });

        it('Should throw if one of the expressions refer to another expression that is further in the sequence', function (done) {

            should(function () {

                var extended = relation.extend([
                    {wouldBeBorn: affinity.minus(2014, affinity.value(relation, 'lived'))},
                    {lived: died.minus(born)}
                ]).compute();

            }).throw();

            done();

        });

        it('Should be able to extend when passing only an attribute (copying another attribute)', function(done){

            var extended = relation.extend([
                {copy : relation.get('born')}
            ]);

            extended.print();

            done();

        });
    });

    describe('When passing invalid attributes', function () {

        it('Should throw if there are no expressions defined in the operation', function (done) {

            should(function () {
                var extended = relation.extend([]).compute();
            }).throw();

            done();

        });

        it('Should throw if expressions are of the wrong type', function (done) {

            should(function () {
                var extended = relation.extend([
                    {wouldBeBorn: 'hello there!'},
                    {lived: died.minus(born)}
                ]).compute();
            }).throw();

            done();

        });

        it('Should throw if the relation is not specified', function (done) {

            should(function () {
                var extended = new affinity.Extend(null, [
                    {wouldBeBorn: 'hello there!'},
                    {lived: died.minus(born)}
                ]).compute();
            }).throw();

            done();

        });

    });

});