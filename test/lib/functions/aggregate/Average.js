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

describe('Average Class', function(){

    it('Should Return the average for a given attribute', function(done){

        var age = relation.get('age');

        var avg = age.avg();

        avg.value().should.be.equal((46+23+42+23+70)/5);

        done();

    });

});