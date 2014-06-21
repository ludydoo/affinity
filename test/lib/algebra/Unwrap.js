var affinity = require('./../../../index.js');
var should = require('should');

var relationMultiple = new affinity.Relation([
    {firstName : {type : affinity.String}},
    {lastName : {type : affinity.String}},
    {age : {type : affinity.Integer}},
    {alive : {type : affinity.Boolean}}
],[
    ['Mary', 'Poppins', 45, false],
    ['Jesus', 'Christ', 33, false],
    ['Doodle', 'Diddle', 5, true],
    ['Mag', 'Durocher', 12, true],
    ['Super', 'Man', 60, true]
]);

var relationSingle = new affinity.Relation([
    {name : {type : affinity.String}}
],[
    ['Mag'],['Mathieu'],['Bob'],['Henry'],['Dan'],['Henriette'],['Elizabeth'],['Victoria'],['Nicolas']
]);

var wrappedMultiple_1 = relationMultiple.wrap('age', ['age']);
var wrappedMultiple_2 = relationMultiple.wrap('name', ['firstName', 'lastName']);
var wrappedMultiple_2_2 = relationMultiple.wrap('name', ['firstName', 'lastName']).wrap('abc', ['age', 'alive']);
var wrappedMultiple_1_1_1_1 = relationMultiple.wrap('age', ['age']).wrap('fn', ['firstName']).wrap('ln', ['lastName']).wrap('a', ['alive']);
var wrappedMultiple_1_1_1 = relationMultiple.wrap('age', ['age']).wrap('fn', ['firstName']).wrap('ln', ['lastName'])
var wrappedMultiple_2_1 = relationMultiple.wrap('name', ['firstName', 'lastName']).wrap('age', ['age']);

