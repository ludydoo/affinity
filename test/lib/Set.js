var affinity = require('./../../index.js');
var should = require('should');

describe('Set Class', function () {

    describe('Set#constructor', function () {

        describe('When provided with a type and no elements', function () {

            it('Should build an empty set and register the type', function (done) {

                var set1 = new affinity.Set({type : Array});

                set1.type().should.be.equal(Array);
                set1.equal(new affinity.Set({type : Array})).should.be.true;

                done();

            });

        });

        describe('When no type is specified and no elements are specified', function () {

            it('Should create an empty set without a type', function (done) {

                var set1 = new affinity.Set();

                (set1.type() === null).should.be.true;

                done();

            });

        });

        describe('When provided a type and elements', function () {

            it('Should build a set containing those elements and register the type', function (done) {

                var set1 = new affinity.Set({type:Number,elements: [1, 2, 3, 4]});

                set1.type().should.be.equal(Number);
                set1.elements().should.be.an.Array.and.have.length(4);

                done();

            });

        });

        describe('When provided no type and elements', function () {

            it('Should throw', function (done) {

                should(function(){
                    var set1 = new affinity.Set({type:null,elements: [1, 2, 3, 4]});
                });

                done();

            });

        });

        describe('When creating the set, then setting the type, then setting the elements', function () {

            it('Should create the set with those elements and the set', function (done) {

                var set1 = new affinity.Set();
                set1.type(Number);
                set1.elements([1, 2, 3, 4]);

                set1.elements().should.be.an.Array.and.have.length(4);
                set1.type().should.be.equal(Number);

                done();

            });

        });


        describe('When creating the set without a type, then setting the elements', function () {

            it('Should throw', function (done) {

                var set1 = new affinity.Set();
                should(function(){
                    set1.elements([1, 2, 3, 4]);
                }).throw();

                done();

            });

        });

    });

    describe('Set#each', function () {

        it('Should iterate over every element of the set', function (done) {

            var set1 = new affinity.Set({type:Number,elements: [1, 2, 3, 4]});

            var count = 0;

            set1.each(function (element, index) {
                count += index;
            });

            count.should.be.equal(6);

            done();

        });

        it('Should not bother if the set is empty', function (done) {

            var set1 = new affinity.Set({type:Number,elements: []});

            var count = 0;

            set1.each(function (element, index) {
                count += index;
            });

            count.should.be.equal(0);

            done();

        });


    });

    describe('Set#add', function () {

        describe('When provided with no arguments', function () {

            it('Should add nothing and return false', function (done) {

                var set1 = new affinity.Set({type:Number,elements: []});
                set1.add().should.be.equal(false);
                set1.elements().should.be.an.Array.and.have.length(0);

                done();


            })

        });

        describe('When provided with valid argument', function () {

            it('Should add it and return true', function (done) {

                var set1 = new affinity.Set({type:Number,elements: []});
                set1.add(1).should.be.equal(true);
                set1.elements().should.be.an.Array.and.have.length(1);

                done();


            })

        });

        describe('When provided with an element that already exists ', function () {

            it('Should not add it and return false', function (done) {

                var set1 = new affinity.Set({type:Number,elements: [1]});
                set1.add(1).should.be.equal(false);
                set1.elements().should.be.an.Array.and.have.length(1);

                done();


            });

        });

    });

    describe('Set#remove', function () {

        describe('When provided with an argument that exists in the set', function () {

            it('Should remove it and return true', function (done) {

                var set1 = new affinity.Set({type:Number,elements: [1, 2, 3]});

                set1.remove(1).should.be.true;
                set1.elements().should.be.an.Array.and.have.length(2);

                done();

            })

        });

        describe('When provided with an argument that does not exist in the set', function () {

            it('Should remove nothing and return false', function (done) {

                var set1 = new affinity.Set({type:Number,elements: [1, 2, 3]});

                set1.remove(4).should.be.false;
                set1.elements().should.be.an.Array.and.have.length(3);

                done();

            })

        })


    });

    describe('Set#_indexByReference', function () {


        describe('When provided with an object that exists in the set', function () {

            it('Should return its index', function (done) {

                var obj1 = new Object();

                var set1 = new affinity.Set({type:Object,elements: [obj1]});

                set1._indexByReference(obj1).should.be.equal(0);

                done();

            })

        });

        describe('When provided with an object that does not exists in the set', function () {

            it('Should return null', function (done) {

                var obj1 = new Object();

                var set1 = new affinity.Set({type:Number,elements: [1, 2, 3]});

                (set1._indexByReference(obj1) === null).should.be.true;

                done();

            })

        })

    });

    describe('Set#_indexByEquality', function () {

        describe('When provided with an object that already exists in the set', function () {

            it('Should return its index', function (done) {

                var set1 = new affinity.Set({type:Number,elements: [1]});

                set1._indexByEquality(1).should.be.equal(0);

                done();

            })

        });

        describe('When provided with an object that does not exists in the set', function () {

            it('Should return null', function (done) {

                var set1 = new affinity.Set({type:Number,elements: [1]});

                (set1._indexByEquality(2) === null).should.be.true;

                done();

            })

        })


    });

    describe('Set#index', function () {


        describe('When provided with an element that exists in the set', function(){

            it('Should return its index', function(done){

                var set1 = new affinity.Set({type:Number,elements: [1, 2, 3]});

                set1.index(1).should.be.equal(0);
                set1.index(2).should.be.equal(1);
                set1.index(3).should.be.equal(2);

                done();

            })

        });

        describe('When provided with an element that does not exists in the set', function(){

            it('Should return null', function(done){

                var set1 = new affinity.Set({type:Number,elements: [1, 2, 3]});

                (set1.index(4)===null).should.be.true;

                done();

            });

        });


    });

    describe('Set#find', function () {

        describe('When provided with an element that exists in the set', function(){

            it('Should return that element', function(done){


                var obj1 = new Object({a : 1});
                var obj2 = new Object({a : 2});

                var set1 = new affinity.Set({type:Object,elements: [obj1, obj2]});

                set1.find(obj1).should.be.equal(obj1);
                set1.find(obj1).should.not.be.equal(obj2);

                set1.find(obj2).should.be.equal(obj2);
                set1.find(obj2).should.not.be.equal(obj1);

                done();

            })

        });

        describe('When provided with an element that does not exist in the set', function(){

            it('Should return null', function(done){


                var obj1 = new Object({a : 1});
                var obj2 = new Object({a : 2});
                var obj3 = new Object({a : 3});

                var set1 = new affinity.Set({type:Object,elements: [obj1, obj2]});

                (set1.find(obj3)===null).should.be.true;

                done();

            })

        })


    });

    describe('Set#exists', function () {

        describe('When provided with an element that exists in the set', function(){

            it('Should return true', function(done){

                var set1 = new affinity.Set({type:Number,elements: [1, 2, 3]});

                set1.exists(1).should.be.true;

                done();

            })

        });

        describe('When provided with an element that does not exists in the set', function(){

            it('Should return false', function(done){

                var set1 = new affinity.Set({type:Number,elements: [1, 2, 3]});

                set1.exists(4).should.be.false;

                done();

            })

        })

    });

    describe('Set#union', function () {

        describe('When provided with two sets', function(){

            it('Should combine the two sets into a new set', function(done){

                var set1 = new affinity.Set({type:Number,elements: [1, 2, 3]});
                var set2 = new affinity.Set({type:Number,elements: [4, 5, 6]});

                var set3 = set1.setUnion(set2);

                set3.elements().should.be.an.Array.and.have.length(6);

                set3.exists(1).should.be.true;
                set3.exists(2).should.be.true;
                set3.exists(3).should.be.true;
                set3.exists(4).should.be.true;
                set3.exists(5).should.be.true;
                set3.exists(6).should.be.true;

                done();

            })

        });


    });

    describe('Set#difference', function () {

        describe('When provided with two sets', function(){

            it('Should return the elements of the first set without those of the second', function(done){

                var set1 = new affinity.Set({type:Number,elements: [1, 2, 3]});
                var set2 = new affinity.Set({type:Number,elements: [3, 4, 5]});

                var set3 = set1.setDifference(set2);

                set3.elements().should.be.an.Array.and.have.length(2);

                set3.exists(1).should.be.true;
                set3.exists(2).should.be.true;

                done();

            })

        });

        describe('When provided with two identical sets', function(){

            it('Should return an empty set', function(done){

                var set1 = new affinity.Set({type:Number,elements: [1, 2, 3]});
                var set2 = new affinity.Set({type:Number,elements: [1, 2, 3]});

                var set3 = set1.setDifference(set2);

                set3.elements().should.be.an.Array.and.have.length(0);

                done();

            })

        });

        describe('When provided with two sets with no common attributes', function(){

            it('Should return a set equal to the first', function(done){

                var set1 = new affinity.Set({type:Number,elements: [1, 2, 3]});
                var set2 = new affinity.Set({type:Number,elements: [4, 5, 6]});

                var set3 = set1.setDifference(set2);

                set3.elements().should.be.an.Array.and.have.length(3);

                done();

            })

        });

    });

    describe('Set#product', function () {

        describe('Wen provided with two sets', function(){

            it('Should return the product of those two sets', function(done){

                var set1 = new affinity.Set({type:Number,elements: [1, 2, 3]});
                var set2 = new affinity.Set({type:Number,elements: [3, 4, 5]});

                var set3 = set1.setProduct(set2);

                set3.elements().should.be.an.Array.and.have.length(9);

                set3.each(function(element){

                    element.should.be.instanceOf(affinity.Tuple);

                });

                done();

            })

        })


    });

    describe('Set#intersection', function () {

        describe('When provided with two sets', function(){

            it('Should return the elements common to the two sets', function(done){

                var set1 = new affinity.Set({type:Number,elements: [1, 2, 3]});
                var set2 = new affinity.Set({type:Number,elements: [3, 4, 5]});

                var set3 = set1.setIntersection(set2);

                set3.elements().should.be.an.Array.and.have.length(1);

                set3.exists(3).should.be.true;

                done();

            })

        });

        describe('When provided with two sets that have no common attributes', function(){

            it('Should return an empty set', function(done){

                var set1 = new affinity.Set({type:Number,elements: [1, 2, 3]});
                var set2 = new affinity.Set({type:Number,elements: [4, 5, 6]});

                var set3 = set1.setIntersection(set2);

                set3.elements().should.be.an.Array.and.have.length(0);

                done();

            })

        });

        describe('When provided with two identical sets', function(){

            it('Should return a set equal to those sets', function(done){

                var set1 = new affinity.Set({type:Number,elements: [1, 2, 3]});
                var set2 = new affinity.Set({type:Number,elements: [1, 2, 3]});

                var set3 = set1.setIntersection(set2);

                set3.elements().should.be.an.Array.and.have.length(3);

                done();

            })

        });


    });

    describe('Set#symmetricDifference', function () {

        describe('When provided with sets that have attributes in common', function(){

            it('Should return a set containing all values but those that sets had in common', function(done){

                var set1 = new affinity.Set({type:Number,elements: [1, 2, 3, 4]});
                var set2 = new affinity.Set({type:Number,elements: [3, 4, 5, 6]});

                var set3 = set1.setSymmetricDifference(set2);

                set3.elements().should.be.an.Array.and.have.length(4);

                set3.exists(1).should.be.true;
                set3.exists(2).should.be.true;
                set3.exists(5).should.be.true;
                set3.exists(6).should.be.true;

                done();

            })

        });

        describe('When provided with sets that have no attributes in common', function(){

            it('Should return the same as an union on those sets', function(done){

                var set1 = new affinity.Set({type:Number,elements: [1, 2, 3, 4]});
                var set2 = new affinity.Set({type:Number,elements: [5, 6, 7, 8]});

                var set3 = set1.setSymmetricDifference(set2);

                set3.equal(set1.setUnion(set2)).should.be.true;

                done();

            })

        });

        describe('When provided with two equal sets', function(){

            it('Should return en empty set', function(done){

                var set1 = new affinity.Set({type:Number,elements: [1, 2, 3, 4]});
                var set2 = new affinity.Set({type:Number,elements: [1, 2, 3, 4]});

                var set3 = set1.setSymmetricDifference(set2);

                set3.equal(new affinity.Set({type : Number})).should.be.true;

                done();

            })

        });

    });

    describe('Set.equal', function () {

        describe('When provided two equal sets', function(){

            it('Should return true', function(done){

                var set1 = new affinity.Set({type:Number,elements: [1, 2, 3]});
                var set2 = new affinity.Set({type:Number,elements: [1, 2, 3]});

                set1.equal(set2).should.be.true;

                done();

            })

        });

        describe('When provided two different sets', function(){

            it('Should return true', function(done){

                var set1 = new affinity.Set({type:Number,elements: [1, 2, 3]});
                var set2 = new affinity.Set({type:Number,elements: [4, 5, 6]});

                set1.equal(set2).should.be.false;

                done();

            })

        });

        describe('When provided two slightly different sets', function(){

            it('Should return true', function(done){

                var set1 = new affinity.Set({type:Number,elements: [1, 2, 3]});
                var set2 = new affinity.Set({type:Number,elements: [1, 2, 4]});

                set1.equal(set2).should.be.false;

                done();

            });

        });

        describe('When provided two empty sets', function(){

            it('Should return true', function(done){

                var set1 = new affinity.Set({type : Number});
                var set2 = new affinity.Set({type : Number});

                set1.equal(set2).should.be.true;

                done();

            });

        });

        describe('When provided two sets with different types', function(){

            it('Should return false', function(done){

                var set1 = new affinity.Set({type : Number});
                var set2 = new affinity.Set({type : Object});

                set1.equal(set2).should.be.false;
                set2.equal(set1).should.be.false;

                done();

            })

        });

        describe('When provided with an empty set and another non empty set', function(){

            it('Should return false', function(done){

                var set1 = new affinity.Set({type:Number,elements: [1, 2, 3]});
                var set2 = new affinity.Set({type : Number});

                set1.equal(set2).should.be.false;
                set2.equal(set1).should.be.false;

                done();

            })

        })

    })

});