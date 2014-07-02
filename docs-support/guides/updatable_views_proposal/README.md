#Proposal for Updatable Views

##The Problem

DBMS also have a problem with this. There are a lot of restrictions in order to be able to update views. Since
relational operators are basically views of relations, being able to update them would be of great help because
we rarely deal directly with raw data, but with filtered, formatted data.

To be able to update a view (meaning be able to perform add, delete and update operations), we must be able
to "revert" the relational operators. For certain operators (such as Rename or Restrict) this is easy because
there is only one possible solution to revert the operation. Though, for operators that take in two relations,
there is an ambiguity on the possible solution to the update problem that arises.

For example, the following operation :

    var people = new affinity.Relation(...)

    +---------------------+------------------------+-------------------+
    | personName : String | personSalary : Integer | deptName : String |
    +=====================+========================+===================+
    | Henry               | 200                    | Sales             |
    +---------------------+------------------------+-------------------+
    | Paul                | 300                    | Sales             |
    +---------------------+------------------------+-------------------+
    | Natasha             | 400                    | Service           |
    +---------------------+------------------------+-------------------+
    | Mary                | 350                    | Service           |
    +---------------------+------------------------+-------------------+
    | Snazzy              | 250                    | R&D               |
    +---------------------+------------------------+-------------------+
    | Dumple              | 210                    | R&D               |
    +---------------------+------------------------+-------------------+

    var depts = new affinity.Relation(...)

    +-------------------+---------------------+
    | deptName : String | deptLevel : Integer |
    +===================+=====================+
    | Sales             | 1                   |
    +-------------------+---------------------+
    | Service           | 2                   |
    +-------------------+---------------------+
    | R&D               | 2                   |
    +-------------------+---------------------+

    var peopleDept = people.join(depts);

    +---------------------+------------------------+-------------------+---------------------+
    | personName : String | personSalary : Integer | deptName : String | deptLevel : Integer |
    +=====================+========================+===================+=====================+
    | Henry               | 200                    | Sales             | 1                   |
    +---------------------+------------------------+-------------------+---------------------+
    | Paul                | 300                    | Sales             | 1                   |
    +---------------------+------------------------+-------------------+---------------------+
    | Natasha             | 400                    | Service           | 2                   |
    +---------------------+------------------------+-------------------+---------------------+
    | Mary                | 350                    | Service           | 2                   |
    +---------------------+------------------------+-------------------+---------------------+
    | Snazzy              | 250                    | R&D               | 2                   |
    +---------------------+------------------------+-------------------+---------------------+
    | Dumple              | 210                    | R&D               | 2                   |
    +---------------------+------------------------+-------------------+---------------------+

Let's say we wanted to add this tuple to the `peopleDept` relation :

    +---------------------+------------------------+-------------------+---------------------+
    | Kimble              | 300                    | R&D               | 2                   |
    +---------------------+------------------------+-------------------+---------------------+

To make this view updatable, meaning that it will revert its changes back into the base relations
we would simply have to add

    +---------------------+------------------------+-------------------+
    | Kimble              | 300                    | R&D               |
    +---------------------+------------------------+-------------------+

To the `people` relation. It's easy. But it gets a little complicated. Let's say we
wanted to add :

    +---------------------+------------------------+-------------------+---------------------+
    | Kimble              | 300                    | Comm              | 3                   |
    +---------------------+------------------------+-------------------+---------------------+

to the `peopleDepts` relation. Then, we would have to add

    +---------------------+------------------------+-------------------+
    | Kimble              | 300                    | Comm              |
    +---------------------+------------------------+-------------------+

To the `people` relation and also

     +-------------------+---------------------+
     | Comm              | 3                   |
     +-------------------+---------------------+

To the `depts` relation.

This is not the most complicated example. But many update operations can be reverted by many ways,
meaning that there will be multiple ways of reverting the operation that would yield the same final result.

##Difference

    var people = new affinity.Relation(...)
    var employees = new affinity.Relation(...);
    var clients = people.difference(employees);

      People                  Employees               Clients
    +---------------------+ +---------------------+ +---------------------+
    | personName : String | | personName : String | | personName : String |
    +=====================+ +=====================+ +=====================+
    | Henry               | | Henry               | | Mary                |
    +---------------------+ +---------------------+ +---------------------+
    | Paul                | | Paul                | | Snazzy              |
    +---------------------+ +---------------------+ +---------------------+
    | Natasha             | | Natasha             | | Dumple              |
    +---------------------+ +---------------------+ +---------------------+
    | Mary                |
    +---------------------+
    | Snazzy              |
    +---------------------+
    | Dumple              |
    +---------------------+

