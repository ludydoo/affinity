var affinity = require('./../../index.js');
var should = require('should');

describe('Header Class', function () {

    describe('Header()', function () {

        describe('When called with no attributes', function () {

            it('Should return header with no attributes', function (done) {

                var header = new affinity.Header();

                header.count().should.be.equal(0);

                (Object.keys(header.attributes)).should.be.an.Array.and.have.length(0);

                done();

            });

        });

        describe('When called with attributes', function(){

            it('Should create a header with the same given attributes', function(done){

                var attribute1 = new affinity.Attribute({type : affinity.String});
                var attribute2 = new affinity.Attribute({type : affinity.Integer});

                var header = new affinity.Header([
                        {attribute1 : attribute1},
                        {attribute2 : attribute2}
                    ]);

                header.count().should.be.equal(2);
                header.elements().should.be.an.Array.and.have.length(2);

                header.get('attribute1').should.equal(attribute1);
                header.get('attribute2').should.equal(attribute2);

                done();

            });

        });

    });

    describe('Header#clone', function(){

        describe('When the header is empty', function(){

            it('Should return a new empty header', function(done){

                var header = new affinity.Header();

                var clonedHeader = header.clone();

                header.count().should.be.equal(0);
                Object.keys(clonedHeader.attributes).should.be.an.Array.and.have.length(0);

                clonedHeader.should.not.be.equal(header);

                done();

            })

        });

        describe('When the header is not empty', function(){

            it('Should return a new header with the same attributes', function(done){

                var attribute1 = new affinity.Attribute({type : affinity.Integer});
                var attribute2 = new affinity.Attribute({type : affinity.Integer});

                var header = new affinity.Header({attribute1 : attribute1, attribute2 : attribute2});

                var clonedHeader = header.clone();

                clonedHeader.count().should.be.equal(2);
                Object.keys(clonedHeader.elements()).should.be.an.Array.and.have.length(2);

                (clonedHeader instanceof affinity.Header).should.be.true;

                clonedHeader._attributes.should.have.property('attribute1');
                clonedHeader._attributes.should.have.property('attribute2');

                var clonedAttribute1 = clonedHeader.get('attribute1');
                var clonedAttribute2 = clonedHeader.get('attribute2');

                clonedAttribute1.should.not.be.equal(attribute1);
                clonedAttribute2.should.not.be.equal(attribute2);

                clonedAttribute1.type.should.be.equal(attribute1.type);
                clonedAttribute2.type.should.be.equal(attribute2.type);

                clonedHeader.should.not.be.equal(header);

                done();

            })

        })

    });

    describe('Header#project', function(){

        describe('When called with attribute objects', function(){

            it('Should return a projected operation on those headers', function(done){

                var attribute1 = new affinity.Attribute({type : affinity.Integer}),
                    attribute2 = new affinity.Attribute({type : affinity.Integer}),
                    attribute3 = new affinity.Attribute({type : affinity.Integer});

                var header = new affinity.Header({
                    attribute1 : attribute1,
                    attribute2 : attribute2,
                    attribute3 : attribute3
                });

                var projectedHeader = header.project([attribute1, attribute2]);

                projectedHeader.count().should.be.equal(2);

                projectedHeader._attributes.should.have.property('attribute1');
                projectedHeader._attributes.should.have.property('attribute2');

                done();

            });

        });

        describe('When called with attributes names', function(){

            it('Should return a projected header on those attributes', function(done){

                var attribute1 = new affinity.Attribute({type:affinity.Integer}),
                    attribute2 = new affinity.Attribute({type:affinity.Integer}),
                    attribute3 = new affinity.Attribute({type:affinity.Integer});

                var header = new affinity.Header({
                    attribute1 : attribute1,
                    attribute2 : attribute2,
                    attribute3 : attribute3
                });

                var projectedHeader = header.project(['attribute1', 'attribute2']);

                projectedHeader.count().should.be.equal(2);
                projectedHeader.elements().should.be.an.Array.and.have.length(2);

                projectedHeader._attributes.should.have.property('attribute1');
                projectedHeader._attributes.should.have.property('attribute2');

                done();


            });

        });

        describe('When called with attributes that don\'t exist in the header', function(){

           it('Should throw an error', function(done){

               var attribute1 = new affinity.Attribute({type:affinity.Integer}),
                   attribute2 = new affinity.Attribute({type:affinity.Integer}),
                   attribute3 = new affinity.Attribute({type:affinity.Integer});

               var header = new affinity.Header({
                   attribute1 : attribute1,
                   attribute2 : attribute2
               });

               should(function(){
                   header.project([attribute2, attribute3])
               }).throw();

               done();

           });

        });

        describe('When called with named attributes that don\'t exist in the header', function(){

            it('Should throw an error', function(done){

                var attribute1 = new affinity.Attribute({type:affinity.Integer}),
                    attribute2 = new affinity.Attribute({type:affinity.Integer});

                var header = new affinity.Header({
                    attribute1 : attribute1,
                    attribute2 : attribute2
                });

                should(function(){
                    header.project(['attribute1', 'attribute3'])
                }).throw();

                done();

            });

        });

    });

    describe('Header#remove', function(){

        describe('When provided with an array of attribute objects', function(){

            it('Should remove these attributes from the resulting header', function(done){

                var attribute1 = new affinity.Attribute({type:affinity.Integer});
                var attribute2 = new affinity.Attribute({type:affinity.Integer});
                var attribute3 = new affinity.Attribute({type:affinity.Integer});

                var header = new affinity.Header({attribute1 : attribute1, attribute2: attribute2, attribute3: attribute3});

                var removalHeader = header.remove([attribute1, attribute2]);

                removalHeader.count().should.be.equal(1);
                removalHeader.elements().should.be.an.Array.and.have.length(1);

                removalHeader._attributes.should.have.property('attribute3');

                removalHeader.get('attribute3').should.not.be.equal(attribute3);

                done();

            });

        });

        describe('When provided with an array of string', function(){

            it('Should remove these attributes from the resulting header', function(done){

                var attribute1 = new affinity.Attribute({type:affinity.Integer});
                var attribute2 = new affinity.Attribute({type:affinity.Integer});
                var attribute3 = new affinity.Attribute({type:affinity.Integer});

                var header = new affinity.Header({attribute1 : attribute1, attribute2: attribute2, attribute3: attribute3});

                var removalHeader = header.remove(['attribute1', 'attribute2']);

                removalHeader.count().should.be.equal(1);
                removalHeader.elements().should.be.an.Array.and.have.length(1);

                removalHeader._attributes.should.have.property('attribute3');

                removalHeader.get('attribute3').should.not.be.equal(attribute3);

                done();

            });

        });

        describe('When provided with an attribute object', function(){

            it('Should remove this attribute from the resulting header', function(done){

                var attribute1 = new affinity.Attribute({type:affinity.Integer});
                var attribute2 = new affinity.Attribute({type:affinity.Integer});
                var attribute3 = new affinity.Attribute({type:affinity.Integer});

                var header = new affinity.Header({attribute1 : attribute1, attribute2: attribute2, attribute3: attribute3});

                var removalHeader = header.remove(attribute1);

                removalHeader.count().should.be.equal(2);
                removalHeader.elements().should.be.an.Array.and.have.length(2);

                removalHeader._attributes.should.have.property('attribute2');
                removalHeader._attributes.should.have.property('attribute3');

                removalHeader.get('attribute2').should.not.be.equal(attribute2);
                removalHeader.get('attribute3').should.not.be.equal(attribute3);

                done();

            });

        });

        describe('When provided with an attribute name', function(){

            it('Should remove this attribute from the resulting header', function(done){

                var attribute1 = new affinity.Attribute({type:affinity.Integer});
                var attribute2 = new affinity.Attribute({type:affinity.Integer});
                var attribute3 = new affinity.Attribute({type:affinity.Integer});

                var header = new affinity.Header({attribute1 : attribute1, attribute2: attribute2, attribute3: attribute3});

                var removalHeader = header.remove('attribute1');

                removalHeader.count().should.be.equal(2);
                removalHeader.elements().should.be.an.Array.and.have.length(2);

                removalHeader._attributes.should.have.property('attribute2');
                removalHeader._attributes.should.have.property('attribute3');

                removalHeader.get('attribute2').should.not.be.equal(attribute2);
                removalHeader.get('attribute3').should.not.be.equal(attribute3);

                done();

            });

        });

        describe('When provided with a mix of string and attribute objects', function(){

            it('Should remove these attributes from the resulting header', function(done){

                var attribute1 = new affinity.Attribute({type:affinity.Integer});
                var attribute2 = new affinity.Attribute({type:affinity.Integer});
                var attribute3 = new affinity.Attribute({type:affinity.Integer});

                var header = new affinity.Header({attribute1 : attribute1, attribute2: attribute2, attribute3: attribute3});

                var removalHeader = header.remove(['attribute1', attribute2]);

                removalHeader.count().should.be.equal(1);
                removalHeader.elements().should.be.an.Array.and.have.length(1);

                removalHeader._attributes.should.have.property('attribute3');

                removalHeader.get('attribute3').should.not.be.equal(attribute3);

                done();

            });

        });

        describe('When provided with attributes that don\'t exist in the header', function(){

            it('Should throw', function(done){

                var attribute1 = new affinity.Attribute({type:affinity.Integer});
                var attribute2 = new affinity.Attribute({type:affinity.Integer});
                var attribute3 = new affinity.Attribute({type:affinity.Integer});
                var attribute4 = new affinity.Attribute({type:affinity.Integer});

                var header = new affinity.Header({attribute1 : attribute1, attribute2: attribute2, attribute3: attribute3});

                should(function(){
                    header.remove([attribute3, attribute4]);
                }).throw();

                done();

            });

        });

        describe('When provided with attribute names that don\'t exist in the header', function(){

            it('Should throw', function(done){

                var attribute1 = new affinity.Attribute({type:affinity.Integer});
                var attribute2 = new affinity.Attribute({type:affinity.Integer});
                var attribute3 = new affinity.Attribute({type:affinity.Integer});
                var attribute4 = new affinity.Attribute({type:affinity.Integer});

                var header = new affinity.Header({attribute1 : attribute1, attribute2: attribute2, attribute3: attribute3});

                should(function(){
                    header.remove(['attribute3', 'attribute4']);
                }).throw();

                done();

            });

        });

        describe('When provided with an attribute object that does\'t exist in the header', function(){

            it('Should throw', function(done){

                var attribute1 = new affinity.Attribute({type:affinity.Integer});
                var attribute2 = new affinity.Attribute({type:affinity.Integer});
                var attribute3 = new affinity.Attribute({type:affinity.Integer});
                var attribute4 = new affinity.Attribute({type:affinity.Integer});

                var header = new affinity.Header({attribute1 : attribute1, attribute2: attribute2, attribute3: attribute3});

                should(function(){
                    header.remove(attribute4);
                }).throw();

                done();

            });

        });

        describe('When provided with an attribute name that does\'t exist in the header', function(){

            it('Should throw', function(done){

                var attribute1 = new affinity.Attribute({type:affinity.Integer});
                var attribute2 = new affinity.Attribute({type:affinity.Integer});
                var attribute3 = new affinity.Attribute({type:affinity.Integer});
                var attribute4 = new affinity.Attribute({type:affinity.Integer});

                var header = new affinity.Header({attribute1 : attribute1, attribute2: attribute2, attribute3: attribute3});

                should(function(){
                    header.remove('attribute4');
                }).throw();

                done();

            });

        });

    });

    describe('Header#rename', function(){

        describe('When renaming part of the attributes', function(){

            it('Should rename these attributes only', function(done){

                var attribute1 = new affinity.Attribute({type:affinity.Integer});
                var attribute2 = new affinity.Attribute({type:affinity.Integer});
                var attribute3 = new affinity.Attribute({type:affinity.Integer});

                var header = new affinity.Header({attribute1 : attribute1, attribute2: attribute2, attribute3 : attribute3});

                var renamedHeader = header.rename({attribute1 : 'attr1', attribute2 : 'attr2'});

                var attributes = renamedHeader._attributes;

                renamedHeader.count().should.be.equal(3);
                renamedHeader.elements().should.be.an.Array.and.have.length(3);

                attributes.should.have.property('attr1');
                attributes.should.have.property('attr2');
                attributes.should.have.property('attribute3');

                renamedHeader.get('attr1').should.not.be.equal(attribute1);
                renamedHeader.get('attr2').should.not.be.equal(attribute2);
                renamedHeader.get('attribute3').should.not.be.equal(attribute3);

                renamedHeader.get('attr1').should.be.instanceOf(affinity.Attribute);
                renamedHeader.get('attr2').should.be.instanceOf(affinity.Attribute);
                renamedHeader.get('attribute3').should.be.instanceOf(affinity.Attribute);

                done();

            })

        });

        describe('When renaming all of the attributes', function(){

            it('Should rename all attributes', function(done){

                var attribute1 = new affinity.Attribute({type:affinity.Integer});
                var attribute2 = new affinity.Attribute({type:affinity.Integer});
                var attribute3 = new affinity.Attribute({type:affinity.Integer});

                var header = new affinity.Header({attribute1 : attribute1, attribute2: attribute2, attribute3 : attribute3});

                var renamedHeader = header.rename({attribute1 : 'attr1', attribute2 : 'attr2', attribute3 : 'attr3'});

                var attributes = renamedHeader._attributes;

                renamedHeader.count().should.be.equal(3);
                renamedHeader.elements().should.be.an.Array.and.have.length(3);

                attributes.should.have.property('attr1');
                attributes.should.have.property('attr2');
                attributes.should.have.property('attr3');

                renamedHeader.get('attr1').should.not.be.equal(attribute1);
                renamedHeader.get('attr2').should.not.be.equal(attribute2);
                renamedHeader.get('attr3').should.not.be.equal(attribute3);

                renamedHeader.get('attr1').should.be.instanceOf(affinity.Attribute);
                renamedHeader.get('attr2').should.be.instanceOf(affinity.Attribute);
                renamedHeader.get('attr3').should.be.instanceOf(affinity.Attribute);

                done();

            })

        });

        describe('When renaming nothing', function(){

            it('Should rename nothing', function(done){

                var attribute1 = new affinity.Attribute({type:affinity.Integer});
                var attribute2 = new affinity.Attribute({type:affinity.Integer});
                var attribute3 = new affinity.Attribute({type:affinity.Integer});

                var header = new affinity.Header({attribute1 : attribute1, attribute2: attribute2, attribute3 : attribute3});

                var renamedHeader = header.rename({});

                var attributes = renamedHeader._attributes;

                renamedHeader.count().should.be.equal(3);
                renamedHeader.elements().should.be.an.Array.and.have.length(3);

                attributes.should.have.property('attribute1');
                attributes.should.have.property('attribute2');
                attributes.should.have.property('attribute3');

                renamedHeader.get('attribute1').should.not.be.equal(attribute1);
                renamedHeader.get('attribute3').should.not.be.equal(attribute2);
                renamedHeader.get('attribute3').should.not.be.equal(attribute3);

                renamedHeader.get('attribute1').should.be.instanceOf(affinity.Attribute);
                renamedHeader.get('attribute2').should.be.instanceOf(affinity.Attribute);
                renamedHeader.get('attribute3').should.be.instanceOf(affinity.Attribute);

                done();

            });

        });

        describe('When renaming an attribute that does not exist', function(){

            it('Should throw', function(done){

                var attribute1 = new affinity.Attribute({type:affinity.Integer});
                var attribute2 = new affinity.Attribute({type:affinity.Integer});
                var attribute3 = new affinity.Attribute({type:affinity.Integer});

                var header = new affinity.Header({attribute1 : attribute1, attribute2: attribute2, attribute3 : attribute3});

                should(function(){
                    var renamedHeader = header.rename({attribute4 : 'attr4'});
                }).throw();

                done();

            });

        });

        describe('When two target names are the same', function(){

            it('Should throw', function(done){

                var attribute1 = new affinity.Attribute({type:affinity.Integer});
                var attribute2 = new affinity.Attribute({type:affinity.Integer});
                var attribute3 = new affinity.Attribute({type:affinity.Integer});

                var header = new affinity.Header({attribute1 : attribute1, attribute2: attribute2, attribute3 : attribute3});

                should(function(){
                    var renamedHeader = header.rename({attribute1 : 'attr1', attribute2 : 'attr1'});
                }).throw();

                done();

            });

        });

        describe('When two target names are the same', function(){

            it('Should do it but warn in console', function(done){

                var attribute1 = new affinity.Attribute({type:affinity.Integer});
                var attribute2 = new affinity.Attribute({type:affinity.Integer});
                var attribute3 = new affinity.Attribute({type:affinity.Integer});

                var header = new affinity.Header({attribute1 : attribute1, attribute2: attribute2, attribute3 : attribute3});

                var renamedHeader = header.rename({attribute1 : 'attribute1'});

                var attributes = renamedHeader._attributes;

                renamedHeader.count().should.be.equal(3);
                renamedHeader.elements().should.be.an.Array.and.have.length(3);

                attributes.should.have.property('attribute1');
                attributes.should.have.property('attribute2');
                attributes.should.have.property('attribute3');

                renamedHeader.get('attribute1').should.not.be.equal(attribute1);
                renamedHeader.get('attribute2').should.not.be.equal(attribute2);
                renamedHeader.get('attribute3').should.not.be.equal(attribute3);

                renamedHeader.get('attribute1').should.be.instanceOf(affinity.Attribute);
                renamedHeader.get('attribute2').should.be.instanceOf(affinity.Attribute);
                renamedHeader.get('attribute3').should.be.instanceOf(affinity.Attribute);

                done();

            });

        });

        describe('When passing invalid object', function(){

            it('Should throw', function(done){

                var attribute1 = new affinity.Attribute({type:affinity.Integer});
                var attribute2 = new affinity.Attribute({type:affinity.Integer});
                var attribute3 = new affinity.Attribute({type:affinity.Integer});

                var header = new affinity.Header({attribute1 : attribute1, attribute2: attribute2, attribute3 : attribute3});

                should(function(){
                    var renamedHeader = header.rename({attribute4 : 2});
                }).throw();

                should(function(){
                    var renamedHeader = header.rename(2);
                }).throw();

                should(function(){
                    var renamedHeader = header.rename('abc');
                }).throw();

                done();

            });

        });

    });


    describe('Header#toRelation', function(){

        describe('When the header has no attribute', function(){

            it('Should return an empty relation', function(done){

                var rel = affinity.TABLE_DEE;

                var headerRel = rel.header().toRelation();

                headerRel.count().should.be.equal(0);
                headerRel.body().should.be.an.Array.and.have.length(0);

                done();

            })

        });

        describe('When the header has attributes', function(){

            it('Should return a relation with those attributes', function(done){

                var rel = new affinity.Relation([
                    {a : {type : affinity.Integer} },
                    {b : {type : affinity.String} },
                    {c : {type : affinity.Boolean} },
                    {d : {type : affinity.Integer} }
                ],[
                    [1, 'a', true, 1],
                    [2, 'b', false, 3],
                    [3, 'c', true, 9]
                ]);

                var headerRel = rel.header().toRelation();

                headerRel.body();

                headerRel.count().should.be.equal(4);
                headerRel.body().should.be.an.Array.and.have.length(4);

                done();

            })

        })

    });

    describe('Header.fromRelation', function(){

        describe('When passed a relation with good header', function(){

            it('Should return a header', function(done){

                var relation = new affinity.Relation([
                    { name : {type : affinity.String}},
                    { type : {type : affinity.Type} }
                ],[

                    ['firstName', affinity.String],
                    ['lastName', affinity.String],
                    ['age', affinity.Integer]

                ]);

                var header = affinity.Header.fromRelation(relation);

                header.count().should.be.equal(3);
                header.get('firstName').should.be.instanceof(affinity.Attribute);
                header.get('lastName').should.be.instanceof(affinity.Attribute);
                header.get('age').should.be.instanceof(affinity.Attribute);

                done();

            })

        })

    });

    describe('Header.equal', function(){



    });

    describe('Header.coerce', function(){



    });

});