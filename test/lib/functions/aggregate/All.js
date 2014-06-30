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

describe('All Class', function(){

    it('Should Return true if all the tuples in a relation match the given predicate', function(done){

        var age = relation.get('age');

        var all = relation.all(age.gt(20));

        all.value().should.be.equal(true);

        done();

    });

    it('Should Return false if one of the tuples in a relation do not match the given predicate', function(done){

        var age = relation.get('age');

        var all = relation.all(age.st(60));

        all.value().should.be.equal(false);

        done();

    });

    it('Should Return false if all of the tuples in a relation do not match the given predicate', function(done){

        var age = relation.get('age');

        var all = relation.all(age.st(10));

        all.value().should.be.equal(false);

        done();

    });

});