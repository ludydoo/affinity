# Affinity #

Relational Algebra Library written in JavaScript

Inspired from
 
Axiom  https://github.com/dkubb/axiom

DEE    http://www.quicksort.co.uk

##To-do list for 0.1.0##

* [x] Implement Extend operation
* [ ] Implement views && updatable views
* [x] Implement Summarize operation
* [x] Implement comparison operators (lt, gt, eq, ...)
* [x] Implement date, string and numeric functions (cos, sin, ...)
* [ ] More tests
* [ ] Review documentation

##Installation##

```
npm install('affinity')
var affinity = require('affinity');
```

##Documentation##

For Documentation, install the library with `npm install affinity` and access `<install_dir>/docs/index.html` in your browser.

Alternatively, the source is extensively documented.


##Relational Algebra##

Relational Algebra and Set Theory are the foundation of SQL implementations. The well known SELECT * WHERE ... are relational algebra 
operations. Though, Relational Algebra (being a superset of Set Theory) is more strict than many SQL implementations. 
For example, it does not allow NULL values nor duplicates. 

Simply put, a Relation may be viewed as a database table. A table has columns and rows. A Relation has a header and tuples.
It is basically the same thing. 


###Relation###

A Relation is composed of a Header and a Body.

This is a representation of a relation : 
```
+---------------+---------------------+--------------------+------------------+----------------+
| id : TInteger | firstName : TString | lastName : TString | alive : TBoolean | age : TInteger |
+===============+=====================+====================+==================+================+
| 0             | John                | Doe                | true             | 34             |
+---------------+---------------------+--------------------+------------------+----------------+
| 1             | Mary                | Poppins            | false            | 95             |
+---------------+---------------------+--------------------+------------------+----------------+
| 2             | Mark                | Clinton            | true             | 2              |
+---------------+---------------------+--------------------+------------------+----------------+
| 3             | Hopty               | Duddy              | false            | 10             |
+---------------+---------------------+--------------------+------------------+----------------+
```

###Set###
A Set is a collection of distinct objects (no duplicates)
```
[1, 2, 3, 4, ...]
['a', 'b', 'c', ...]
[{Object1},{Object2},{Object3},...]
```

###Header###
A Header is a Set of Attributes:
```
+---------------+---------------------+--------------------+------------------+----------------+
| id : TInteger | firstName : TString | lastName : TString | alive : TBoolean | age : TInteger |
+===============+=====================+====================+==================+================+
```

###Attribute###
An Attribute is a pair (name, type):
```
+---------------+
| id : TInteger |
+===============+
```

A Type can be anything (String, Boolean, Object, Vector, Array, even Tuple, Function, Relation, Set, Header...)

###Body###
A Body is a Set of Tuples having the same Attributes as the Relation:
```
+===============+=====================+====================+==================+================+
| 0             | John                | Doe                | true             | 34             |
+---------------+---------------------+--------------------+------------------+----------------+
| 1             | Mary                | Poppins            | false            | 95             |
+---------------+---------------------+--------------------+------------------+----------------+
| 2             | Mark                | Clinton            | true             | 2              |
+---------------+---------------------+--------------------+------------------+----------------+
| 3             | Hopty               | Duddy              | false            | 10             |
+---------------+---------------------+--------------------+------------------+----------------+
```

###Tuple###
A Tuple is a single entry in a Relation. It is an ordered set (attribute1 : value, attribute2 : value...):
```
+---------------+---------------------+--------------------+------------------+----------------+
| 1             | Mary                | Poppins            | false            | 95             |
+---------------+---------------------+--------------------+------------------+----------------+
```

## Overview ##

