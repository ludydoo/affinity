var affinity = require('./../../../../index.js');

describe('Or class', function () {

    describe('When provided with boolean', function () {

        it('Should return a false boolean if all the arguments are false', function (done) {

            var bool1 = false;
            var bool2 = false;

            var or = new affinity.Or(bool1, bool2);

            (or.value()).should.be.equal(false);

            done();

        });

        it('Should return a true boolean if one of the arguments is true', function (done) {

            var bool1 = false;
            var bool2 = true;

            var or = new affinity.Or(bool1, bool2);

            (or.value()).should.be.equal(true);

            done();

        });

        it('Should return a true boolean if all the arguments are true', function (done) {

            var bool1 = true;
            var bool2 = true;

            var or = new affinity.Or(bool1, bool2);

            (or.value()).should.be.equal(true);

            done();

        });

    });

    describe('When provided with functions', function () {

        it('Should return a false boolean if all the arguments are false', function (done) {

            var eq1 = new affinity.Equal(true, false);
            var eq2 = new affinity.Equal(true, false);

            var or = new affinity.Or(eq1, eq2);

            (or.value()).should.be.equal(false);

            done();

        });

        it('Should return a true boolean if one of the arguments is true', function (done) {

            var eq1 = new affinity.Equal(true, false);
            var eq2 = new affinity.Equal(true, true);

            var or = new affinity.Or(eq1, eq2);

            (or.value()).should.be.equal(true);

            done();

        });

        it('Should return a true boolean if all the arguments are true', function (done) {

            var eq1 = new affinity.Equal(true, true);
            var eq2 = new affinity.Equal(false, false);

            var or = new affinity.Or(eq1, eq2);

            (or.value()).should.be.equal(true);

            done();

        });

    });

});