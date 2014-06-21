var affinity = require('./../../../index.js');
var should = require('should');

describe('Wrap Class', function(){

   describe('When given one attribute to wrap', function(){

       it('Should be able to wrap the attribute even if it is the only one in the relation', function(done){

           var relation = new affinity.Relation([
               {firstName : {type : affinity.String}}
           ],[
               ['Bob'], ['Mark'], ['Lucy'], ['Mary'], ['Doodle']
           ]);

           var result = new affinity.Relation([
               { name : {type : affinity.Tuple}}
           ],[
                [new affinity.Tuple({firstName : 'Bob'})],
                [new affinity.Tuple({firstName : 'Mark'})],
                [new affinity.Tuple({firstName : 'Lucy'})],
                [new affinity.Tuple({firstName : 'Mary'})],
                [new affinity.Tuple({firstName : 'Doodle'})]
           ]);

           var wrapped = relation.wrap('name', ['firstName']);

           wrapped.equal(result).should.be.true;

           wrapped.print();

           done();

       });

       it('Should be able to wrap the attribute even if there are other attributes in the relation', function(done){

           var relationA = new affinity.Relation([
               { id : {type : affinity.Integer}},
               { firstName : {type : affinity.String}},
               { lastName : {type : affinity.String}},
               { alive : {type : affinity.Boolean}}
           ], [
               [1, 'Bob', 'Dylan', true],
               [2, 'Bob', 'Marley', false],
               [3, 'Bob', 'DiNiro', true],
               [4, 'Bob', 'Vaughn', true]
           ]);

           var wrapped = relationA.wrap('fn', ['firstName']);

           var result = new affinity.Relation([
               { id : {type : affinity.Integer}},
               { alive : {type : affinity.Boolean}},
               { lastName : {type : affinity.String}},
               { fn : {type : affinity.Tuple}}
           ],[
               [1, true, 'Dylan', new affinity.Tuple({firstName : 'Bob'})],
               [2, false, 'Marley', new affinity.Tuple({firstName : 'Bob'})],
               [3, true,  'DiNiro', new affinity.Tuple({firstName : 'Bob'})],
               [4, true,  'Vaughn', new affinity.Tuple({firstName : 'Bob'})]
           ]);

           wrapped.print();

           wrapped.equal(result).should.be.true;

           done();


       });

       it('Should throw if the attribute does not exist', function(done){

           var relationA = new affinity.Relation([
               { id : {type : affinity.Integer}},
               { firstName : {type : affinity.String}},
               { lastName : {type : affinity.String}},
               { alive : {type : affinity.Boolean}}
           ], [
               [1, 'Bob', 'Dylan', true],
               [2, 'Bob', 'Marley', false],
               [3, 'Bob', 'DiNiro', true],
               [4, 'Bob', 'Vaughn', true]
           ]);

           should(function(){

               var wrapped = relationA.wrap('fn', ['HOWDY!']).compute();

           }).throw();

           done();

       });

       it('Should be able to wrap an already wrapped attribute', function(done){

           var relationA = new affinity.Relation([
               { id : {type : affinity.Integer}},
               { firstName : {type : affinity.String}},
               { lastName : {type : affinity.String}},
               { alive : {type : affinity.Boolean}}
           ], [
               [1, 'Bob', 'Dylan', true],
               [2, 'Bob', 'Marley', false],
               [3, 'Bob', 'DiNiro', true],
               [4, 'Bob', 'Vaughn', true]
           ]);

           var wrapped = relationA.wrap('fn', ['firstName']);

           var wrapped2 = wrapped.wrap('fn2', ['fn']);

           var result = new affinity.Relation([
               {id : {type : affinity.Integer}},
               {alive : {type : affinity.Boolean}},
               {lastName : {type : affinity.String}},
               {fn2 : {type : affinity.Tuple}}
           ],[
               [1, true, 'Dylan', new affinity.Tuple({fn : new affinity.Tuple({firstName : 'Bob'})})],
               [2, false, 'Marley', new affinity.Tuple({fn : new affinity.Tuple({firstName : 'Bob'})})],
               [3, true, 'DiNiro', new affinity.Tuple({fn : new affinity.Tuple({firstName : 'Bob'})})],
               [4, true, 'Vaughn', new affinity.Tuple({fn : new affinity.Tuple({firstName : 'Bob'})})],
           ]);

           wrapped2.print();
           wrapped2.equal(result).should.be.true;

           done();
       });

       it('Should be able to wrap even if the wrappingAttribute name is the same as one of the wrappedAttributes', function(done){

           var relationA = new affinity.Relation([
               { id : {type : affinity.Integer}},
               { firstName : {type : affinity.String}},
               { lastName : {type : affinity.String}},
               { alive : {type : affinity.Boolean}}
           ], [
               [1, 'Bob', 'Dylan', true],
               [2, 'Bob', 'Marley', false],
               [3, 'Bob', 'DiNiro', true],
               [4, 'Bob', 'Vaughn', true]
           ]);

           var wrap = relationA.wrap('id', ['id']);

           var result = new affinity.Relation([
               {id : {type : affinity.Tuple}},
               {firstName : {type : affinity.String}},
               {lastName : {type : affinity.String}},
               {alive : {type : affinity.Boolean}},
           ],[
               [new affinity.Tuple({id : 1}), 'Bob', 'Dylan', true],
               [new affinity.Tuple({id : 2}), 'Bob', 'Marley', false],
               [new affinity.Tuple({id : 3}), 'Bob', 'DiNiro', true],
               [new affinity.Tuple({id : 4}), 'Bob', 'Vaughn', true],
           ]);

           wrap.print();

           wrap.equal(result).should.be.true;

           done()

       });

       it('Should throw if the wrappingAttribute name is the same as one of the remaining non-wrapped attributes', function(done){

           var relationA = new affinity.Relation([
               { id : {type : affinity.Integer}},
               { firstName : {type : affinity.String}},
               { lastName : {type : affinity.String}},
               { alive : {type : affinity.Boolean}}
           ], [
               [1, 'Bob', 'Dylan', true],
               [2, 'Bob', 'Marley', false],
               [3, 'Bob', 'DiNiro', true],
               [4, 'Bob', 'Vaughn', true]
           ]);

           should(function(){

               relationA.wrap('id', ['firstName', 'lastName']).compute();

           }).throw();

           done();

       })

   });

    describe('When given multiple attributes to wrap', function(){

        it('Should be able to wrap the attributes even if they constitute all the attributes of the header', function(done){

            var relationA = new affinity.Relation([
                { id : {type : affinity.Integer}},
                { firstName : {type : affinity.String}},
                { lastName : {type : affinity.String}},
                { alive : {type : affinity.Boolean}}
            ], [
                [1, 'Bob', 'Dylan', true],
                [2, 'Bob', 'Marley', false],
                [3, 'Bob', 'DiNiro', true],
                [4, 'Bob', 'Vaughn', true]
            ]);

            var wrapped = relationA.wrap('total', ['id', 'firstName', 'lastName', 'alive']);

            var result = new affinity.Relation([
                {total : {type : affinity.Tuple}}
            ],[
                [new affinity.Tuple({id : 1, firstName : 'Bob', lastName : 'Dylan', alive : true})],
                [new affinity.Tuple({id : 2, firstName : 'Bob', lastName : 'Marley', alive : false})],
                [new affinity.Tuple({id : 3, firstName : 'Bob', lastName : 'DiNiro', alive : true})],
                [new affinity.Tuple({id : 4, firstName : 'Bob', lastName : 'Vaughn', alive : true})],
            ]);

            wrapped.equal(result).should.be.true;

            wrapped.print();

            done();

        });

        it('Should be able to wrap the attributes when there are other non wrapped attributes in the header',function(done){

            var relationA = new affinity.Relation([
                { id : {type : affinity.Integer}},
                { firstName : {type : affinity.String}},
                { lastName : {type : affinity.String}},
                { alive : {type : affinity.Boolean}}
            ], [
                [1, 'Bob', 'Dylan', true],
                [2, 'Bob', 'Marley', false],
                [3, 'Bob', 'DiNiro', true],
                [4, 'Bob', 'Vaughn', true]
            ]);

            var wrapped = relationA.wrap('name', ['firstName', 'lastName']);

            var result = new affinity.Relation([
                { id : {type : affinity.Integer}},
                { alive : {type : affinity.Boolean}},
                { name : {type : affinity.Tuple}}
            ],[
                [1, true,  new affinity.Tuple({firstName : 'Bob', lastName : 'Dylan'})],
                [2, false, new affinity.Tuple({firstName : 'Bob', lastName : 'Marley'})],
                [3, true,  new affinity.Tuple({firstName : 'Bob', lastName : 'DiNiro'})],
                [4, true,  new affinity.Tuple({firstName : 'Bob', lastName : 'Vaughn'})]
            ]);

            wrapped.print();

            wrapped.equal(result).should.be.true;

            done();

        });

        it('Should throw if one of the attributes does not exist', function(done){

            var relationA = new affinity.Relation([
                { id : {type : affinity.Integer}},
                { firstName : {type : affinity.String}},
                { lastName : {type : affinity.String}},
                { alive : {type : affinity.Boolean}}
            ], [
                [1, 'Bob', 'Dylan', true],
                [2, 'Bob', 'Marley', false],
                [3, 'Bob', 'DiNiro', true],
                [4, 'Bob', 'Vaughn', true]
            ]);

            should(function(){
                var wrapped = relationA.wrap('fn', ['firstName', 'DOODY']).compute();
            }).throw();

            done();

        });

        it('Should throw if all the attributes do not exist', function(done){

            var relationA = new affinity.Relation([
                { id : {type : affinity.Integer}},
                { firstName : {type : affinity.String}},
                { lastName : {type : affinity.String}},
                { alive : {type : affinity.Boolean}}
            ], [
                [1, 'Bob', 'Dylan', true],
                [2, 'Bob', 'Marley', false],
                [3, 'Bob', 'DiNiro', true],
                [4, 'Bob', 'Vaughn', true]
            ]);

            should(function(){
                var wrapped = relationA.wrap('fn', ['HOPTY', 'DOODY']).compute();
            }).throw();

            done();

        });

        it('Should be able to wrap attributes that contain one already wrapped attribute', function(done){

            var relationA = new affinity.Relation([
                { id : {type : affinity.Integer}},
                { firstName : {type : affinity.String}},
                { lastName : {type : affinity.String}},
                { alive : {type : affinity.Boolean}}
            ], [
                [1, 'Bob', 'Dylan', true],
                [2, 'Bob', 'Marley', false],
                [3, 'Bob', 'DiNiro', true],
                [4, 'Bob', 'Vaughn', true]
            ]);

            var wrapped1 = relationA.wrap('name', ['firstName', 'lastName']);

            var wrapped2 = wrapped1.wrap('abc', ['name', 'alive']);

            var result = new affinity.Relation([
                {id : {type : affinity.Integer}},
                {abc : {type : affinity.Tuple}},
            ],[
                [1, new affinity.Tuple({alive : true,  name : new affinity.Tuple({firstName : 'Bob', lastName: 'Dylan'})})],
                [2, new affinity.Tuple({alive : false, name : new affinity.Tuple({firstName : 'Bob', lastName: 'Marley'})})],
                [3, new affinity.Tuple({alive : true,  name : new affinity.Tuple({firstName : 'Bob', lastName: 'DiNiro'})})],
                [4, new affinity.Tuple({alive : true,  name : new affinity.Tuple({firstName : 'Bob', lastName: 'Vaughn'})})]
            ]);

            wrapped2.print();

            wrapped2.equal(result).should.be.true;

            done();
        });

        it('Should be able to wrap attributes that are all already wrapped attributes', function(done){

            var relationA = new affinity.Relation([
                { id : {type : affinity.Integer}},
                { firstName : {type : affinity.String}},
                { lastName : {type : affinity.String}},
                { alive : {type : affinity.Boolean}}
            ], [
                [1, 'Bob', 'Dylan', true],
                [2, 'Bob', 'Marley', false],
                [3, 'Bob', 'DiNiro', true],
                [4, 'Bob', 'Vaughn', true]
            ]);

            var wrapped1 = relationA.wrap('a', ['firstName', 'lastName']);

            var wrapped2 = wrapped1.wrap('b', ['id', 'alive']);

            var result = new affinity.Relation([
                { a : {type : affinity.Tuple} },
                { b : {type : affinity.Tuple} }
            ],[
                [new affinity.Tuple({firstName : 'Bob', lastName : 'Dylan'}), new affinity.Tuple({id : 1, alive : true})],
                [new affinity.Tuple({firstName : 'Bob', lastName : 'Marley'}), new affinity.Tuple({id : 2, alive : false})],
                [new affinity.Tuple({firstName : 'Bob', lastName : 'DiNiro'}), new affinity.Tuple({id : 3, alive : true})],
                [new affinity.Tuple({firstName : 'Bob', lastName : 'Vaughn'}), new affinity.Tuple({id : 4, alive : true})],
            ]);

            wrapped2.print();

            wrapped2.equal(result).should.be.true;

            done();

        });

        it('Should be able to wrap even if the wrappingAttribute name is the same as one of the wrappedAttributes', function(done){

            var relationA = new affinity.Relation([
                { id : {type : affinity.Integer}},
                { firstName : {type : affinity.String}},
                { lastName : {type : affinity.String}},
                { alive : {type : affinity.Boolean}}
            ], [
                [1, 'Bob', 'Dylan', true],
                [2, 'Bob', 'Marley', false],
                [3, 'Bob', 'DiNiro', true],
                [4, 'Bob', 'Vaughn', true]
            ]);

            var wrap = relationA.wrap('id', ['id', 'alive']);

            var result = new affinity.Relation([
                {id : {type : affinity.Tuple}},
                {firstName : {type : affinity.String}},
                {lastName : {type : affinity.String}},
            ],[
                [new affinity.Tuple({id : 1, alive : true}), 'Bob', 'Dylan'],
                [new affinity.Tuple({id : 2, alive : false}), 'Bob', 'Marley'],
                [new affinity.Tuple({id : 3, alive : true}), 'Bob', 'DiNiro'],
                [new affinity.Tuple({id : 4, alive : true}), 'Bob', 'Vaughn'],
            ]);

            wrap.print();

            wrap.equal(result).should.be.true;

            done()

        });

        it('Should throw if the wrappingAttribute name is the same as one of the remaining non-wrapped attributes', function(done){

            var relationA = new affinity.Relation([
                { id : {type : affinity.Integer}},
                { firstName : {type : affinity.String}},
                { lastName : {type : affinity.String}},
                { alive : {type : affinity.Boolean}}
            ], [
                [1, 'Bob', 'Dylan', true],
                [2, 'Bob', 'Marley', false],
                [3, 'Bob', 'DiNiro', true],
                [4, 'Bob', 'Vaughn', true]
            ]);

            should(function(){
                var wrap = relationA.wrap('firstName', ['id', 'alive']).compute();
            }).throw();

            done()

        })

    });

    describe('When given no attributes to wrap', function(){

        it('Should throw', function(done){

            var relationA = new affinity.Relation([
                { id : {type : affinity.Integer}},
                { firstName : {type : affinity.String}},
                { lastName : {type : affinity.String}},
                { alive : {type : affinity.Boolean}}
            ], [
                [1, 'Bob', 'Dylan', true],
                [2, 'Bob', 'Marley', false],
                [3, 'Bob', 'DiNiro', true],
                [4, 'Bob', 'Vaughn', true]
            ]);

            should(function(){
                var wrapped1 = relationA.wrap(null, ['id', 'alive']).compute();
            }).throw();

            should(function(){
                var wrapped1 = relationA.wrap(null, ['id', 'alive']).compute();
            }).throw();

            should(function(){
                var wrapped1 = relationA.wrap(undefined, ['id', 'alive']).compute();
            }).throw();

            should(function(){
                var wrapped1 = relationA.wrap(undefined, ['id', 'alive']).compute();
            }).throw();

            should(function(){
                var wrapped1 = relationA.wrap(0, ['id', 'alive']).compute();
            }).throw();

            should(function(){
                var wrapped1 = relationA.wrap('', ['id', 'alive']).compute();
            }).throw();

            should(function(){
                var wrapped1 = relationA.wrap('abc', []).compute();
            }).throw();

            should(function(){
                var wrapped1 = relationA.wrap('abc', null).compute();
            }).throw();

            should(function(){
                var wrapped1 = relationA.wrap('abc', undefined).compute();
            }).throw();

            should(function(){
                var wrapped1 = relationA.wrap('abc', 'dandy!').compute();
            }).throw();

            done();

        });

    });

});