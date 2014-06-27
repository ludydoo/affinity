# Getting Started with Affinity



## Relations

Relations are very much like tables. They are a set of tuples conforming to 
a header. They implement the basic set operations (set difference, ...)
but also add other operations and constraints.

For example, relations cannot contain null values, nor duplicates.

This is a relation (the attribute ordering is always arbitrary)

    +-----------------------+----------------------+------------------+
    | firstName : TString   | lastName : TString   | age : TInteger   |
    +=======================+======================+==================+
    | Maybelline            | Durocher             | 23               |
    +-----------------------+----------------------+------------------+
    | Danella               | Barbara              | 23               |
    +-----------------------+----------------------+------------------+
    | Daniel                | Bandy                | 87               |
    +-----------------------+----------------------+------------------+
    | Bobo                  | Dada                 | 34               |
    +-----------------------+----------------------+------------------+

### The Header (or heading) 

The Header is an ordered Set of attributes.

    +-----------------------+----------------------+------------------+
    | firstName : TString   | lastName : TString   | age : TInteger   |
    +=======================+======================+==================+
    
### The Attributes

An Attribute is an ordered pair (Name : Type).

    +------------------+
    | age : TInteger   |
    +==================+
    
### The Body

The Body is the Set of Tuples a Relation contains. All Tuples in a Relation
must conform to the Relation Header.

    +=======================+======================+==================+
    | Maybelline            | Durocher             | 23               |
    +-----------------------+----------------------+------------------+
    | Danella               | Barbara              | 23               |
    +-----------------------+----------------------+------------------+
    | Daniel                | Bandy                | 87               |
    +-----------------------+----------------------+------------------+
    | Bobo                  | Dada                 | 34               |
    +-----------------------+----------------------+------------------+
        
### A Tuple

A Tuple is an ordered set, each value being identified by it's name.
In this case : 

    var tuple = new Tuple(firstName : 'Danella', lastName : 'Barbara', age : 23);

    +-----------------------+----------------------+------------------+
    | Danella               | Barbara              | 23               |
    +-----------------------+----------------------+------------------+
        


### Declaring Relations

To declare relations, you must specify a Header and a Body.

    var relation = new affinity.Relation([
        { firstName : { type : affinity.String}},
        { lastName : { type : affinity.String}},
        { age : { type : affinity.Integer}}
    ],[
        ['John', 'Wilson', 34],
        ['Mary', 'McGibbins', 32],
        ['Lucy', 'Dandy', 31],
        ['Mark', 'Galiper', 39],
    ]);

When declaring a relation, the order in which you declare the attributes
will be the order in which you will declare the tuples attribute values.
(firstName first, lastName second, age third). 

This is against the "grain" of the relational definition of a Relation. Why?
Because attributes are not supposed to be ordered in a Relation Header. They are ordered
because they have a name, but there is no "first" or "second" attribute. So saying
that the "first" attribute of a Tuple is "John" or "Mary" makes no sense.
This declaration API is simply a nicer way to define a Relation.

Though, if you want, you can define a header like this :

    var header = new affinity.Header({
        firstName : { type : affinity.String}},
        lastName : { type : affinity.String}},
        age : { type : affinity.Integer}},
    )

And you won't be able to pass the body as : 

    var relation = new affinity.Relation(header,[
        [ 'John', 'Wilson', 34 ] // Not Good
    ]);
    
But you will have to pass the body like this : 

    var relation = new affinity.Relation(header, [
        { firstName : 'John', lastName : 'Wilson', age : 34 } // Good
    ]);
    
Or like this : 
    
    var relation = new affinity.Relation(header, [
            new affinity.Tuple({ firstName : 'John', lastName : 'Wilson', age : 34 }) // Good
        ]);
    
    
## Performing Operations

