# Learn Element Query Operators like $exists & $type Operator to find field in document - MongoDB

In MongoDB, element query operators like $exists and $type are used to query documents based on the presence or type of fields. Here's how they work:

1. $exists Operator
   The $exists operator is used to check whether a field exists in a document or not.

Syntax
javascript
Copy code
{ field: { $exists: <boolean> } }
<boolean>: A boolean value. true checks if the field exists; false checks if the field does not exist.
Examples
Find documents where the email field exists:

javascript
Copy code
db.collection.find({ email: { $exists: true } })
Find documents where the phone field does not exist:

javascript
Copy code
db.collection.find({ phone: { $exists: false } }) 2. $type Operator
The $type operator is used to select documents where the value of a field matches a specified BSON type.

Syntax
javascript
Copy code
{ field: { $type: <type> } }
<type>: Can be a string alias or a number representing the BSON type.
BSON Type Number Reference
Double: 1
String: 2
Object: 3
Array: 4
Binary data: 5
Undefined (deprecated): 6
ObjectId: 7
Boolean: 8
Date: 9
Null: 10
Regular Expression: 11
JavaScript: 13
Symbol (deprecated): 14
JavaScript (with scope): 15
32-bit integer: 16
Timestamp: 17
64-bit integer: 18
Decimal128: 19
Min key: -1
Max key: 127
Examples
Find documents where the age field is of type int:

javascript
Copy code
db.collection.find({ age: { $type: 16 } })
Find documents where the price field is a double:

javascript
Copy code
db.collection.find({ price: { $type: 1 } })
Find documents where the name field is a string:

javascript
Copy code
db.collection.find({ name: { $type: "string" } })
You can combine these operators with other query operators to create more complex queries. For example, you can use them in conjunction with $and, $or, $not, etc., to refine your searches.
