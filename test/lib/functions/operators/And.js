var affinity = require('./../../../../index.js');

describe('And class', function(){

    describe('And.valueOf', function(){

        describe('When provided with falsey arguments', function(){

            it('Should return a falsey boolean', function(done){

                var bool1 = false;
                var bool2 = true;

                var and = new affinity.And(bool1, bool2);

                (and.value()).should.be.equal(false);

                done();

            });

        });

        describe('When provided with a falsey function', function(){

            it('Should return a falsey boolean', function(done){

                var bool1 = true;
                var bool2 = true;

                var bool3 = false;
                var bool4 = false;

                var and = new affinity.And(new affinity.Equal(bool1, bool2), new affinity.Equal(bool3, bool4));

                (and.value()).should.be.equal(true);

                done();

            });

        });

        describe('When provided with a truey function', function(){

            it('Should return a falsey boolean', function(done){

                var bool1 = new affinity.Boolean(true);
                var bool2 = new affinity.Boolean(true);

                var bool3 = new affinity.Boolean(false);
                var bool4 = new affinity.Boolean(false);

                var and = new affinity.And(new affinity.Equal(bool1, bool2), new affinity.Equal(bool3, bool4));

                (and.value()).should.be.equal(true);

                done();

            });

        });

    });

});