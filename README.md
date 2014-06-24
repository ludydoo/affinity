
# Affinity #

Relational Algebra Library written in JavaScript

Inspired from
 
Axiom  https://github.com/dkubb/axiom

DEE    http://www.quicksort.co.uk

##To-do list for 0.1.0##

* [x] Implement Extend operation
* [ ] Implement a DUPLICATE false/true for operators to choose between creating a new relation and only updating one. 
Currently affinity always creates new relations on every operation.
* [ ] Implement Summarize operation
* [ ] Implement comparison operators (lt, gt, eq, ...)
* [ ] Implement date, string and numeric functions (cos, sin, ...)
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

##Basics##

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

##Class List##

###Relational Operators###

| **Operation** | **Shortcut**  |
|:--------------|:--------------|
| Base Relation | N/A           |
| Compose       | `compose`     |
| Difference    | `difference`  |
| Extend        | `extend`      |
| Group         | `group`       |
| Intersection  | `intersect`   |
| Join          | `join`        |
| Product       | `product`     |
| Projection    | `project`     |
| Rename        | `rename`      |
| Restriction   | `restrict`    |
| SemiDifference| `sdifference` |
| SemiJoin      | `sjoin`       |
| UnGroup       | `ungroup`     |
| Union         | `union`       |
| UnWrap        | `unwrap`      |
| Wrap          | `wrap`        |

**Functions**
-------------

| **Function**         | **Shortcut**  | **Returns**     |
|:---------------------|:--------------|:----------------|
|**Connectives**                                       |||
|And                   |`and`          |Boolean          |
|Or                    |`or`           |Boolean          |
|Not                   |`not`          |Boolean          |
|**Tuple                                                 |
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


##Usage##
                
###Difference###

The difference of A in B is the relation containing tuples in A that are not present in B.

```
var people = new affinity.Relation([
                    {    id: { type: affinity.Integer}},
                    {  name: { type: affinity.String }},
                    {exists: { type: affinity.Boolean}}
                ],[
                    [1, 'Nicolas',  true ],
                    [2, 'Lancelot', false],
                    [3, 'Marie',    true ]
                ]);
                
                
var otherPeople = new affinity.Relation([
                    {    id: { type: affinity.Integer}},
                    {  name: { type: affinity.String }},
                    {exists: { type: affinity.Boolean}}
                ],[
                    [1, 'Nicolas',  true ],
                    [2, 'Raymond',  true ],
                    [3, 'Banane',   true ]
                ]);
                
var difference = people.difference(otherPeople);
```

Result : 
<pre>
+------+----------+----------+
|  id  |   name   |  exists  |
+======+==========+==========+
|  2   | Lancelot |   false  |
+------+----------+----------+
|  3   |  Marie   |   true   |
+------+----------+----------+
</pre>

                
###Intersection###

The intersection of A and B is the relation containing tuples that are both in A and B.

```

var people = new affinity.Relation([
                    {    id: { type: affinity.Integer}},
                    {  name: { type: affinity.String }},
                    {exists: { type: affinity.Boolean}}
                ], [
                    [1, 'Nicolas',  true ],
                    [2, 'Lancelot', false],
                    [3, 'Marie',    true ]
                ]);
                
                
var otherPeople = new affinity.Relation([
                    {    id: { type: affinity.Integer}},
                    {  name: { type: affinity.String }},
                    {exists: { type: affinity.Boolean}}
                ], [
                    [1, 'Nicolas',  true ],
                    [2, 'Raymond',  true ],
                    [3, 'Banane',   true ]
                ]);
                
var difference = people.intersect(otherPeople);

```

<pre>
+------+--------+----------+
|  id  |  name  |  exists  |
+======+========+==========+
|  1   | Nicolas|   true   |
+------+--------+----------+
</pre>

###Join###

The join of two relations returns a relation containing all possible combinations of tuples that are equal
on their common attributes.

```
var people = new affinity.Relation([
                    { name : { type : affinity.String  }},
                    { dept : { type : affinity.String  }},
                ],[
                    ['Nicolas',  'Sales'        ],
                    ['Lancelot', 'R&D'          ],
                    ['Marie',    'Communication'],
                ]);
                
var depts = new affinity.Relation([
                   { dept  : { type : affinity.String  }},
                   { level : { type : affinity.Integer  }},
               ],[
                   ['Sales'        , 2],
                   ['R&D'          , 2],
                   ['Communication', 3],
               ]);
               
var join = people.join(depts);`
```
 
Result : 
<pre>
+-----------+---------------+---------+
|    name   |  dept         |  stage  |
+===========+===============+=========+
|  Nicolas  | Sales         |   2     |
+-----------+---------------+---------+
|  Lancelot | R&D           |   2     |
+-----------+---------------+---------+
|   Marie   | Communication |   3     |
+-----------+---------------+---------+              
</pre>

###Product###

The product of relations A and B is a relation containing all possible combinations of tuples in A and B

```
var people = new affinity.Relation([
                    { name   : { type : affinity.String  }},
                    { salary : { type : affinity.Integer  }},
                ],[
                    ['Nicolas',  100 ],
                    ['Lancelot', 200 ],
                    ['Marie',    250 ],
                ]);
                
var depts = new affinity.Relation([
                   { dept  : { type : affinity.String  }},
                   { level : { type : affinity.Integer  }},
               ],[
                   ['Sales'        , 2],
                   ['R&D'          , 2],
                   ['Communication', 3],
               ]);
               
