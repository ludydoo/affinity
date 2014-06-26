var affinity = require('./../../../index.js');
var should = require('should');
var debug = require('./../../../lib/affinity/helpers/debug');

var relation = new affinity.Relation([
    { firstName: { type: affinity.String}},
    { lastName: { type: affinity.String }},
    { id: { type: affinity.Integer }}
], [
    [ 'Lady', 'Mariane', 1 ],
    [ 'Lady', 'Elizabeth', 2 ],
    [ 'Lady', 'Lucy', 3 ],
    [ 'Lady', 'Nelly', 4 ],
    [ 'Lady', 'Bellingtons', 5 ],
    [ 'Lady', 'McDibbins', 6 ],
    [ 'Lady', 'MacDoofles', 7 ],
    [ 'Lady', 'RonBibbles', 8 ]
]);


var relation_4_common = new affinity.Relation([
    { firstName: { type: affinity.String}},
    { lastName: { type: affinity.String }},
    { id: { type: affinity.Integer }}
], [
    [ 'Lady', 'Mariane', 1 ],
    [ 'Lady', 'Elizabeth', 2 ],
    [ 'Lady', 'Lucy', 3 ],
    [ 'Lady', 'Nelly', 4 ],
    [ 'Lady', 'Snizzles', 5 ],
    [ 'Lady', 'Dizzles', 6 ],
    [ 'Lady', 'Giffles', 7 ],
    [ 'Lady', 'Boonels', 8 ]
]);

var relation_subset = new affinity.Relation([
    { firstName: { type: affinity.String}},
    { lastName: { type: affinity.String }},
    { id: { type: affinity.Integer }}
], [
    [ 'Lady', 'Mariane', 1 ],
    [ 'Lady', 'Elizabeth', 2 ],
    [ 'Lady', 'Lucy', 3 ],
    [ 'Lady', 'Nelly', 4 ]
]);

var relation_no_comon = new affinity.Relation([
    { firstName: { type: affinity.String}},
    { lastName: { type: affinity.String }},
    { id: { type: affinity.Integer }}
], [
    [ 'Lady', 'Snizzles', 5 ],
    [ 'Lady', 'Dizzles', 6 ],
    [ 'Lady', 'Giffles', 7 ],
    [ 'Lady', 'Boonels', 8 ]
]);

var relation_non_union_compatible = new affinity.Relation([
    { firstName: { type: affinity.String}},
    { lastName: { type: affinity.String }},
    { id: { type: affinity.String }}
], [
    [ 'Lady', 'Mariane', '1' ],
    [ 'Lady', 'Elizabeth', '2' ],
    [ 'Lady', 'Lucy', '3' ],
    [ 'Lady', 'Nelly', '4' ]
]);

var relation_non_union_compatible2 = new affinity.Relation([
    { firstName: { type: affinity.String}},
    { lastName: { type: affinity.String }},
    { id: { type: affinity.String }},
    { other: { type: affinity.Integer }}
], [
    [ 'Lady', 'Mariane', '1', 1 ],
    [ 'Lady', 'Elizabeth', '2', 1 ],
    [ 'Lady', 'Lucy', '3', 1 ],
    [ 'Lady', 'Nelly', '4', 1 ]
]);


describe('Intersection Class', function () {

    describe('When provided with two union-compatible relations', function () {


        it('Should return the common tuples of A and B if there are common tuples', function (done) {

            var intersected = relation.intersect(relation_4_common);

            intersected.count().should.be.equal(4);

            debug.reldump.debug(intersected.toString());

            done();

        });

        it('Should return an empty relation if there are no common tuples', function (done) {

            var intersected = relation.intersect(relation_no_comon);

            intersected.count().should.be.equal(0);

            debug.reldump.debug(intersected.toString());

            done();

        });

        it('Should return a copy of A of all tuples are common', function (done) {

            var intersected = relation.intersect(relation);

            intersected.equal(relation).should.be.equal(true);

            debug.reldump.debug(intersected.toString());

            done();

        });

        it('Should return TABLE_DEE when TABLE_DEE x TABLE_DEE', function (done) {

            var intersection = affinity.TABLE_DEE.intersect(affinity.TABLE_DEE);

            intersection.equal(affinity.TABLE_DEE).should.be.equal(true);

            debug.reldump.debug(intersection.toString());

            done();

        });

        it('Should return TABLE_DUM when TABLE_DEE x TABLE_DUM', function (done) {

            var intersection = affinity.TABLE_DUM.intersect(affinity.TABLE_DEE);

            intersection.equal(affinity.TABLE_DUM).should.be.equal(true);

            debug.reldump.debug(intersection.toString());

            done();

        });

    });

    describe('When provided with two non-union-compatible relations', function () {

        it('Should throw if the headers contain attributes with same names but different types', function (done) {

            should(function () {
                var intersection = relation.intersect(relation_non_union_compatible).compute();
            }).throw();

            done();

        });

        it('Should throw if the headers contain a different number of attributes', function (done) {

            should(function () {
                var intersection = relation.intersect(relation_non_union_compatible2).compute();
            }).throw();

            done();

        });


    });

    describe('When provided with invalid arguments', function () {

        it('Should throw if the relation A is not specified', function (done) {

            should(function () {
                var intersection = new affinity.Intersection(undefined, relation).compute();
            }).throw();

            done();

        });

        it('Should throw if the relation B is not specified', function (done) {

            should(function () {
                var intersection = relation.intersect().compute();
            }).throw();

            done();

        });

    });


});