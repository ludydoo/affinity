var affinity = require('./../../../index.js');
var should = require('should');

describe('Extend Class', function(){

    describe('When passing only one attribute to extend', function(){

        it('Should be able to extend the relation', function(done){

            var relation = new affinity.Relation([
                {born : { type : affinity.Integer}},
                {died : { type : affinity.Integer}}
            ],[
                [1987, 2015],
                [1920, 2300],
                [1950, 2100],
                [1800, 1860]
            ]);

            var born = relation.get('born');
            var died = relation.get('died');

            var extended = relation.extend([{lived : died.minus(born)}]).compute();

            extended.print();

            done();

        });

    })

});