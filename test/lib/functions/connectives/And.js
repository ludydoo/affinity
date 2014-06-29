var affinity = require('./../../../../index.js');

describe('And class', function () {

    describe('When provided with boolean', function () {

        it('Should return a false boolean if all the arguments are false', function (done) {

            var bool1 = false;
            var bool2 = false;

            var and = new affinity.And(bool1, bool2);

            (and.value()).should.be.equal(false);

            done();

        });

        it('Should return a false boolean if one of the arguments are false', function (done) {

            var bool1 = false;
            var bool2 = true;

            var and = new affinity.And(bool1, bool2);

            (and.value()).should.be.equal(false);

            done();

        });

        it('Should return a true boolean if all the arguments are true', function (done) {

            var bool1 = true;
            var bool2 = true;

            var and = new affinity.And(bool1, bool2);

            (and.value()).should.be.equal(true);

            done();

        });

    });

    describe('When provided with functions', function () {

        it('Should return a false boolean if all the arguments are false', function (done) {

            var eq1 = new affinity.Equal(true, false);
            var eq2 = new affinity.Equal(true, false);

            var and = new affinity.And(eq1, eq2);

            (and.value()).should.be.equal(false);

            done();

        });

        it('Should return a false boolean if one of the arguments are false', function (done) {

            var eq1 = new affinity.Equal(true, false);
            var eq2 = new affinity.Equal(true, true);

            var and = new affinity.And(eq1, eq2);

            (and.value()).should.be.equal(false);

            done();

        });

        it('Should return a true boolean if all the arguments are true', function (done) {

            var eq1 = new affinity.Equal(true, true);
            var eq2 = new affinity.Equal(false, false);

            var and = new affinity.And(eq1, eq2);

            (and.value()).should.be.equal(true);

            done();

        });

    });

});