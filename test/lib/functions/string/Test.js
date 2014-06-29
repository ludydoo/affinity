var affinity = require('./../../../../index.js');
var should = require('should');

describe('Test class', function(){

    it.only('Should be able to test a string', function(done){

        var relation = new affinity.Relation([
                { name : { type : affinity.String} }
            ],[
                ['John Doe'],
                ['Mark Clintberg'],
                ['Bo Vril']
            ]);

        var extended = relation.extend([{ tests : relation.get('name').test(/Doe/) }]);

        extended.print();

        done();

    });

});