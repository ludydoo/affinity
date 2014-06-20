var affinity = require('./../../../../index.js');

describe('Equal class', function(){

    describe('Equal.eval', function(){

        describe('When provided with not equal arguments', function(){

            it('Should return a falsey boolean', function(done){

                var bool1 = false;
                var bool2 = true;

                var equal = new affinity.Equal(bool1, bool2);

                (equal == false).should.be.true;

                done();

            });

        });

        describe('When provided with equal arguments', function(){

            it('Should return a truey boolean', function(done){

                var bool1 = new affinity.Boolean(false);
                var bool2 = new affinity.Boolean(false);

                var equal = new affinity.Equal(bool1, bool2);

                (equal==true).should.be.true;

                done();

            });

        });

    });

});