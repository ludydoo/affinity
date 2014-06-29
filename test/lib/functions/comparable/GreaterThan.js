var affinity = require('./../../../../index.js');

describe('GreaterThan class', function(){

    describe('When provided with strings', function(){

        it('Should return true if A is after B', function(done){

            var gt = new affinity.GreaterThan('def', 'abc');

            gt.value().should.be.equal(true);

            done();

        });

        it('Should return false if A is before B', function(done){

            var gt = new affinity.GreaterThan('abc', 'abe');

            gt.value().should.be.equal(false);

            done();

        });

    });

    describe('When provided with numbers', function(){

        it('Should return true if A is after B', function(done){

            var gt = new affinity.GreaterThan(2, 1);

            gt.value().should.be.equal(true);

            done();

        });

        it('Should return false if A is before B', function(done){

            var gt = new affinity.GreaterThan(1, 2);

            gt.value().should.be.equal(false);

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

            var gt = new affinity.GreaterThan(date2, date1);

            gt.value().should.be.equal(true);

            done();

        });

        it('Should return false if A is before B', function(done){

            var date = new Date();

            var date1 = new Date();
            var date2 = new Date();

            date1.setTime(date.getTime());
            date2.setTime(date.getTime()+100);

            var gt = new affinity.GreaterThan(date1, date2);

            gt.value().should.be.equal(false);

            done();

        });

    });

});