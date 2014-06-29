var affinity = require('./../../../../index.js');

describe('Equal class', function () {

    describe('When provided with booleans', function(){

        it('Should Return false if the two booleans are not equal', function(done){

            var equal = new affinity.Equal(true, false);

            equal.value().should.be.equal(false);

            done();

        });

        it('Should Return true if the two booleans are equal', function(done){

            var equal = new affinity.Equal(true, true);

            equal.value().should.be.equal(true);

            equal = new affinity.Equal(false, false);

            equal.value().should.be.equal(true);

            done();

        });

    });

    describe('When provided with dates', function(){

        it('Should return true if the two dates are equal', function(done){

            var date1 = new Date();
            var date2 = new Date();

            var now = new Date();
            date1.setTime(now.getTime());
            date2.setTime(now.getTime());

            var equal = new affinity.Equal(date1, date2);

            equal.value().should.be.equal(true);

            done();

        });

        it('Should return false if the two dates are not equal', function(done){

            var date1 = new Date();
            var date2 = new Date();

            var now = new Date();
            date1.setTime(now.getTime());
            date2.setTime(now.getTime()-100);

            var equal = new affinity.Equal(date1, date2);

            equal.value().should.be.equal(false);

            done();

        });

    });

    describe('When provided with floats', function(){

        it('Should return false if the two floats are not equal', function(done){

            var equal = new affinity.Equal(1.10001, 2.0001);

            equal.value().should.be.equal(false);

            done();

        });

        it('Should return true if the two floats are equal', function(done){

            var equal = new affinity.Equal(1.10001, 1.10001);

            equal.value().should.be.equal(true);

            done();

        });

    });

    describe('When provided with integers', function(){

        it('Should return false if the two integers are not equal', function(done){

            var equal = new affinity.Equal(1, 2);

            equal.value().should.be.equal(false);

            done();

        });

        it('Should return true if the two integers are equal', function(done){

            var equal = new affinity.Equal(1, 1);

            equal.value().should.be.equal(true);

            done();

        });

    });

    describe('When provided with strings', function(){

        it('Should return false if the two strings are not equal', function(done){

            var equal = new affinity.Equal('abc', 'def');

            equal.value().should.be.equal(false);

            done();

        });

        it('Should return true if the two strings are equal', function(done){

            var equal = new affinity.Equal('abc', 'abc');

            equal.value().should.be.equal(true);

            done();

        });

    });

    describe('When provided with types', function(){

        it('Should return true if the two types are equal', function(done){

            var equal = new affinity.Equal(affinity.Integer, affinity.Integer);

            equal.value().should.be.equal(true);

            done();

        });

        it('Should return false if the two types are not equal', function(done){

            var equal = new affinity.Equal(affinity.Integer, affinity.Float);

            equal.value().should.be.equal(false);

            done();

        });

        it('Should return false if the two types are not equal and one inherits from the other', function(done){

            var equal = new affinity.Equal(affinity.Integer, affinity.Numeric);

            equal.value().should.be.equal(false);

            done();

        });

    });

});