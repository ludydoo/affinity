var affinity = require('./../../../index.js');

var should = require('should');

var debug = require('./../../../lib/affinity/helpers/debug');

var family = new affinity.Relation([
    {id : {type : affinity.Integer}},
    {firstName : {type : affinity.String}},
    {lastName : {type : affinity.String}},
],[
    [1, 'Raymond', 'Cléroux'],
    [1, 'Michèle', 'Gaboury'],
    [1, 'Andréanne', 'Cléroux'],
    [1, 'Ludovic', 'Cléroux'],
]);



var employees = new affinity.Relation([
    {id: {type: affinity.Integer}},
    {firstName: {type: affinity.String}},
    {lastName: {type: affinity.String}},
    {dept: {type: affinity.Integer}}
], [

    [1, 'Mary', 'Louise', 1],
    [2, 'Nicolas', 'McDibbins', 2],
    [3, 'Nancy', 'Bibble', 2],
    [4, 'Mark', 'Clinton', 3],
    [5, 'Doodle', 'Nibble', 3],
    [6, 'Dong', 'Dong', 1],
    [7, 'Boy', 'Black', 3]

]);

var scores = new affinity.Relation([
    {firstName: {type: affinity.String}},
    {lastName: {type: affinity.String}},
    {score: {type: affinity.Integer}},
], [
    ['Mary', 'Louise', 56],
    ['Nicolas', 'McDibbins', 87],
    ['Mark', 'Clinton', 20],
    ['Boy', 'Black', 12],
    ['Gingo', 'Binder', 12],
]);

var depts = new affinity.Relation([
    {dept: {type: affinity.Integer}},
    {deptName: {type: affinity.Integer}},
    {opened: {type: affinity.Boolean}}
], [
    [1, 'Communication', true],
    [2, 'Sales', true],
    [3, 'R&D', true],
    [4, 'Snazzles', false],
    [5, 'Dizzles', false]
]);

var depts2 = new affinity.Relation([
    {deptName: {type: affinity.String}},
    {dept: {type: affinity.String}},
    {opened: {type: affinity.Boolean}}
]);

var pets = new affinity.Relation([
    {name: {type: affinity.String}},
    {animal: {type: affinity.String}},
    {alive: {type: affinity.Boolean}},
], [
    ['Tommy 1', 'Dog', false],
    ['Tommy 2', 'Dog', false],
    ['Zoé', 'Dog', true],
    ['Max', 'Dog', false],
    ['Maurice', 'Cat', true],
    ['Chat', 'Cat', true],
    ['Bernard', 'Cat', true],
    ['Henri', 'Hamster', false],
]);

var animals = new affinity.Relation([
    {animal: {type: affinity.String}},
    {legNumber: {type: affinity.Integer}},
    {height: {type: affinity.Integer}}
], [
    ['Dog', 4, 60],
    ['Cat', 4, 30],
    ['Hamster', 4, 8],
    ['Bird', 2, 15],
    ['Bear', 4, 120],
    ['Giraffe', 2, 800]
]);


