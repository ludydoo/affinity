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

describe('Maximum Class', function(){

    it('Should Return the largest value of the given attribute for numeric attributes', function(done){

        var age = relation.get('age');

        var max = age.max();

        max.value().should.be.equal(70);

        done();

    });

    it('Should Return the largest value for string attributes', function(done){

        var name = relation.get('name');

        var max = name.max();

        max.value().should.be.equal('Superman');

        done();

    });

});