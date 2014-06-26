var affinity = require('./../../index.js');
var should = require('should');
var _ = require('lodash');
var debug = require('./../../lib/affinity/helpers/debug');
var sinon = require('sinon');

describe('Relation class', function () {

    describe('Relation#constructor', function () {

        describe('When arguments are passed in raw format', function () {

            it('Should create the header and map the attributes with the header', function (done) {

                var data =
                        [
                            [1, 2, 3],
                            [4, 5, 6],
                            [7, 8, 9]
                        ];

                var relation = new affinity.Relation(
                    [
                        {attr1: {type: affinity.Integer}},
                        {attr2: {type: affinity.Integer}},
                        {attr3: {type: affinity.Integer}}
                    ],
                    data
                );

                relation.count().should.be.equal(3);
                relation.header().count().should.be.equal(3);

                _.forEach(relation.body(), function (tuple, index) {

                    tuple.attributes.should.have.properties(['attr1', 'attr2', 'attr3']);
                    tuple.attributes.attr1.should.be.equal(data[index][0]);
                    tuple.attributes.attr2.should.be.equal(data[index][1]);
                    tuple.attributes.attr3.should.be.equal(data[index][2]);

                }, this);

                relation.header().elements().should.be.an.Array.and.have.length(3);

                debug.reldump.debug(relation.toString());

                done();

            });

        });

        describe('When arguments are passed in instance format', function () {

            it('Should create the header with those arguments', function (done) {

                var tuple1 = new affinity.Tuple({a: 1, b: 2, c: 3});
                var tuple2 = new affinity.Tuple({a: 4, b: 5, c: 6});
                var tuple3 = new affinity.Tuple({a: 7, b: 8, c: 9});

                var data =
                        [
                            tuple1,
                            tuple2,
                            tuple3
                        ];

                var header = new affinity.Header({a: {type: affinity.Integer}, b: {type: affinity.Integer}, c: {type: affinity.Integer}});

                var relation = new affinity.Relation(header, data);

                relation.should.have.property('_header');
                relation.header().should.be.equal(header);

                relation.count().should.be.equal(3);
                relation.header().count().should.be.equal(3);

                relation.atIndex(0).should.be.equal(data[0]);
                relation.atIndex(1).should.be.equal(data[1]);
                relation.atIndex(2).should.be.equal(data[2]);

                debug.reldump.debug(relation.toString());

                done();

            });

        });

        describe('When the header is passed in raw format and the tuples in instance format', function () {

            it('Should create the header with those arguments', function (done) {

                var tuple1 = new affinity.Tuple({a: 1, b: 2, c: 3});
                var tuple2 = new affinity.Tuple({a: 4, b: 5, c: 6});
                var tuple3 = new affinity.Tuple({a: 7, b: 8, c: 9});

                var data =
                        [
                            tuple1,
                            tuple2,
                            tuple3
                        ];

                var header = [
                    {a: {type: affinity.Integer}},
                    {b: {type: affinity.Integer}},
                    {c: {type: affinity.Integer}}
                ];

                var relation = new affinity.Relation(header, data);

                relation.should.have.property('_header');
                relation.header().should.have.property('attributes');
                Object.keys(relation.header().attributes()).should.be.an.Array.and.have.length(3);

                relation.count().should.be.equal(3);
                relation.header().count().should.be.equal(3);

                relation.atIndex(0).should.be.equal(data[0]);
                relation.atIndex(1).should.be.equal(data[1]);
                relation.atIndex(2).should.be.equal(data[2]);

                debug.reldump.debug(relation.toString());

                done();

            });

        });

        describe('When too many arguments are passed in raw format', function () {

            it('Should throw', function (done) {

                var data =
                        [
                            [1, 2, 3, 4],
                            [5, 6, 7],
                            [9, 10, 11]
                        ];

                should(function () {
                    new affinity.Relation(
                        [
                            {attr1: {type: affinity.Integer}},
                            {attr2: {type: affinity.Integer}},
                            {attr3: {type: affinity.Integer}}
                        ],
                        data
                    );
                }).throw();

                done();

            });

        });

        describe('When too little arguments are passed in raw format', function () {

            it('Should throw', function (done) {

                var data =
                        [
                            [1, 2],
                            [3, 4, 5],
                            [6, 7, 8]
                        ];

                should(function () {
                    new affinity.Relation(
                        [
                            {attr1: affinity.Integer},
                            {attr2: affinity.Integer},
                            {attr3: affinity.Integer}
                        ],
                        data
                    );
                }).throw();

                done();

            });

        });

        describe('When too many arguments are passed in object format', function () {

            it('Should throw', function (done) {

                var tuple1 = new affinity.Tuple({a: 1, b: 2, c: 3, d: 4});
                var tuple2 = new affinity.Tuple({a: 4, b: 5, c: 6});
                var tuple3 = new affinity.Tuple({a: 7, b: 8, c: 9});

                var data =
                        [
                            tuple1,
                            tuple2,
                            tuple3
                        ];

                var header = new affinity.Header([
                    {a: {type: affinity.Integer}},
                    {b: {type: affinity.Integer}},
                    {c: {type: affinity.Integer}}
                ]);


                should(function () {
                    var relation = new affinity.Relation(header, data);
                }).throw();

                done();

            });

        });

        describe('When too little arguments are passed in object format', function () {

            it('Should throw', function (done) {

                var tuple1 = new affinity.Tuple({a: 1, b: 2});
                var tuple2 = new affinity.Tuple({a: 4, b: 5, c: 6});
                var tuple3 = new affinity.Tuple({a: 7, b: 8, c: 9});

                var data =
                        [
                            tuple1,
                            tuple2,
                            tuple3
                        ];

                var header = new affinity.Header([
                    {a: {type: affinity.Integer}},
                    {b: {type: affinity.Integer}},
                    {c: {type: affinity.Integer}}
                ]);

                should(function () {
                    var relation = new affinity.Relation(header, data);
                }).throw();

                done();

            });

        });

        describe('When the header is passed in instance format and the body in raw format', function () {

            it('Should throw', function (done) {

                var data =
                        [
                            [1, 2, 3],
                            [3, 4, 5],
                            [6, 7, 8]
                        ];

                var header = new affinity.Header({
                    a: {type: affinity.Integer},
                    b: {type: affinity.Integer},
                    c: {type: affinity.Integer}
                });

                should(function () {
                    var relation = new affinity.Relation(header, data);
                }).throw();

                done();

            });

        });

        describe('When provided with key arguments', function(){

            it('Should be able to index the tuples when one key is defined', function(done){

                var relation = new affinity.Relation([
                        { a : { type : affinity.Integer} },
                        { b : { type : affinity.Integer }},
                        { c : { type : affinity.Integer }},
                    ],[
                        [1, 2, 3],
                        [4, 5, 6],
                        [7, 8, 9],
                        [10, 11, 12]
                    ],{
                        pk : ['a'],
                        unique : [['b', 'c']]
                    }
                );

                done();

            });

            it('Should be able to index the tuples if multiple keys were defined', function(done){

                var relation = new affinity.Relation([
                        { a : { type : affinity.Integer} },
                        { b : { type : affinity.Integer }},
                        { c : { type : affinity.Integer }},
                    ],[
                        [1, 2, 3],
                        [4, 5, 6],
                        [7, 8, 9],
                        [10, 11, 12]
                    ],{
                        pk : ['a'],
                        unique : [['b', 'c']]
                    }
                );

                relation.index({a : 1, b : 2, c : 3}).should.be.equal(0);

                done();

            });

            it('Should throw if two keys are not unique', function(done){

                should(function(){
                    var relation = new affinity.Relation([
                            { a : { type : affinity.Integer} },
                            { b : { type : affinity.Integer }},
                            { c : { type : affinity.Integer }},
                        ],[
                            [1, 2, 3],
                            [4, 5, 6],
                            [7, 8, 9],
                            [10, 11, 12]
                        ],{
                            pk : ['a'],
                            unique : [['a']]
                        }
                    );
                }).throw();

                should(function(){
                    var relation = new affinity.Relation([
                            { a : { type : affinity.Integer} },
                            { b : { type : affinity.Integer }},
                            { c : { type : affinity.Integer }},
                        ],[
                            [1, 2, 3],
                            [4, 5, 6],
                            [7, 8, 9],
                            [10, 11, 12]
                        ],{
                            pk : ['a', 'b'],
                            unique : [['b','a']]
                        }
                    );
                }).throw();

                should(function(){
                    var relation = new affinity.Relation([
                            { a : { type : affinity.Integer} },
                            { b : { type : affinity.Integer }},
                            { c : { type : affinity.Integer }},
                        ],[
                            [1, 2, 3],
                            [4, 5, 6],
                            [7, 8, 9],
                            [10, 11, 12]
                        ],{
                            pk : ['a', 'b'],
                            unique : [['b','a'], ['a'], ['b']]
                        }
                    );
                }).throw();

                done();

            });

            it('Should throw if two keys are not irreducible', function(done){

                should(function(){
                    var relation = new affinity.Relation([
                            { a : { type : affinity.Integer} },
                            { b : { type : affinity.Integer }},
                            { c : { type : affinity.Integer }},
                        ],[
                            [1, 2, 3],
                            [4, 5, 6],
                            [7, 8, 9],
                            [10, 11, 12]
                        ],{
                            pk : ['a'],
                            unique : [['a','b']]
                        }
                    );
                }).throw();

                should(function(){
                    var relation = new affinity.Relation([
                            { a : { type : affinity.Integer} },
                            { b : { type : affinity.Integer }},
                            { c : { type : affinity.Integer }},
                        ],[
                            [1, 2, 3],
                            [4, 5, 6],
                            [7, 8, 9],
                            [10, 11, 12]
                        ],{
                            pk : ['a', 'b','c'],
                            unique : [['b','a']]
                        }
                    );
                }).throw();

                should(function(){
                    var relation = new affinity.Relation([
                            { a : { type : affinity.Integer} },
                            { b : { type : affinity.Integer }},
                            { c : { type : affinity.Integer }},
                        ],[
                            [1, 2, 3],
                            [4, 5, 6],
                            [7, 8, 9],
                            [10, 11, 12]
                        ],{
                            pk : ['a', 'b'],
                            unique : [['b','a','c'], ['a'], ['b']]
                        }
                    );
                }).throw();

                done();

            });

            it('Should throw if a key is set on a Object-valued attribute which has no serialize method', function(done){

                should(function(){

                    var relation = new affinity.Relation([
                        { obj : { type : affinity.Object} }
                    ],[
                        [{a : 1, b : 2}],
                        [{c : 1, d : 2}]
                    ],{
                        pk : ['obj']
                    });

                    done();

                }).throw();

                done();

            });

            it('Should be able to set a key on an Object-valued attribute that has a serialize method', function(done){

                var relation = new affinity.Relation([
                    { obj : { type : affinity.Date} }
                ],[
                    [new Date(2014, 10, 10)],
                    [new Date(2014, 10, 12)]
                ],{
                    pk : ['obj']
                });

                done();

            });

            it('Should be able to set a key on a Date-valued attribute', function(done){

                var relation = new affinity.Relation([
                    { date : { type : affinity.Date} }
                ],[
                    [new Date(2010, 5, 5)],
                    [new Date(2014, 10, 10)]
                ],{
                    pk : ['date']
                });

                done();

            });

        });

    });

    describe('Relation#add', function () {

        describe('When provided with a union compatible tuple', function () {

            it('Should add the tuple to the relation', function (done) {

                var header = new affinity.Header({
                    a: {type: affinity.Integer},
                    b: {type: affinity.Integer},
                    c: {type: affinity.Integer}
                });

                var tuple = new affinity.Tuple({a: 1, b: 2, c: 3});

                var relation = new affinity.Relation(header);

                relation.add(tuple);

                relation.count().should.be.equal(1);
                relation.header().count().should.be.equal(3);

                relation.atIndex(0).should.be.equal(tuple);

                debug.reldump.debug(relation.toString());

                done();

            });

        });

        describe('When provided with a non union compatible tuple', function () {

            it('Should throw', function (done) {

                var header = new affinity.Header([
                    {a: {type: affinity.Integer}},
                    {b: {type: affinity.Integer}},
                    {c: {type: affinity.Integer}}
                ]);

                var tuple = new affinity.Tuple({a: 1, b: 2, c: 3, d: 4});

                var relation = new affinity.Relation(header);

                should(function () {
                    relation.add(tuple);
                }).throw();

                done();

            });

        });

        describe('When provided with a union compatible raw tuple', function () {

            it('Should coerce it to tuple object and add it to the body', function (done) {

                var header = new affinity.Header({
                    a: {type: affinity.Integer},
                    b: {type: affinity.Integer},
                    c: {type: affinity.Integer}
                });

                var tuple = {a: 1, b: 2, c: 3};

                var relation = new affinity.Relation(header);

                relation.add(tuple);

                relation.count().should.be.equal(1);
                relation.header().count().should.be.equal(3);

                debug.reldump.debug(relation.toString());

                done();

            });

        });

        describe('When provided with a non union-compatible raw tuple', function () {

            it('Should throw', function (done) {

                var header = new affinity.Header([
                    {a: {type: affinity.Integer}},
                    {b: {type: affinity.Integer}},
                    {c: {type: affinity.Integer}}
                ]);

                var tuple = {a: 1, b: 2, c: 3, d: 4};

                var relation = new affinity.Relation(header);

                should(function () {
                    relation.add(tuple);
                }).throw();

                done();

            });

        });

        describe('When provided with a duplicate raw tuple', function () {

            it('Should not add it', function (done) {

                var header = new affinity.Header({
                    a: {type: affinity.Integer},
                    b: {type: affinity.Integer},
                    c: {type: affinity.Integer}
                });

                var tuple1 = {a: 1, b: 2, c: 3};
                var tuple2 = {a: 1, b: 2, c: 3};

                var relation = new affinity.Relation(header);

                relation.add(tuple1);
                relation.add(tuple2);

                relation.count().should.be.equal(1);
                relation.header().count().should.be.equal(3);

                debug.reldump.debug(relation.toString());

                done();

            });

        });

        describe('When provided with a duplicate instance tuple', function () {

            it('Should not add it', function (done) {

                var header = new affinity.Header({
                    a: {type: affinity.Integer},
                    b: {type: affinity.Integer},
                    c: {type: affinity.Integer}
                });

                var tuple1 = new affinity.Tuple({a: 1, b: 2, c: 3});
                var tuple2 = new affinity.Tuple({a: 1, b: 2, c: 3});

                var relation = new affinity.Relation(header);

                relation.add(tuple1);
                relation.add(tuple2);

                relation.count().should.be.equal(1);
                relation.header().count().should.be.equal(3);

                debug.reldump.debug(relation.toString());

                done();

            });

        });

    });

});