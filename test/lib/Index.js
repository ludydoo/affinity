var affinity = require('./../../index.js');
var should = require('should');

describe('Index Class', function(){

    describe('Index#add', function(){

        describe('When given a header with multiple attributes', function(){

            it('Should be able to construct the nested index', function(done){

                var header = new affinity.Header([
                    {name : 'a', type:affinity.Integer},
                    {name : 'b', type:affinity.String},
                    {name : 'c', type:affinity.Integer}
                ]);

                var tuple1 = new affinity.Tuple({a : 1, b : 'hello', c : 2});
                var tuple2 = new affinity.Tuple({a : 1, b : 'hello', c : 3});
                var tuple3 = new affinity.Tuple({a : 2, b : 'hello', c : 4});
                var tuple4 = new affinity.Tuple({a : 2, b : 'hello', c : 5});
                var tuple5 = new affinity.Tuple({a : 5, b : 'hello', c : 6});

                var index = new affinity.Index(header);

                index.add(tuple1,1);
                index.add(tuple2,2);
                index.add(tuple3,3);
                index.add(tuple4,4);
                index.add(tuple5,5);

                done();

            });

        });

    });

    describe('Index#getIndex', function(){

        it('Should be able to retrieve the index of an index tuple', function(done){

            var header = new affinity.Header([
                {name : 'a', type:affinity.Integer},
                {name : 'b', type:affinity.String},
                {name : 'c', type:affinity.Integer}
            ]);

            var tuple1 = new affinity.Tuple({a : 1, b : 'hello', c : 2});
            var tuple2 = new affinity.Tuple({a : 1, b : 'hello', c : 3});
            var tuple3 = new affinity.Tuple({a : 2, b : 'hello', c : 4});
            var tuple4 = new affinity.Tuple({a : 2, b : 'hello', c : 5});
            var tuple5 = new affinity.Tuple({a : 5, b : 'hello', c : 6});

            var index = new affinity.Index(header);

            index.add(tuple1,1);
            index.add(tuple2,2);
            index.add(tuple3,3);
            index.add(tuple4,4);
            index.add(tuple5,5);

            index.getIndex(tuple1).should.be.equal(1);


            done();

        });

        it('Should return null if a tuple is not indexed', function(done){

            var header = new affinity.Header([
                {name : 'a', type:affinity.Integer},
                {name : 'b', type:affinity.String},
                {name : 'c', type:affinity.Integer}
            ]);

            var tuple1 = new affinity.Tuple({a : 1.1022, b : 'hello', c : 2});
            var tuple2 = new affinity.Tuple({a : 1.1022, b : 'hello', c : 3});
            var tuple3 = new affinity.Tuple({a : 2.12034, b : 'hello', c : 4});
            var tuple4 = new affinity.Tuple({a : 2.002, b : 'hello', c : 5});
            var tuple5 = new affinity.Tuple({a : 5.002, b : 'hello', c : 6});

            var index = new affinity.Index(header);

            index.add(tuple1,1);
            index.add(tuple2,2);
            index.add(tuple3,3);

            (null === index.getIndex(tuple4)).should.be.equal(true);

            done();

        });


    });

    describe('Index#remove', function(){

        it('Should be able to remove a tuple from the index', function(done){

            var header = new affinity.Header([
                {name : 'a', type:affinity.Integer},
                {name : 'b', type:affinity.String},
                {name : 'c', type:affinity.Integer}
            ]);

            var tuple1 = new affinity.Tuple({a : 1.1022, b : 'hello', c : 2});
            var tuple2 = new affinity.Tuple({a : 1.1022, b : 'hello', c : 3});
            var tuple3 = new affinity.Tuple({a : 2.12034, b : 'hello', c : 4});
            var tuple4 = new affinity.Tuple({a : 2.002, b : 'hello', c : 5});
            var tuple5 = new affinity.Tuple({a : 5.002, b : 'hello', c : 6});

            var index = new affinity.Index(header);

            index.add(tuple1,1);
            index.add(tuple2,2);
            index.add(tuple3,3);
            index.add(tuple4,4);
            index.add(tuple5,5);

            index.remove(tuple5).should.be.equal(true);

            (null === index.getIndex(tuple5)).should.be.equal(true);


            done();

        });

    });

});