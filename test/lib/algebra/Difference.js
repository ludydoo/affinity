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

var relation_two_common = new affinity.Relation([
    {a: { type: affinity.Integer}},
    {b: { type: affinity.Integer}},
    {c: { type: affinity.Integer}}
], [
    [1, 2, 3],
    [4, 5, 6],
    [12, 12, 12]
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

            difference.length().should.be.equal(relation.length() - 1);

            debug.reldump.debug(difference.toString());

            done();

        });

        it('Should return a relation with the same header but without tuples when all tuples are in common', function (done) {

            var difference = relation.difference(relation);

            difference.length().should.be.equal(0);

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

    describe('When adding tuples in the left base relation', function(){

        it('Should add the tuple to the relation if the tuple does not exist in the right relation', function(done){

            var left = relation.clone();

            var right = relation_1_common.clone();

            var difference = left.difference(right);

            difference.compute();

            var tuple = new affinity.Tuple({ a : 15, b : 15, c : 15});

            left.add(tuple);

            difference.exists(tuple).should.be.equal(true);

            difference.print();

            done();

        });

        it('Should do nothing if the tuple exists in the right relation', function(done){

            var left = relation.clone();

            var right = relation_1_common.clone();

            var difference = left.difference(right);

            difference.compute();

            var tuple = new affinity.Tuple({ a : 9, b : 10, c : 11});

            left.add(tuple);

            difference.equal(relation.difference(relation_1_common)).should.be.equal(true);

            difference.print();

            done();

        });

    });

    describe('When adding tuples in the right base relation', function(){

        it('Should do nothing if the tuple is not present in the left relation', function(done){

            var left = relation.clone();

            var right = relation_1_common.clone();

            var difference = left.difference(right);

            difference.compute();

            var tuple = new affinity.Tuple({ a : 99, b : 99, c : 99});

            right.add(tuple);

            difference.equal(relation.difference(relation_1_common)).should.be.equal(true);

            difference.print();

            done();

        });

        it('Should do remove the tuple if the tuple is present in the left relation', function(done){

            var left = relation.clone();

            var right = relation_1_common.clone();

            var difference = left.difference(right);

            difference.compute();

            var tuple = new affinity.Tuple({ a : 4, b : 5, c : 6});

            right.add(tuple);

            difference.exists(tuple).should.be.equal(false);

            difference.print();

            done();

        });


    });

    describe('When removing tuples in the left base relation', function(){

        it('Should remove the tuple if it does not exist in the right relation', function(done){

            var left = relation.clone();

            var right = relation_1_common.clone();

            var difference = left.difference(right);

            difference.compute();

            var tuple = new affinity.Tuple({ a : 4, b : 5, c : 6});

            left.remove(tuple);

            difference.exists(tuple).should.be.equal(false);

            difference.print();

            done();

        });

        it('Should do nothing the tuple exists in the right relation', function(done){

            var left = relation.clone();

            var right = relation_1_common.clone();

            var difference = left.difference(right);

            difference.compute();

            var tuple = new affinity.Tuple({ a : 1, b : 2, c : 3});

            left.remove(tuple);

            difference.equal(relation.difference(relation_1_common)).should.be.equal(true);

            difference.print();

            done();

        });

    });

    describe('When removing tuples in the right base relation', function(){

        it('Should do nothing if the tuple does not exist in the left relation', function(done){

            var left = relation.clone();

            var right = relation_1_common.clone();

            var difference = left.difference(right);

            difference.compute();

            var tuple = new affinity.Tuple({ a : 9, b : 10, c : 11});

            right.remove(tuple);

            difference.equal(relation.difference(relation_1_common)).should.be.equal(true);

            difference.print();

            done();

        });

        it('Should add the tuple if it exists in the left relation', function(done){

            var left = relation.clone();

            var right = relation_1_common.clone();

            var difference = left.difference(right);

            difference.compute();

            var tuple = new affinity.Tuple({ a : 1, b : 2, c : 3});

            right.remove(tuple);

            difference.exists(tuple).should.be.equal(true);

            difference.print();

            done();


        });

    });

    describe('When updating tuples in the left base relation', function(){

        it('Should update the tuple if it does not exist in the right relation', function(done){

            var left = relation.clone();

            var right = relation_1_common.clone();

            var difference = left.difference(right);

            difference.compute();

            var tuple = left.find({a : 4, b : 5, c : 6});

            tuple.set('c', 7);

            difference.exists({a : 4, b : 5, c : 7}).should.be.equal(true);

            difference.print();

            done();

        });

        it('Should remove the tuple if it exists in the right relation after the update', function(done){

            var left = relation.clone();

            var right = relation_1_common.clone();

            var difference = left.difference(right);

            difference.compute();

            var tuple = left.find({a : 4, b : 5, c : 6});

            tuple.set('a', 9);
            tuple.set('b', 10);
            tuple.set('c', 11);

            left.exists({a : 9, b : 10, c : 11}).should.be.equal(true);

            difference.exists({a : 9, b : 10, c : 11}).should.be.equal(false);

            difference.print();

            done();

        });

        it('Should do nothing if the tuple exists in the right relation before and after the update', function(done){

            var left = relation.clone();

            var right = relation_two_common.clone();

            var difference = left.difference(right);

            difference.compute();

            // [1, 2, 3],
            // [4, 5, 6],
            // [7, 8, 9]

            //[1, 2, 3],
            //[4, 5, 6],
            //[12, 12, 12]

            var tuple = left.find({a : 4, b : 5, c : 6});

            tuple.set('a', 12);
            tuple.set('b', 12);
            tuple.set('c', 12);

            difference.equal(relation.difference(relation_two_common)).should.be.equal(true);

            difference.print();

            done();

        });

        it('Should add the tuple if it does not exist in the right relation after the update', function(done){

            var left = relation.clone();

            var right = relation_two_common.clone();

            var difference = left.difference(right);

            difference.compute();

            // [1, 2, 3], -> 20, 20, 20
            // [4, 5, 6],
            // [7, 8, 9]

            //[1, 2, 3],
            //[4, 5, 6],
            //[12, 12, 12]

            var tuple = left.find({a : 1, b : 2, c : 3});

            tuple.set('a', 20);
            tuple.set('b', 20);
            tuple.set('c', 20);

            difference.exists({a : 20, b : 20, c : 20}).should.be.equal(true);

            difference.print();

            done();

        });


    });

    describe('When updating tuples in the right base relation', function(){

        it('Should do nothing if the tuple does not exist in the left relation', function(done){

            var left = relation.clone();

            var right = relation_two_common.clone();

            var difference = left.difference(right);

            difference.compute();

            // [1, 2, 3],
            // [4, 5, 6],
            // [7, 8, 9]

            //[1, 2, 3],
            //[4, 5, 6],
            //[12, 12, 12] -> 13, 13, 13

            var tuple = right.find({a : 12, b : 12, c : 12});

            tuple.set('a', 13);
            tuple.set('b', 13);
            tuple.set('c', 13);

            difference.equal(left.difference(right)).should.be.equal(true);

            difference.print();

            done();

        });

        it('Should remove the tuple if it exists in the left relation after the update', function(done){

            var left = relation.clone();

            var right = relation_two_common.clone();

            var difference = left.difference(right);

            difference.compute();

            // [1, 2, 3],
            // [4, 5, 6],
            // [7, 8, 9]

            //[1, 2, 3],
            //[4, 5, 6],
            //[12, 12, 12] -> 7, 8, 9

            var tuple = right.find({a : 12, b : 12, c : 12});

            tuple.set('a', 7);
            tuple.set('b', 8);
            tuple.set('c', 9);

            difference.exists({a : 7, b : 8, c : 9}).should.be.equal(false);

            difference.print();

            done();

        });

        it('Should add the old tuple and remove the new tuple if it exists in the left relation before and after the update', function(done){

            var left = relation.clone();

            var right = relation_two_common.clone();

            var difference = left.difference(right);

            difference.compute();

            // [1, 2, 3],
            // [4, 5, 6],
            // [7, 8, 9]

            //[1, 2, 3],
            //[4, 5, 6], -> 7,8,9
            //[12, 12, 12]

            // 4, 5, 6
            //
            //

            var tuple = right.find({a : 4, b : 5, c : 6});

            tuple.set('a', 7);
            tuple.set('b', 8);
            tuple.set('c', 9);

            difference.exists({a : 4, b : 5, c : 6}).should.be.equal(true);
            difference.exists({a : 7, b : 8, c : 9}).should.be.equal(false);

            difference.print();

            done();

        });

        it('Should add the tuple if it existed in the left relation before the update', function(done){

            var left = relation.clone();

            var right = relation_two_common.clone();

            var difference = left.difference(right);

            difference.compute();

            // [1, 2, 3],
            // [4, 5, 6],
            // [7, 8, 9]

            //[1, 2, 3],
            //[4, 5, 6], -> 14, 15, 16
            //[12, 12, 12]

            var tuple = right.find({a : 4, b : 5, c : 6});

            tuple.set('a', 14);
            tuple.set('b', 15);
            tuple.set('c', 16);

            difference.exists({a : 4, b : 5, c : 6}).should.be.equal(true);

            difference.print();

            done();

        });

    });

});