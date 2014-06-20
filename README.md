
# Affinity #

Relational Algebra Library written in JavaScript

Inspired from
 
Axiom  https://github.com/dkubb/axiom

DEE    http://www.quicksort.co.uk

##Installation##

```
npm install('affinity')
var affinity = require('affinity');
```

##Documentation##

For Documentation, install the library with `npm install affinity` and access `<install_dir>/docs/index.html` in your browser

##Basics##

Relational Algebra and Set Theory are the foundation of SQL implementations. The well known SELECT * WHERE ... are relational algebra 
operations. Though, Relational Algebra (being a superset of Set Theory) is more strict than many SQL implementations. 
For example, it does not allow NULL values nor duplicates. 

Simply put, a Relation may be viewed as a database table. A table has columns and rows. A Relation has a header and tuples.
It is basically the same thing. 

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

A Set is a collection of distinct objects (no duplicates)

A Relation is composed of a Header and a Body.

A Header is a Set of Attributes.

An Attribute is a pair (name, type)

A Type can be anything (String, Boolean, Object, Vector, Array, even Tuple, Function, Relation, Set, Header...)

A Body is a Set of Tuples having the same Attributes as the Relation.

A Tuple is a single entry in a Relation. It is an ordered set (attribute1 : value, attribute2 : value...)



##Class List##

###Relational Operators###

| **Operation** | **Shortcut**  | **Class**    |
|:--------------|:--------------|:-------------|
| Base Relation | N/A           | Relation     |
| Difference    | `difference`  | Difference   |
| Intersection  | `intersect`   | Intersection |
| Join          | `join`        | Join         |
| Product       | `product`     | CrossProduct |
| Projection    | `project`     | Projection   |
| Rename        | `rename`      | Rename       |
| Restriction   | `restrict`    | Restriction  |
| Union         | `union`       | Union        |

**Functions**
-------------

| **Function**         | **Shortcut**  | **Class**       |
|:---------------------|:--------------|:----------------|
|**Connectives**                                       |||
|And                   |`and`          |And              |
|Or                    |`or`           |Or               |
|Not                   |`not`          |Not              |
|**Comparison**                                        |||
|Equal                 |`eq`           |Equal            |
|Larger Than           |`lt`           |LargerThan       |
|Larger Than or Equal  |`lte`          |LargerThanEqual  |
|Smaller Than          |`st`           |SmallerThan      |
|Smaller Than or Equal |`ste`          |SmallerThanEqual |
|**Numeric Functions**                                 |||
|Absolute              |`abs`          |Absolute         |
|Ceil                  |`ceil`         |Ceil             |
|Cosine                |`cos`          |Cosine           |
|Division              |`div`          |Division         |
|Exponential           |`exp`          |Exponential      |
|Minus                 |`minus`        |Minus            |
|Modulo                |`mod`          |Modulo           |
|Multiplication        |`times`        |Multiplication   |
|Plus                  |`plus`         |Plus             |
|Power                 |`pow`          |Pow              |
|Roof                  |`roof`         |Roof             |
|Round                 |`round`        |Round            |
|Sine                  |`sine`         |Sine             |
|Square Root           |`sqrt`         |Sqrt             |
|Unary Minus           |`uminus`       |UnaryMinus       |
|Unary Plus            |`uplus`        |UnaryPlus        |
|**Date Functions**                                    |||
|Day of Month          |`monthDay`     |MonthDay         |
|Day of Week           |`weekDay`      |WeekDay          |
|Day of Year           |`yearDay`      |YearDay          |
|Month                 |`month`        |Month            |
|Timestamp             |`ts`           |TimeStamp        |
|Week of Year          |`yearWeek`     |YearWeek         |

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
                
var restricted = people.restrict(relation.get('exists).equal(true));
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

The predicate can be built with the following arguments : 

```
// Connectives
and // And
or  // Or
not // Not

// Comparatives
eq  // Equals
lt  // Larger Than
lte // Larger Than or Equals
gt  // Greater Than
gte // Greater Than or Equals

// Numeric functions
plus       // Plus
minus      // Minus
times      // Multiplication
div        // Division
abs        // Absolute
ceil       // Ceil
floor      // Floor
round      // Round
mod        // Modulo  
sin        // Sinus
cos        // Cosinus
tan        // Tangent
sqrt       // Square Root
pow        // Power
exp        // Exponential
uplus      // Unary Plus
uminus     // Unary Minus

// Date Functions
dayOfMonth // Day of the month
dayOfWeek  // Day of the week
dayOfYear  // Day of the year
month      // Month number
timeStamp  // Unix Timestamp
weekOfYear // Week of the year

Example : 

relation.restrict(
    (relation.get('count1').plus(relation.get('count2')))
    .equals(relation.get('count3').div(relation.get('count4')))
)

// (count1 + count2 == count3 / count4)

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
