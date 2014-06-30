var affinity = require('./../../../../index.js');

describe('SmallerThanEqual class', function(){

    describe('When provided with strings', function(){

        it('Should return false if A is after B', function(done){

            var st = new affinity.SmallerThanEqual('def', 'abc');

            st.value().should.be.equal(false);

            done();

        });

        it('Should return true if A is before B', function(done){

            var st = new affinity.SmallerThanEqual('abc', 'abe');

            st.value().should.be.equal(true);

            done();

        });

        it('Should return true if A is equal to B', function(done){

            var st = new affinity.SmallerThanEqual('abc', 'abc');

            st.value().should.be.equal(true);

            done();


        });

    });

    describe('When provided with numbers', function(){

        it('Should return false if A is after B', function(done){

            var st = new affinity.SmallerThanEqual(2, 1);

            st.value().should.be.equal(false);

            done();

        });

        it('Should return true if A is before B', function(done){

            var st = new affinity.SmallerThanEqual(1, 2);

            st.value().should.be.equal(true);

            done();

        });

        it('Should return true if A equals B', function(done){

            var st = new affinity.SmallerThanEqual(2, 2);

            st.value().should.be.equal(true);

            done();

        });

    });

    describe('When provided with dates', function(){

        it('Should return false if A is after B', function(done){

            var date = new Date();

            var date1 = new Date();
            var date2 = new Date();

            date1.setTime(date.getTime());
            date2.setTime(date.getTime()+100);

            var st = new affinity.SmallerThanEqual(date2, date1);

            st.value().should.be.equal(false);

            done();

        });

        it('Should return true if A is before B', function(done){

            var date = new Date();

            var date1 = new Date();
            var date2 = new Date();

            date1.setTime(date.getTime());
            date2.setTime(date.getTime()+100);

            var st = new affinity.SmallerThanEqual(date1, date2);

            st.value().should.be.equal(true);

            done();

        });

        it('Should return true if A equals B', function(done){

            var date = new Date();

            var date1 = new Date();
            var date2 = new Date();

            date1.setTime(date.getTime());
            date2.setTime(date.getTime());

            var st = new affinity.SmallerThanEqual(date1, date2);

            st.value().should.be.equal(true);

            done();

        });

    });

});