```

// Declare new relations

var relation = new affinity.Relation([
    {    id: { type: affinity.Integer}},
    {  name: { type: affinity.String }},
    {exists: { type: affinity.Boolean}}
],[
    [1, 'Nicolas',  true ],
    [2, 'Lancelot', false],
    [3, 'Marie',    true ],
    ...
]);

relation.print();

// +--------------+---------------+------------------+
// | id : Integer | name : String | exists : Boolean |
// +==============+===============+==================+
// | 1            | Nicolas       | true             |
// +--------------+---------------+------------------+
// | 2            | Lancelot      | false            |
// +--------------+---------------+------------------+
// | 3            | Marie         | true             |
// +--------------+---------------+------------------+



// Composition
// Like a Join, but removes common attributes

var composed = relation.compose(relation2);



// Difference
// Get tuples in A that are not in B

var difference = relation.difference(relation2);



// Extension
// Adds calculated columns to a relation

var extended = relation.extend([{ newCol : id.plus(name.length())}]);

extended.print();

// +--------------+---------------+------------------+------------------+
// | id : Integer | name : String | exists : Boolean | newCol : Integer |
// +==============+===============+==================+==================+
// | 1            | Nicolas       | true             | 8                |
// +--------------+---------------+------------------+------------------+
// | 2            | Lancelot      | false            | 10               |
// +--------------+---------------+------------------+------------------+
// | 3            | Marie         | true             | 8                |
// +--------------+---------------+------------------+------------------+



// Group
// Groups columns into a RVA (Relation-Valued-Attribute)

var grouped = relation.group('persons', ['id', 'exists']);

grouped.print();

// +---------------+------------------------------------+
// | name : String | persons : Relation                 |
// +===============+====================================+
// | Nicolas       | +--------------+------------------+|
// |               | | id : Integer | exists : Boolean ||
// |               | +==============+==================+|
// |               | | 1            | true             ||
// |               | +--------------+------------------+|
// +---------------+------------------------------------+
// | Lancelot      | +--------------+------------------+|
// |               | | id : Integer | exists : Boolean ||
// |               | +==============+==================+|
// |               | | 2            | false            ||
// |               | +--------------+------------------+|
// +---------------+------------------------------------+
// | Marie         | +--------------+------------------+|
// |               | | id : Integer | exists : Boolean ||
// |               | +==============+==================+|
// |               | | 3            | true             ||
// |               | +--------------+------------------+|
// +---------------+------------------------------------+

// Ungroup
// Ungroups RVAs

var ungrouped = grouped.ungroup(['persons']);



// Intersection
// Tuples in B that are also in A

var intersected = relation.intersect(otherRelation);



// Joined
// Combinations of tuples in A and B that have the same values for their common attributes

var joined = relation.join(otherRelation);



// Product
// All possible combinations of tuples in A and in B

var product = relation.product(otherRelation);



// Projection
// Selects columns from a relation

var projected = relation.project(['name', 'exists']);



// Rename
// Renames attributes of a relation

var renamed = relation.rename({ name : 'newName', exists : 'newExists' });



// Restriction
// Selects tuple that match a given predicate

var restricted = relation.restrict(
    name.substr(0,1).lowercase().eq('l').or(name.substr(0,1).lowercase().eq('m'))
);

// +--------------+---------------+------------------+
// | id : Integer | name : String | exists : Boolean |
// +==============+===============+==================+
// | 2            | Lancelot      | false            |
// +--------------+---------------+------------------+
// | 3            | Marie         | true             |
// +--------------+---------------+------------------+



// SemiDifference
// Inverse of SemiJoin : Finds tuples in A that do not have a counterpart in B

var semidifference = relation.semiDifference(otherRelation);



// SemiJoin
// Finds tuples in A that have a counterpart in B. Like a Join, but only returns attributes from A

var semijoined = relation.semiJoin(otherRelation);



// Wrap
// Wraps given attributes into a TVA (tuple-valued-attribute);

var wrapped = relation.wrap('person', ['id', 'exists']);

wrapped.print();

// +--------------+--------------------------------------------+
// | id : Integer | person : Tuple                             |
// +==============+============================================+
// | 1            | Tuple(name : 'Nicolas', exists : 'true')   |
// +--------------+--------------------------------------------+
// | 2            | Tuple(name : 'Lancelot', exists : 'false') |
// +--------------+--------------------------------------------+
// | 3            | Tuple(name : 'Marie', exists : 'true')     |
// +--------------+--------------------------------------------+



// Unwrap
// Inverse of Wrap

var unwrapped = relation.unwrap(['person']);

```


**Predicates**
-------------

For the Restriction and Extension operations, you must pass a predicate 
that can be composed with the following : 

e.g.:

```

relation.restrict(age.gt(10));  // age > 10

relation.restrict(age.gt(10).or(age.st(50))); // age > 10 || age < 50

relation.extend([
    { lived : died.minus(born) }
])


```


| **Function**         | **Shortcut**  | **Returns**     |
|:---------------------|:--------------|:----------------|
|**Connectives**                                       |||
|And                   |`and`          |Boolean          |
|Or                    |`or`           |Boolean          |
|Not                   |`not`          |Boolean          |
|**Tuple**                                               |
|TupleValue            |`value`        |*                |
|**Comparison**                                        |||
|Equal                 |`eq`           |Boolean          |
|Greater Than          |`gt`           |Boolean          |
|Greater Than or Equal |`gte`          |Boolean          |
|Smaller Than          |`st`           |Boolean          |
|Smaller Than or Equal |`ste`          |Boolean          |
|**Numeric Functions**                                 |||
|Absolute              |`abs`          |Numeric          |
|Ceil                  |`ceil`         |Numeric          |
|Cosine                |`cos`          |Numeric          |
|Division              |`div`          |Numeric          |
|Exponential           |`exp`          |Numeric          |
|Minus                 |`minus`        |Numeric          |
|Modulo                |`mod`          |Numeric          |
|Multiplication        |`times`        |Numeric          |
|Plus                  |`plus`         |Numeric          |
|Power                 |`pow`          |Numeric          |
|Roof                  |`roof`         |Numeric          |
|Round                 |`round`        |Numeric          |
|Sine                  |`sin`          |Numeric          |
|Square Root           |`sqrt`         |Numeric          |
|**String Functions**                                  |||
|Length                |`length`       |Integer          |
|Lowercase             |`lowercase`    |String           |
|Matching              |`matching`     |Boolean          |
|Substring             |`substr`       |String           |
|Uppercase             |`uppercase`    |String           |
|**Date Functions**                                    |||
|Day of Month          |`dayOfMonth`   |Integer          |
|Day of Week           |`dayOfWeek`    |Integer          |
|Day of Year           |`dayOfYear`    |Integer          |
|Week of Year          |`weekOfYear`   |Integer          |
|Year                  |`year`         |Integer          |
|Month                 |`month`        |Integer          |
|Hours                 |`hours`        |Integer          |
|Minutes               |`minutes`      |Integer          |
|Seconds               |`seconds`      |Integer          |
|Milliseconds          |`milliseconds` |Integer          |
|Timestamp             |`ts`           |Integer          |