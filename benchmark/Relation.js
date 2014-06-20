var Benchmark = require('benchmark');
var ra = require('./../index.js');

var suite = new Benchmark.Suite;

suite.add('Relation#constructor raw', function(){

    new ra.Relation([
        {a : {type : ra.Integer}},
        {b : {type : ra.Integer}},
        {c : {type : ra.Integer}}
    ],[
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ]);

});

suite.add('Relation#constructor obj', function(){

    new ra.Relation(new ra.Header({
        a : new ra.Attribute({type : ra.Integer}),
        b : new ra.Attribute({type : ra.Integer}),
        c : new ra.Attribute({type : ra.Integer})
    }),[
        new ra.Tuple({a : 1, b : 2, c : 3}),
        new ra.Tuple({a : 4, b : 5, c : 6}),
        new ra.Tuple({a : 7, b : 8, c : 9})
    ]);

});

suite.on('cycle', function(event) {
    console.log(String(event.target));
});

suite.on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').pluck('name'));
});


suite.run();