describe('Unwrap class', function () {

    describe('When the attributes to unwrap are given', function(){

        it('Should be able to unwrap if the attributes are passed as a string', function(done){

            var unwrapped = wrappedMultiple_1.unwrap('age');

            unwrapped.equal(relationMultiple).should.be.true;

            done();

        });

        it('Should be able to unwrap if the attributes are passed as a set of attributes', function(done){


            var attributeSet = new affinity.Set({type : affinity.Attribute, elements : [
                new affinity.Attribute({name : 'name', type : affinity.Tuple}),
                new affinity.Attribute({name : 'abc', type : affinity.Tuple})
            ]});

            var unwrapped = wrappedMultiple_2_2.unwrap(attributeSet);

            unwrapped.equal(relationMultiple).should.be.true;

            done();

        });

        it('Should be able to unwrap if the attributes are passed as a header', function(done){

            var unwrapped = wrappedMultiple_2_2.unwrap(wrappedMultiple_2_2.header().clone());

            unwrapped.equal(relationMultiple).should.be.true;

            done();


        });

        it('Should be able to unwrap if the attributes are passed as an array of attributes', function(done){

            var attributeSet = [
                new affinity.Attribute({name : 'name', type : affinity.Tuple}),
                new affinity.Attribute({name : 'abc', type : affinity.Tuple})
            ];

            var unwrapped = wrappedMultiple_2_2.unwrap(attributeSet);

            unwrapped.equal(relationMultiple).should.be.true;

            done();

        });

        it('Should be able to unwrap if the attributes are passed as an array of string', function(done){

            var attributeSet = [
                'name',
                'abc'
            ];

            var unwrapped = wrappedMultiple_2_2.unwrap(attributeSet);

            unwrapped.equal(relationMultiple).should.be.true;

            done();

        });

        it('Should throw if the passed string attribute is empty', function(done){

            should(function(){

                wrappedMultiple_2_2.unwrap('').compute();

            }).throw();

            done();
        });

        it('Should throw if the passed set is empty', function(done){

            var attributeSet = new affinity.Set([]);

            should(function(){

                var unwrapped = wrappedMultiple_2_2.unwrap(attributeSet).compute();

            }).throw();

            done();

        });

        it('Should throw if the passed array is empty', function(done){

            var attributeSet = [];

            should(function(){

                var unwrapped = wrappedMultiple_2_2.unwrap(attributeSet).compute();

            }).throw();

            done();

        });

        it('Should throw if the passed argument is not of type array, set or string', function(done){


            should(function(){
                wrappedMultiple_2_2.unwrap(null).compute();
            }).throw();

            should(function(){
                wrappedMultiple_2_2.unwrap(undefined).compute();
            }).throw();

            should(function(){
                wrappedMultiple_2_2.unwrap({}).compute();
            }).throw();

            should(function(){
                wrappedMultiple_2_2.unwrap(123).compute();
            }).throw();

            done();

        });

    });

    describe('When the relation argument is passed', function(){

        it('Should be able to unwrap if the relation is of type relation', function(done){

            should(function(){

                var wrap = new affinity.Unwrap('abc', ['id']).compute();

            }).throw();

            done();

        });

        it('Should throw if the relation argument is not of the good type', function(done){

            should(function(){

                var wrap = new affinity.Unwrap(undefined, ['id']).compute();

            }).throw();

            done();

        });

    });

    describe('When given one attribute to unwrap', function () {

        it('Should be able to unwrap it even if it is the only attribute in the relation', function(done){

            var wrapped = relationSingle.wrap('name', ['name']);

            var unwrapped = wrapped.unwrap(['name']);

            unwrapped.equal(relationSingle).should.be.true;

            unwrapped.print();

            done();

        });

        it('Should be able to unwrap it even if there are other non-wrapped attributes', function(done){

            var wrapped = relationMultiple.wrap('fn', ['firstName']);

            var unwrapped = wrapped.unwrap('fn');

            unwrapped.print();

            unwrapped.equal(relationMultiple).should.be.true;

            done();

        });

        it('Should be able to unwrap it even if there are other wrapped attributes', function(done){

            var wrapped = relationMultiple.wrap('fn', ['firstName', 'alive']);
            var wrapped2 = wrapped.wrap('ln', ['lastName']);
            var wrapped3 = wrapped2.wrap('age', ['age']);

            var unwrapped = wrapped3.unwrap('age');

            unwrapped.print();

            unwrapped.equal(wrapped2).should.be.true;

            var unwrapped2 = unwrapped.unwrap('ln');

            unwrapped2.print();

            unwrapped2.equal(wrapped).should.be.true;

            var unwrapped3 = unwrapped2.unwrap('fn');

            unwrapped3.print();

            unwrapped3.equal(relationMultiple).should.be.true;

            done();

        });

        it('Should throw if the attribute does not exist', function(done){

            should(function(){

                var wrapped = relationMultiple.wrap('name', ['firstName', 'lastName']);
                var unwrap = relationMultiple.unwrap('Doodle').compute();

            }).throw();

            done();

        });

        it('Should throw if the unwrapped attribute would overwrite one of the already existing attributes in the relation', function(done){

            var wrapped = relationMultiple.wrap('name', ['firstName', 'lastName']);
            var renamed = wrapped.rename({'alive' : 'firstName'});

            should(function(){
                var wrap = relation.unwrap('name').compute();
            }).throw();

            done();

        });

        it('Should throw if the specified attribute is not wrapped', function(done){

            should(function(){
                var wrap = relationMultiple.unwrap('age').compute();
            }).throw();

            done();

        });

    });

    describe('When given multiple attributes to unwrap', function () {

        it('Should be able to unwrap them even if they constitute all of the header attributes', function(done){

            var unwrapped = wrappedMultiple_1_1_1_1.unwrap(['age', 'fn', 'ln', 'a'])

            unwrapped.print();

            unwrapped.equal(relationMultiple).should.be.true;

            done();

        });

        it('Should be able to unwrap them even if there are other non-wrapped attributes', function(done){

            var unwrapped = wrappedMultiple_2.unwrap('name');

            unwrapped.print();

            unwrapped.equal(relationMultiple).should.be.true;

            done();

        });

        it('Should be able to unwrap them even if there are other wrapped attributes', function(done){

            var unwrapped = wrappedMultiple_1_1_1_1.unwrap(['ln', 'fn']);

            unwrapped.print();

            var result = relationMultiple.wrap('age', ['age']).wrap('a', ['alive']);

            unwrapped.equal(result).should.be.true;

            done();

        });

        it('Should be able to unwrap them even if there are other wrapped and non-wrapped attributes', function(done){

            var unwrapped = wrappedMultiple_1_1_1.unwrap(['age', 'fn']);

            var result = relationMultiple.wrap('ln', ['lastName']);

            unwrapped.print();

            unwrapped.equal(result).should.be.true;

            done();

        });

        it('Should throw if one of the specified attributes does not exist', function(done){

            should(function(){
                wrappedMultiple_1_1_1.unwrap(['age', 'fn', 'booby']).compute();
            }).throw();

            done();

        });

        it('Should throw if all of the specified attributes does not exist', function(done){

            should(function(){
                wrappedMultiple_1_1_1.unwrap(['doody', 'loony', 'booby']).compute();
            }).throw();

            done();

        });

        it('Should throw if one of the unwrapped attributes would overwrite an already existing attribute in the relation', function(done){

            should(function(){

                var renamed = wrappedMultiple_1_1_1.rename({alive : 'age'});

                renamed.compute();

                wrappedMultiple_1_1_1.unwrap(['age', 'fn', 'ln']).compute();

            }).throw();

            done();

        });

        it('Should throw if one of the specified attribute is not wrapped', function(done){

            should(function(){

                wrappedMultiple_2_1.unwrap(['alive', 'name']).compute();

            }).throw();

            done();

        });

        it('Should throw if all of the specified attribute are not wrapped', function(done){

            should(function(){

                relationMultiple.unwrap(['alive', 'name']).compute();

            }).throw();

            done();

        });

    });

});