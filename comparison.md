$eq
$ne
$lt
$gt
$lte
$gte
$in
$nin
db.students.find({age:5})
db.students.find({age:{$eq:5}})
school_db> db.students.find({age:{$in:[22,19]}})
show collections
db.books.find()
test> db.books.insertOne({title:"book 1",details:{"quantity":30,"price":35}})

# Working with the comparison operators like $eq, $ne, $gt, $gte, $lt, $lte - MongoDB

In MongoDB, comparison operators are used to filter documents based on their field values. Here's a brief overview of each operator:

$eq (Equal):

Matches documents where the field value is equal to a specified value.
Example: { age: { $eq: 30 } } finds documents where the age field is equal to 30.
$ne (Not Equal):

Matches documents where the field value is not equal to a specified value.
Example: { age: { $ne: 30 } } finds documents where the age field is not 30.
$gt (Greater Than):

Matches documents where the field value is greater than a specified value.
Example: { age: { $gt: 30 } } finds documents where the age field is greater than 30.
$gte (Greater Than or Equal):

Matches documents where the field value is greater than or equal to a specified value.
Example: { age: { $gte: 30 } } finds documents where the age field is greater than or equal to 30.
$lt (Less Than):

Matches documents where the field value is less than a specified value.
Example: { age: { $lt: 30 } } finds documents where the age field is less than 30.
$lte (Less Than or Equal):

Matches documents where the field value is less than or equal to a specified value.
Example: { age: { $lte: 30 } } finds documents where the age field is less than or equal to 30.
Examples of Usage
To use these operators in a query, you typically include them in the query object passed to methods like find() or findOne(). For example:

javascript
Copy code
// Find documents where age is greater than 25
db.collection.find({ age: { $gt: 25 } })

// Find documents where age is less than or equal to 40
db.collection.find({ age: { $lte: 40 } })

// Find documents where the status is not 'active'
db.collection.find({ status: { $ne: 'active' } })
These operators can be combined with logical operators like $and, $or, and $not for more complex queries.

# Querying the embedded documents and also arrays using the $in and $nin operator - MongoDB

In MongoDB, you can query embedded documents and arrays using the $in and $nin operators to check if a value exists within a list or to exclude documents based on the presence of certain values. Here's how to use these operators in different scenarios:

1. Querying Embedded Documents
   Suppose you have a collection of documents where each document contains an embedded document. For example, consider a students collection where each student document has an embedded document representing their address:

json
Copy code
{
"\_id": ObjectId("..."),
"name": "John Doe",
"address": {
"city": "New York",
"zipcode": "10001"
}
}
To find all students living in certain cities, you can use the $in operator:

javascript
Copy code
db.students.find({ "address.city": { $in: ["New York", "Los Angeles"] } })
To exclude students from certain cities, use the $nin operator:

javascript
Copy code
db.students.find({ "address.city": { $nin: ["New York", "Los Angeles"] } }) 2. Querying Arrays
For documents containing arrays, the $in and $nin operators can be used to find documents where the array contains (or does not contain) any of the specified values. Consider a products collection where each product has an array of tags:

json
Copy code
{
"\_id": ObjectId("..."),
"name": "Laptop",
"tags": ["electronics", "computing", "portable"]
}
To find all products with certain tags, use the $in operator:

javascript
Copy code
db.products.find({ "tags": { $in: ["electronics", "mobile"] } })
To find products that do not have certain tags, use the $nin operator:

javascript
Copy code
db.products.find({ "tags": { $nin: ["portable", "gaming"] } })
Combining Multiple Conditions
You can combine $in and $nin with other operators like $and, $or, etc., to create more complex queries. For example, to find students either from "New York" or with the zipcode "90210":

javascript
Copy code
db.students.find({
$or: [
{ "address.city": "New York" },
{ "address.zipcode": "90210" }
]
})
These are basic examples, but MongoDB's query language is flexible and allows for complex queries to suit various needs.