var product = people.product(depts);`
```

Result:
<pre>
+-----------+---------+----------------+-------+
|  name     |  salary |  dept          | level |
+===========+=========+================+=======+
|  Nicolas  |   100   |  Sales         |  2    |
+-----------+---------+----------------+-------+
|  Nicolas  |   100   |  R&D           |  2    |
+-----------+---------+----------------+-------+
|  Nicolas  |   100   |  Communication |  3    |
+-----------+---------+----------------+-------+
|  Lancelot |   200   |  Sales         |  2    |
+-----------+---------+----------------+-------+
|  Lancelot |   200   |  R&D           |  2    |
+-----------+---------+----------------+-------+
|  Lancelot |   200   |  Communication |  3    |
+-----------+---------+----------------+-------+
|   Marie   |   250   |  Sales         |  2    |
+-----------+---------+----------------+-------+
|   Marie   |   250   |  R&D           |  2    |
+-----------+---------+----------------+-------+
|   Marie   |   250   |  Communication |  3    |
+-----------+---------+----------------+-------+
</pre>

###Projection###

The projection of a relation on specified attributes is a relation containing only the specified attributes.

```
var people = new affinity.Relation([
                    {    id: { type: affinity.Integer}},
                    {  name: { type: affinity.String }},
                    {exists: { type: affinity.Boolean}}
                ], [
                    [1, 'Nicolas',  true ],
                    [2, 'Lancelot', false],
                    [3, 'Marie',    true ]
                ]);
                
var projection = people.project(['id', 'name']);

```
Result : 

<pre>
+------+----------+
|  id  |   name   |
+======+==========+
|  1   | Nicolas  |
+------+----------+
|  2   | Lancelot |
+------+----------+
|  3   |  Marie   |
+------+----------+
</pre>

###Rename###

The rename operator renames attributes of a relation.

```
var people = new affinity.Relation([
                    {    id: { type: affinity.Integer}},
                    {  name: { type: affinity.String }},
                    {exists: { type: affinity.Boolean}}
                ], [
                    [1, 'Nicolas',  true ],
                    [2, 'Lancelot', false],
                    [3, 'Marie',    true ]
                ]);
                
var rename = people.rename({ name : 'pseudo'})                

```

Result : 
<pre>
+------+----------+----------+
|  id  |  pseudo  |  exists  |
+======+==========+==========+
|  1   | Nicolas  |   true   |
+------+----------+----------+
|  2   | Lancelot |   false  |
+------+----------+----------+
|  3   |  Marie   |   true   |
+------+----------+----------+
</pre>



###Restriction###

The Restriction operator returns a relation containing the tuples for which the specified predicate holds.

```
var people = new affinity.Relation([
                    {    id: { type: affinity.Integer}},
                    {  name: { type: affinity.String }},
                    {exists: { type: affinity.Boolean}}
                ], [
                    [1, 'Nicolas',  true ],
                    [2, 'Lancelot', false],
                    [3, 'Marie',    true ]
                ]);
                
var exists = relation.get('exists');
var name = relation.get('name')

var restricted = people.restrict(exists.eq(true).and(name.not().eq('')));
```

Result : 

<pre>
+------+--------+----------+
|  id  |  name  |  exists  |
+======+========+==========+
|  1   | Nicolas|   true   |
+------+--------+----------+
|  3   | Marie  |   true   |
+------+--------+----------+
</pre>


Example : 

var count1 = relation.get('count1');
var count2 = relation.get('count2');
var count3 = relation.get('count3');
var count4 = relation.get('count4');

relation.restrict(count1.plus(cunt2).eq(count3.div(count4)));

// (count1 + count2 == count3 / count4)

// Or with user-defined functions

relation.restrict(function(tuple){

    var count1 = tuple.get('count1');
    var count2 = tuple.get('count2');
    var count3 = tuple.get('count3');
    var count4 = tuple.get('count4');
    
    return (count1+count2) === (count3/count4);
    
})

```


###Union###

The Union operator returns a relation containing all tuples from both relations. 

```
var friends = new affinity.Relation([
                    {    id: { type: affinity.Integer}},
                    {  name: { type: affinity.String }},
                    {exists: { type: affinity.Boolean}}
                ], [
                    [1, 'Nicolas',  true ],
                    [2, 'Lancelot', false],
                    [3, 'Marie',    true ]
                ]);

var family = new affinity.Relation([
                    {    id: { type: affinity.Integer}},
                    {  name: { type: affinity.String }},
                    {exists: { type: affinity.Boolean}}
                ], [
                    [1, 'Raymond',     true ],
                    [2, 'Michele',     true ],
                    [3, 'Andreanne',   true ]
                ]);

var union = friends.union(family);
```

Result : 

<pre>
+------+-----------+----------+
|  id  |  name     |  exists  |
+======+===========+==========+
|  1   | Lancelot  |  false   |
+------+-----------+----------+
|  1   | Nicolas   |   true   |
+------+-----------+----------+
|  3   | Marie     |   true   |
+------+-----------+----------+
|  1   | Raymond   |   true   |
+------+-----------+----------+
|  2   | Michele   |   true   |
+------+-----------+----------+
|  3   | Andreanne |   true   |
+------+-----------+----------+
</pre>

To be documented : 

Compose, Extend, Group, SemiDifference, SemiJoin, Ungroup, Unwrap, Wrap