###Add

General strategy:

* When present in right but not in left : remove it from right
* When not present in left : add it to left

Ambiguities: None

####Add when not present in left nor in right relation

Can be added to left relation

    clients.add({personName : "Gibble"});

     People                  Employees               Clients = people.difference(employees)
    +---------------------+ +---------------------+ +---------------------+
    | personName : String | | personName : String | | personName : String |
    +=====================+ +=====================+ +=====================+
    | Henry               | | Henry               | | Mary                |
    +---------------------+ +---------------------+ +---------------------+
    | Paul                | | Paul                | | Snazzy              |
    +---------------------+ +---------------------+ +---------------------+
    | Natasha             | | Natasha             | | Dumple              |
    +---------------------+ +---------------------+ +---------------------+
    | Mary                |                         +---------------------+
    +---------------------+                         | Gibble              | +
    | Snazzy              |                         +---------------------+
    +---------------------+
    | Dumple              |
    +---------------------+
    +---------------------+
    | Gibble              | +
    +---------------------+

####Add when present in right relation and in left relation

Can be removed from right relation

    clients.add({personName : "Henry"});

     People                  Employees                 Clients = people.difference(employees)
    +---------------------+ +---------------------+   +---------------------+
    | personName : String | | personName : String |   | personName : String |
    +=====================+ +=====================+   +=====================+
    | Henry               | | Paul                |   | Mary                |
    +---------------------+ +---------------------+   +---------------------+
    | Paul                | | Natasha             |   | Snazzy              |
    +---------------------+ +---------------------+   +---------------------+
    | Natasha             | +---------------------+   | Dumple              |
    +---------------------+ | Henry               | - +---------------------+
    | Mary                | +---------------------+   +---------------------+
    +---------------------+                           | Henry               | +
    | Snazzy              |                           +---------------------+
    +---------------------+
    | Dumple              |
    +---------------------+

####Add when present in right relation but not in left relation

Can be added to left and removed from right

    clients.add({personName : "Gibble"});
                                      
      People                    Employees                 Clients                                                                                                   
    +---------------------+   +---------------------+   +---------------------+
    | personName : String |   | personName : String |   | personName : String |
    +=====================+   +=====================+   +=====================+
    | Henry               |   | Henry               |   | Mary                |
    +---------------------+   +---------------------+   +---------------------+
    | Paul                |   | Paul                |   | Snazzy              |
    +---------------------+   +---------------------+   +---------------------+
    | Natasha             |   | Natasha             |   | Dumple              |
    +---------------------+   +---------------------+   +---------------------+
    | Mary                |   +---------------------+   +---------------------+
    +---------------------+   | Greg                | - | Greg                | +
    | Snazzy              |   +---------------------+   +---------------------+
    +---------------------+
    | Dumple              |
    +---------------------+
    +---------------------+
    | Greg                | +
    +---------------------+
                                                                                                                                                                                              
###Delete

General Strategy:

* Can be removed from left
* Can be added to right
* Both

Ambiguities : 3

####When present in left but not in right (Only case)

Can be removed from left relation

      People                    Employees               Clients
    +---------------------+   +---------------------+ +---------------------+
    | personName : String |   | personName : String | | personName : String |
    +=====================+   +=====================+ +=====================+
    | Henry               |   | Henry               | | Mary                |
    +---------------------+   +---------------------+ +---------------------+
    | Paul                |   | Paul                | | Snazzy              |
    +---------------------+   +---------------------+ +---------------------+
    | Natasha             |   | Natasha             | +---------------------+
    +---------------------+   +---------------------+ | Dumple              | -
    | Mary                |                           +---------------------+
    +---------------------+
    | Snazzy              |
    +---------------------+
    +---------------------+
    | Dumple              | -
    +---------------------+

Can be added to right relation

      People                  Employees                 Clients
    +---------------------+ +---------------------+   +---------------------+
    | personName : String | | personName : String |   | personName : String |
    +=====================+ +=====================+   +=====================+
    | Henry               | | Henry               |   | Mary                |
    +---------------------+ +---------------------+   +---------------------+
    | Paul                | | Paul                |   | Snazzy              |
    +---------------------+ +---------------------+   +---------------------+
    | Natasha             | | Natasha             |   +---------------------+
    +---------------------+ +---------------------+   | Dumple              | -
    | Mary                | +---------------------+   +---------------------+
    +---------------------+ | Dumple              | +
    | Snazzy              | +---------------------+
    +---------------------+
    | Dumple              |
    +---------------------+

