var affinity = require('./../../../index.js');

var relation = new affinity.Relation([
    { id : {type : affinity.Integer} },
    { name : {type : affinity.String} },
    { age : {type : affinity.Integer} }
],[
    [1, 'John Doe', 23],
    [2, 'John Doe', 35],
    [3, 'John Doe', 27],
    [4, 'Bo Derek', 12],
    [5, 'Bo Derek', 7],
    [6, 'Marilyn Monroe', 16]
]);

var relation2 = new affinity.Relation([
        { dept : { type : affinity.String} },
        { level : { type : affinity.Integer} },
        { salary : { type : affinity.Float} }
    ],[
        ['Sales', 1, 200.00],
        ['Sales', 1, 350.00],
        ['Sales', 2, 400.00],
        ['Sales', 2, 150.00],
        ['Sales', 2, 100.00],
        ['Sales', 3, 160.00],
        ['Sales', 3, 100.00],
        ['Com', 1, 500.00],
        ['Com', 1, 200.00],
        ['Com', 2, 500.00],
        ['Com', 2, 600.00],
        ['Com', 2, 200.00]
    ]);

var age = relation.get('age');

describe('Summarize Class', function(){

    describe('When given one attribute to summarize and one summary expression', function(){
        
        it('Should be able to add that summary expression', function(done){

            var summarized = relation.summarize(
                ['name'],
                [
                    { "age.avg()" : age.avg()        }
                ]
            );

            var johnDoeAvg = relation.restrict(relation.get('name').eq('John Doe')).get('age').avg().value();
            var boDerekAvg = relation.restrict(relation.get('name').eq('Bo Derek')).get('age').avg().value();
            var marilynMonroeAvg = relation.restrict(relation.get('name').eq('Marilyn Monroe')).get('age').avg().value();

            summarized.exists({name : 'John Doe', 'age.avg()' : johnDoeAvg}).should.be.equal(true);
            summarized.exists({name : 'Bo Derek', 'age.avg()' : boDerekAvg}).should.be.equal(true);
            summarized.exists({name : 'Marilyn Monroe', 'age.avg()' : marilynMonroeAvg}).should.be.equal(true);

            summarized.print();
            
            done();
        
        });
        
    });

    describe('When given multiple attributes to summarize', function(){

        it('Should be able to perform a summary on those attributes', function(done){

            var summarized = relation2.summarize(['dept', 'level'], [{ 'salary.avg()' : relation2.get('salary').avg()}]);

            var deptLevelCombinations = relation2.project(['dept', 'level']);

            summarized.print();

            deptLevelCombinations.each(function(combination){

                var dept = relation2.get('dept');
                var level = relation2.get('level');

                var deptValue = combination.get('dept');
                var levelValue = combination.get('level');

                var avg = relation2.restrict(dept.eq(deptValue).and(level.eq(levelValue))).get('salary').avg().value();

                var tuple = {};

                tuple.dept = deptValue;
                tuple.level = levelValue;
                tuple['salary.avg()'] = avg;

                summarized.exists(tuple).should.be.equal(true);

            });



            done();

        });

    });

});