var affinity = require('./../../../../index.js');

describe('SmallerThan class', function(){

    describe('When provided with strings', function(){

        it('Should return false if A is after B', function(done){

            var st = new affinity.SmallerThan('def', 'abc');

            st.value().should.be.equal(false);

            done();

        });

        it('Should return true if A is before B', function(done){

            var st = new affinity.SmallerThan('abc', 'abe');

            st.value().should.be.equal(true);

            done();

        });

    });

    describe('When provided with numbers', function(){

        it('Should return false if A is after B', function(done){

            var st = new affinity.SmallerThan(2, 1);

            st.value().should.be.equal(false);

            done();

        });

        it('Should return true if A is before B', function(done){

            var st = new affinity.SmallerThan(1, 2);

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

            var st = new affinity.SmallerThan(date2, date1);

            st.value().should.be.equal(false);

            done();

        });

        it('Should return true if A is before B', function(done){

            var date = new Date();

            var date1 = new Date();
            var date2 = new Date();

            date1.setTime(date.getTime());
            date2.setTime(date.getTime()+100);

            var st = new affinity.SmallerThan(date1, date2);

            st.value().should.be.equal(true);

            done();

        });

    });

});