Can be removed from left and added to right

      People                    Employees                 Clients                                 
    +---------------------+   +---------------------+   +---------------------+                                 
    | personName : String |   | personName : String |   | personName : String |                                 
    +=====================+   +=====================+   +=====================+                                 
    | Henry               |   | Henry               |   | Mary                |                                 
    +---------------------+   +---------------------+   +---------------------+                                 
    | Paul                |   | Paul                |   | Snazzy              |                                 
    +---------------------+   +---------------------+   +---------------------+                                 
    | Natasha             |   | Natasha             |   +---------------------+                                 
    +---------------------+   +---------------------+   | Dumple              | -                                  
    | Mary                |   +---------------------+   +---------------------+                                                         
    +---------------------+   | Dumple              | +                                          
    | Snazzy              |   +---------------------+                                                      
    +---------------------+
    +---------------------+
    | Dumple              | -                              
    +---------------------+

###Update

General Strategy: 

* Update the left relation

Ambiguities : Duplicate handling

####Update left relation

      People                  Employees               Clients
    +---------------------+ +---------------------+ +---------------------+
    | personName : String | | personName : String | | personName : String |
    +=====================+ +=====================+ +=====================+
    | Henry               | | Henry               | | Mary                |
    +---------------------+ +---------------------+ +---------------------+
    | Paul                | | Paul                | | Snazzy              |
    +---------------------+ +---------------------+ +---------------------+
    | Natasha             | | Natasha             | | Dumple              | -> Baffle
    +---------------------+ +---------------------+ +---------------------+
    | Mary                |
    +---------------------+
    | Snazzy              |
    +---------------------+
    | Dumple              | -> Baffle
    +---------------------+

####Duplicates

     People                  Employees               Clients
    +---------------------+ +---------------------+ +---------------------+
    | personName : String | | personName : String | | personName : String |
    +=====================+ +=====================+ +=====================+
    | Henry               | | Henry               | | Mary                |
    +---------------------+ +---------------------+ +---------------------+
    | Paul                | | Paul                | | Snazzy              |
    +---------------------+ +---------------------+ +---------------------+
    | Natasha             | | Natasha             | | Dumple              | -> Henry
    +---------------------+ +---------------------+ +---------------------+
    | Mary                |
    +---------------------+
    | Snazzy              |
    +---------------------+
    | Dumple              | -> Henry
    +---------------------+

Possible solutions :

* Error
* Silently Ignore

##Extension

###Add

Only allow adding of non-calculated attributes

     var relation = new affinity.Relation(...)

     var extended = relation.extend([{ tilBirthday : born.weekOfYear() }])

     // relation                           // extended  
     +---------------+-------------+       +---------------+-------------++----------------+  
     | name : String | born : Date |       | name : String | born : Date || week : Integer |  
     +===============+=============+       +===============+=============++================+  
     | John Doe      | 1980-02-02  |       | John Doe      | 1980-02-02  || 0              |  
     +---------------+-------------+       +---------------+-------------++----------------+  
     | Marilyn       | 1962-01-30  |       | Marilyn       | 1962-01-30  || 4              |  
     +---------------+-------------+       +---------------+-------------++----------------+  
     +---------------+-------------+       +---------------+-------------+  
     | Dalia         | 1957-08-10  | + <-  | Dalia         | 1957-08-10  | +  
     +---------------+-------------+       +---------------+-------------+  

###Delete

Delete the tuple from the original relation

###Update

Only allow update of non-calculated fields

     // relation                           // extended                                           
     +---------------+-------------+       +---------------+-------------++----------------+     
     | name : String | born : Date |       | name : String | born : Date || week : Integer |     
     +===============+=============+       +===============+=============++================+     
     | John Doe      | 1980-02-02  |       | John Doe      | 1980-02-02  || 0              |     
     +---------------+-------------+       +---------------+-------------++----------------+     
     
     tuple.set('name', "Mary Poppins")
     tuple.set('born', new Date(1820, 10, 10));
                                             
     // The calculated fields should calculate themselves.
     
     
                                             
                                             
                                             
                                             
                                             
                                             
                                             
                                             