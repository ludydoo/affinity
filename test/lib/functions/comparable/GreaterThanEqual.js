var affinity = require('./../../../../index.js');

describe('GreaterThanEqual class', function(){

    describe('When provided with strings', function(){

        it('Should return true if A is after B', function(done){

            var gte = new affinity.GreaterThanEqual('def', 'abc');

            gte.value().should.be.equal(true);

            done();

        });

        it('Should return false if A is before B', function(done){

            var gte = new affinity.GreaterThanEqual('abc', 'abe');

            gte.value().should.be.equal(false);

            done();

        });

        it('Should return true if A is equal to B', function(done){

            var gte = new affinity.GreaterThanEqual('abc', 'abc');

            gte.value().should.be.equal(true);

            done();

            done();

        });

    });

    describe('When provided with numbers', function(){

        it('Should return true if A is after B', function(done){

            var gte = new affinity.GreaterThanEqual(2, 1);

            gte.value().should.be.equal(true);

            done();

        });

        it('Should return false if A is before B', function(done){

            var gte = new affinity.GreaterThanEqual(1, 2);

            gte.value().should.be.equal(false);

            done();

        });

        it('Should return true if A equals B', function(done){

            var gte = new affinity.GreaterThanEqual(2, 2);

            gte.value().should.be.equal(true);

            done();

        });

    });

    describe('When provided with dates', function(){

        it('Should return true if A is after B', function(done){

            var date = new Date();

            var date1 = new Date();
            var date2 = new Date();

            date1.setTime(date.getTime());
            date2.setTime(date.getTime()+100);

            var gte = new affinity.GreaterThanEqual(date2, date1);

            gte.value().should.be.equal(true);

            done();

        });

        it('Should return false if A is before B', function(done){

            var date = new Date();

            var date1 = new Date();
            var date2 = new Date();

            date1.setTime(date.getTime());
            date2.setTime(date.getTime()+100);

            var gte = new affinity.GreaterThanEqual(date1, date2);

            gte.value().should.be.equal(false);

            done();

        });

        it('Should return true if A equals B', function(done){

            var date = new Date();

            var date1 = new Date();
            var date2 = new Date();

            date1.setTime(date.getTime());
            date2.setTime(date.getTime());

            var gte = new affinity.GreaterThanEqual(date1, date2);

            gte.value().should.be.equal(true);

            done();

        });

    });

});