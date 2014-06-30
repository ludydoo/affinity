var affinity = require('./../../../../index.js');

var relation = new affinity.Relation([
    { name : { type : affinity.String} },
    { age : { type : affinity.Integer }}
],[
    ['John Doe', 46],
    ['Marilyn Monroe', 23],
    ['Superman', 42],
    ['Snazzy', 23],
    ['Lil Snap', 70]
]);

describe('Any Class', function(){

    it('Should Return true if all the tuples in a relation match the given predicate', function(done){

        var age = relation.get('age');

        var any = relation.any(age.gt(20));

        any.value().should.be.equal(true);

        done();

    });

    it('Should Return true if one of the tuples in a relation do not match the given predicate', function(done){

        var age = relation.get('age');

        var any = relation.any(age.st(60));

        any.value().should.be.equal(true);

        done();

    });

    it('Should Return false if any of the tuples in a relation do not match the given predicate', function(done){

        var age = relation.get('age');

        var any = relation.any(age.st(10));

        any.value().should.be.equal(false);

        done();

    });

});