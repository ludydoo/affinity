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

describe('Sum Class', function(){

    it('Should Return sum of the values for the given attribute', function(done){

        var age = relation.get('age');

        var sum = age.sum();

        sum.value().should.be.equal(204);

        done();

    });

});