Now that you have a relation, you're happy. But you want to be able to 
perform relational operations on that relation. Let's say we wanted to 
perform a union on two relations.

    var A = new affinity.Relation([
            { firstName : { type : affinity.String}},
            { lastName : { type : affinity.String}},
            { age : { type : affinity.Integer}}
        ],[
            ['John', 'Wilson', 34],
            ['Mary', 'McGibbins', 32],
            ['Lucy', 'Dandy', 31],
            ['Mark', 'Galiper', 39],
        ]);
    
    var B = new affinity.Relation([
            { firstName : { type : affinity.String}},
            { lastName : { type : affinity.String}},
            { age : { type : affinity.Integer}}
        ],[
            ['Natalia', 'Bali', 24],
            ['Suma', 'Gandi', 45],
            ['Rob', 'Sneizer', 10],
            ['Mark', 'Galiper', 39],
        ]);
        
    var C = A.union(B);
    
    C.print();
    
    // +-----------------------+----------------------+------------------+
    // | firstName : TString   | lastName : TString   | age : TInteger   |
    // +=======================+======================+==================+
    // | John                  | Wilson               | 34               |
    // +-----------------------+----------------------+------------------+
    // | Mary                  | McGibbins            | 32               |
    // +-----------------------+----------------------+------------------+
    // | Lucy                  | Dandy                | 31               |
    // +-----------------------+----------------------+------------------+
    // | Mark                  | Galiper              | 39               |
    // +-----------------------+----------------------+------------------+
    // | Natalia               | Bali                 | 24               |
    // +-----------------------+----------------------+------------------+
    // | Suma                  | Gandi                | 45               |
    // +-----------------------+----------------------+------------------+
    // | Rob                   | Sneizer              | 10               |
    // +-----------------------+----------------------+------------------+
    
Note that Mark Galiper has not been added twice to our Union relation. 
This is because nor Relations nor Sets allow duplicate elements. Otherwise,
they wouldn't be relations nor sets anymore. 

Union is a simple relational operator. But there are other more exotic ones. Check in the
Operators package.

## Restriction and Extend Operations

The Restriction and Extend operators must be constructed with a predicate or expression.

In the case of the Restriction, the predicate will be evaluated on a Tuple to check if
it is eligible or not. In the case of an Extension, the expression will return the value
of an added calculated attribute. 

While you can use custom callbacks for this purpose, I advise against it because in the 
near future, Affinity will be an SQL parser and won't be able to determine what 
kind of operations were used in custom callbacks.

Note that for restriction, the predicate must return a boolean. For extensions,
it may return any type.

Restriction Example :
    
    var firstName = A.get('firstName');
    var lastName = A.get('lastName');
    var age = A.get('age');
    
    var restricted = A.restrict(firstName.substr(0,1).eq('M').or(age.div(3).gt(lastName.length())))
    
    // Would translate to (firstName.substr(0,1) === 'M') || (age/3 > lastName.length);
    
Extension Example : 

    var extended = A.extend([ { nameUpper : firstName.uppercase() } ], { firstUpper : nameUpper.substr(0,1) });
    
    // +-----------------------+----------------------+------------------+---------------------+----------------------+
    // | firstName : TString   | lastName : TString   | age : TInteger   | nameUpper : TString | firstUpper : TString |
    // +=======================+======================+==================+=====================+======================+
    // | John                  | Wilson               | 34               | JOHN                | J                    |
    // +-----------------------+----------------------+------------------+---------------------+----------------------+
    // | Mary                  | McGibbins            | 32               | MARY                | M                    |
    // +-----------------------+----------------------+------------------+---------------------+----------------------+
    // | Lucy                  | Dandy                | 31               | LUCY                | L                    |
    // +-----------------------+----------------------+------------------+---------------------+----------------------+
    // | Mark                  | Galiper              | 39               | MARK                | M                    |
    // +-----------------------+----------------------+------------------+---------------------+----------------------+
    
Custom Callback Function : 

    var extended = A.extend([ 
    
    { nameUpper : function(tuple){
        return tuple.get('firstName').toUppercase();
    }, type : affinity.String }, 
    
    { firstUpper : function(tuple){
        return tuple.get('nameUpper').substr(0,1);
    }, type : affinity.String }
    
    ]);

Custom callbacks API does not allow an extension with the name "type", which is stupid. 
It will be corrected very soon.

### Note on operation precedence

Normally in mathematics when you have 
   
    a+b/c

It would be evaluated as 

    a+(b/c) 
    
and not 

    (a+b)/c. 
    
We do not currently have a system to determine which operator has which precedence 
on which. So to write this equation, you would write:

    a.plus(b.div(c)) // Good
    
Because 

    a.plus(b).div(c) // Not good
    
Would evaluate to
 
    (a+b)/c