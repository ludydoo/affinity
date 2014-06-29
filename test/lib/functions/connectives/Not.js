var affinity = require('./../../../../index.js');

describe('Not class', function () {

    describe('When provided with boolean', function () {

        it('Should return a false boolean if true argument is true', function (done) {

            var not = new affinity.Not(true);

            (not.value()).should.be.equal(false);

            done();

        });

        it('Should return a true boolean if the argument is false', function (done) {

            var not = new affinity.Not(false);

            (not.value()).should.be.equal(true);

            done();

        });

    });

    describe('When provided with functions', function () {

        it('Should return a false boolean if the argument is true', function (done) {

            var eq1 = new affinity.Equal(true, true);

            var not = new affinity.Not(eq1);

            (not.value()).should.be.equal(false);

            done();

        });

        it('Should return a true boolean if the argument is false', function (done) {

            var eq1 = new affinity.Equal(true, false);

            var not = new affinity.Not(eq1);

            (not.value()).should.be.equal(true);

            done();

        });

    });

});