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

describe('Variance Class', function(){

    it('Should Return standard deviation of the values for the given attribute', function(done){

        var age = relation.get('age');

        var variance = age.variance();

        var roundedResult = Math.round(variance.value()*10000)/10000;

        var expectedResult = Math.round(302.96*10000)/10000;

        roundedResult.should.be.equal(expectedResult);

        done();

    });

});