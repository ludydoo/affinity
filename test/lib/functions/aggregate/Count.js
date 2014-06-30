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

describe('Count Class', function(){

    it('Should Return the number of tuples in a relation', function(done){

        var count = relation.count();

        count.value().should.be.equal(5);

        done();

    });

});