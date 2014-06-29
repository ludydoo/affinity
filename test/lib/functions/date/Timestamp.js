var affinity = require('./../../../../index.js');
var should = require('should');

describe('Timestamp Class', function(){

    describe('When passed a date attribute', function(){

        it('Should be able to extract a date timestamp', function(done){

            var relation = new affinity.Relation([
                    { date : { type : affinity.Date} }
                ],[
                    [new Date()]
                ]);

            var extended = relation.extend([{"date.timestamp()" : relation.get('date').ts()}]);

            extended.print();

            done();

        });

    });

});