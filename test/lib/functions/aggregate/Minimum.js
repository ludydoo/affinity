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

describe('Minimum Class', function(){

    it('Should Return the smallest value of the given numeric attribute', function(done){

        var age = relation.get('age');

        var min = age.min();

        min.value().should.be.equal(23);

        done();

    });

    it('Should Return the smallest value of the given string attribute', function(done){

        var name = relation.get('name');

        var min = name.min();

        min.value().should.be.equal('John Doe');

        done();

    });

});