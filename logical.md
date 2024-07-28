# Logical Operators $or and $nor operator for applying OR condition in the find method - MongoDB

In MongoDB, the $or and $nor operators are used to combine multiple conditions in a query, applying an OR or NOR (NOT OR) logic, respectively.

$or Operator
The $or operator is used to find documents that match at least one of the specified conditions. It takes an array of conditions, and a document is included in the result set if it satisfies at least one of these conditions.

Example:
Find all documents where either the age is 25 or the name is "Alice":

javascript
Copy code
db.collection.find({
$or: [
{ age: 25 },
{ name: "Alice" }
]
});
This query returns all documents where the age is 25 or the name is "Alice".

$nor Operator
The $nor operator is the opposite of $or. It returns documents that do not match any of the specified conditions. It also takes an array of conditions, but only documents that fail to match all the conditions are included in the result set.

Example:
Find all documents where neither the age is 25 nor the name is "Alice":

javascript
Copy code
db.collection.find({
$nor: [
{ age: 25 },
{ name: "Alice" }
]
});
This query returns all documents where the age is not 25 and the name is not "Alice".

Usage in MongoDB Queries
These operators are typically used within the find method to filter documents based on multiple criteria. They are powerful tools for constructing complex queries in MongoDB.

db.books.find({$or:[{"details.quantity":{$eq:33}},{"details.price:":{$eq:55}}]})

# Understand And Operator, Not Operator Logical Operators for querying documents - MongoDB

In MongoDB, the $and and $not logical operators are used to build complex query conditions.

$and Operator
The $and operator is used to combine multiple conditions, returning documents that satisfy all the specified conditions. It takes an array of conditions, and a document is included in the result set only if it matches every condition in the array.

Example:
Find all documents where age is 25 and name is "Alice":

javascript
Copy code
db.collection.find({
$and: [
{ age: 25 },
{ name: "Alice" }
]
});
This query returns all documents where both the age is 25 and the name is "Alice".

- In MongoDB, the default behavior is to use an implicit $and when specifying multiple fields, so the above query can also be written as:

javascript
Copy code
db.collection.find({ age: 25, name: "Alice" });
$not Operator
The $not operator inverts the effect of another query condition, returning documents that do not match the condition it is applied to. It is often used in conjunction with other operators to negate a condition.

Example:
Find all documents where age is not 25:

javascript
Copy code
db.collection.find({
age: { $not: { $eq: 25 } }
});
This query returns all documents where the age is not 25.

Another example using a different condition:

javascript
Copy code
db.collection.find({
name: { $not: { $regex: /^A/ } }
});
This query returns all documents where the name does not start with the letter "A".

Combining $and and $not
You can combine $and and $not to create more complex queries. For example, to find all documents where age is 25 but name is not "Alice":

javascript
Copy code
db.collection.find({
$and: [
{ age: 25 },
{ name: { $not: { $eq: "Alice" } } }
]
});
These logical operators are essential for filtering and retrieving specific documents from MongoDB collections based on complex criteria.
