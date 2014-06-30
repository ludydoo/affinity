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

describe('StandardDeviation Class', function(){

    it('Should Return standard deviation of the values for the given attribute', function(done){

        var age = relation.get('age');

        var standardDeviation = age.standardDeviation();

        var roundedResult = Math.round(standardDeviation.value()*10000)/10000;

        var expectedResult = Math.round(17.4057461776277*10000)/10000;

        roundedResult.should.be.equal(expectedResult);

        done();

    });

});