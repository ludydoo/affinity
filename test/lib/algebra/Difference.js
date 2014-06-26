var affinity = require('./../../../index.js');
var should = require('should');
var debug = require('./../../../lib/affinity/helpers/debug');

var relation = new affinity.Relation([
    {a: { type: affinity.Integer}},
    {b: { type: affinity.Integer}},
    {c: { type: affinity.Integer}}
], [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]);

var relation_1_common = new affinity.Relation([
    {a: { type: affinity.Integer}},
    {b: { type: affinity.Integer}},
    {c: { type: affinity.Integer}}
], [
    [1, 2, 3],
    [9, 10, 11],
    [12, 13, 14]
]);

var relation_no_common = new affinity.Relation([
    {a: { type: affinity.Integer}},
    {b: { type: affinity.Integer}},
    {c: { type: affinity.Integer}}
], [
    [4, 7, 10],
    [5, 8, 11],
    [6, 9, 12]
]);

var relation_all_common = new affinity.Relation([
    {a: { type: affinity.Integer}},
    {b: { type: affinity.Integer}},
    {c: { type: affinity.Integer}}
], [
    [1, 2, 3],
    [4, 5, 6]
]);

var relation_other_type = new affinity.Relation([
    {a: { type: affinity.Integer}},
    {b: { type: affinity.Integer}},
    {c: { type: affinity.String}}
], [
    [1, 2, 3]
]);

var relation_non_union_compatible_1 = new affinity.Relation([
    {a: { type: affinity.Integer}},
    {b: { type: affinity.Integer}},
    {d: { type: affinity.Integer}}
], [
    [1, 2, 3]
]);

var relation_non_union_compatible_2 = new affinity.Relation([
    {a: { type: affinity.Integer}},
    {b: { type: affinity.Integer}},
    {c: { type: affinity.Integer}},
    {d: { type: affinity.Integer}}
], [
    [1, 2, 3, 4]
]);


describe('Difference Class', function () {

    describe('When provided two union compatible relations A and B', function () {

        it('Should return a relation with the tuples of A that are not in B when there are tuples in common', function (done) {

            var difference = relation.difference(relation_1_common);

            difference.count().should.be.equal(relation.count() - 1);

            debug.reldump.debug(difference.toString());

            done();

        });

        it('Should return a relation with the same header but without tuples when all tuples are in common', function (done) {

            var difference = relation.difference(relation);

            difference.count().should.be.equal(0);

            debug.reldump.debug(difference.toString());

            done();

        });

        it('Should return a relation equal to A when there are no tuples in common', function (done) {

            var difference = relation.difference(relation_no_common);

            difference.equal(relation).should.be.equal(true);

            debug.reldump.debug(difference.toString());

            done();

        });

    });

    describe('When provided two non union compatible relations A and B', function () {

        it('Should throw if an attribute in A has the same name as an attribute in B but does not have the same type', function (done) {

            should(function () {
                relation.difference(relation_other_type).compute();
            }).throw();

            done();

        });

        it('Should throw if the two headers do not have the same number of attributes', function (done) {

            should(function () {
                relation.difference(relation_non_union_compatible_1).compute();
            }).throw();

            should(function () {
                relation.difference(relation_non_union_compatible_2).compute();
            }).throw();

            done();

        });

    });

});