describe('Compose Class', function () {

    describe('When provided with relations that have disjoint headers', function () {

        it('Should return a cross product if there are attributes in the two headers', function (done) {

            var combined;

            (combined = employees.compose(animals)).equal(employees.product(animals)).should.be.equal(true);

            employees.compose(animals).equal(animals.compose(employees)).should.be.equal(true);

            debug.reldump.debug(combined.toString());

            done();

        });

        it('Should return table A if composed with TABLE_DEE', function (done) {

            var combined;

            (combined = employees.compose(affinity.TABLE_DEE)).equal(employees).should.be.equal(true);

            affinity.TABLE_DEE.compose(employees).equal(combined).should.be.equal(true);

            debug.reldump.debug(combined.toString());

            done()

        });

        it('Should return empty A if composed with TABLE_DUM', function (done) {

            var combined;

            (combined = employees.compose(affinity.TABLE_DUM)).length().should.be.equal(0);

            var inverse = affinity.TABLE_DUM.compose(employees);

            combined.equal(inverse).should.be.equal(true);

            combined.header().equal(employees.header()).should.be.equal(true);

            debug.reldump.debug(combined.toString());

            done();

        })

    });

    describe('When provided with two relations that have header attributes in common', function () {

        it('Should perform the combine when there is one attribute in common', function (done) {

            var combined = employees.compose(depts);
            var inverse = (depts).compose(employees);

            combined.equal(inverse).should.be.equal(true);

            combined
                .equal(
                employees
                    .join(depts)
                    .project(['id', 'firstName', 'lastName', 'deptName', 'opened']))
                .should.be.equal(true);


            debug.reldump.debug(combined.toString());

            done();

        });

        it('Should perform the combine when there are more than one attributes in common', function (done) {

            var combined = employees.compose(scores);
            var inverse = scores.compose(employees);

            combined.equal(inverse).should.be.equal(true);

            combined
                .equal(
                employees
                    .join(scores)
                    .project(['id', 'dept', 'score'])
            ).should.be.equal(true);

            debug.reldump.debug(combined.toString());

            done();

        });

        it('Should return a semijoin when one of the relations is composed of only common attributes', function (done) {

            var other = scores.project(['firstName', 'lastName']);

            var combined = employees.compose(other);
            var inverse = other.compose(employees);

            combined.equal(inverse).should.be.equal(true);

            combined.equal((employees.sjoin(other)).project(['id', 'dept'])).should.be.equal(true);

            debug.reldump.debug(combined.toString());

            done()

        });

        it('Should return TABLE_DUM if all the attributes are in common and there are no matches', function (done) {

            var empty = new affinity.Relation(employees.header().clone());

            empty.add(new affinity.Tuple({id: 12, firstName: 'Kank', lastName: 'Monkman', dept: 3}));
            empty.add(new affinity.Tuple({id: 13, firstName: 'Doe', lastName: 'Body', dept: 3}));
            empty.add(new affinity.Tuple({id: 14, firstName: 'Lil', lastName: 'Kreiger', dept: 3}));
            empty.add(new affinity.Tuple({id: 15, firstName: 'Snap', lastName: 'Snapsman', dept: 3}));

            var combined = employees.compose(empty);
            var inverse = empty.compose(employees);

            combined.equal(inverse).should.be.equal(true);
            combined.equal(affinity.TABLE_DUM).should.be.equal(true);

            debug.reldump.debug(combined.toString());

            done();

        });

        it('Should return TABLE_DEE if all the attributes are in common and there are matches', function (done) {

            var copy = new affinity.Relation(employees.header().clone());

            employees.each(function (tuple) {
                copy.add(tuple.clone());
            });

            var combined = employees.compose(copy);
            var inverse = copy.compose(employees);

            combined.equal(inverse).should.be.equal(true);

            combined.equal(affinity.TABLE_DEE).should.be.equal(true);

            debug.reldump.debug(combined.toString());

            done();

        });

        it('Should throw if headers have attributes of the same name but not of the same type', function (done) {

            should(function () {
                depts.compose(depts2).compute()
            }).throw();

            done();

        })

    });

    describe('When adding tuples from the base relations', function(){

        it('Should be able to add these tuples to the composed relation', function(done){

            var composed = pets.compose(animals);

            composed.compute();

            pets.add({name : 'Zoé2', alive : false, animal : 'Dog'});

            composed.restrict(pets.get('name').eq('Zoé2')).length().should.be.equal(1);

            composed.print();

            done();

        });

    });

    describe('When removing tuples from the base relation', function(){

        it('Should be able to remove these tuples from the resulting relation', function(done){

            var composed = pets.compose(animals);

            composed.compute();

            pets.remove({name : 'Zoé', alive : true, animal : 'Dog'});

            composed.restrict(pets.get('name').eq('Zoé')).length().should.be.equal(0);

            composed.print();

            done();

        });

    });

    describe('When adding tuples to the base relations', function(){

        it.only('Should add the tuple to the resulting relation if it creates a new combination of attribute values', function(done){

            var left = new affinity.Relation([
                    { FirstName : { type : affinity.String} },
                    { MiddleName : { type : affinity.String} }
                ],[
                    ['Ludovic', 'Jr'],
                    ['Ludovic', 'Sr']
                ]);

            var right = new affinity.Relation([
                { MiddleName : { type : affinity.String} },
                { LastName : { type : affinity.String} }
            ],[
                ['Jr', 'Cléroux']
            ]);

            var result = left.compose(right);

            result.compute();

            right.add({MiddleName : 'Sr', LastName : 'Dongle'});

            var fn = result.get('FirstName');
            var ln = result.get('LastName');

            result.restrict(fn.eq('Ludovic').and(ln.eq('Dongle'))).length().should.be.equal(1);

            result.print();

            done();

        });

    });

    describe('When removing tuples from the base relations', function(){



    });

    describe('When updating tuples from the base relations', function(){



    });

});