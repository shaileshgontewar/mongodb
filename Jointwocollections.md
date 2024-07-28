# Join two collections using aggregate method lookup to get details - MongoDB

To join two collections in MongoDB using the aggregation framework's $lookup stage, you can follow these steps. The $lookup stage allows you to perform a left outer join to a different collection and add the matching documents to the output.
Here's a general example:
Assume you have two collections:

orders:{
"\_id": 1,
"item": "Laptop",
"quantity": 1,
"customer_id": "A123"
}

customers: {
"\_id": "A123",
"name": "John Doe",
"email": "john.doe@example.com"
}

You want to join orders with customers to get customer details with each order. Here's how you can do that using the aggregation pipeline:

db.orders.aggregate([
{
$lookup: {
from: "customers", // The collection to join with
localField: "customer_id", // Field from the `orders` collection
foreignField: "_id", // Field from the `customers` collection
as: "customerDetails" // Name of the new array field to add
}
},
{
$unwind: "$customerDetails" // Deconstructs the array field (if you want to get a single document per order)
}
]);
Explanation:
$lookup: This stage performs the join. It specifies:

from: The collection to join (customers).
localField: The field in the orders collection (customer_id) to match with the foreignField.
foreignField: The field in the customers collection (\_id) to match with the localField.
as: The name of the array field in the output documents that will contain the joined documents.
$unwind: This stage is optional. It deconstructs the array field created by $lookup into individual documents. If you want to keep the customer details as an array (e.g., if you expect multiple matches), you can skip this stage.

The resulting documents will have the customerDetails array field containing the details from the customers collection:

{
"\_id": 1,
"item": "Laptop",
"quantity": 1,
"customer_id": "A123",
"customerDetails": {
"\_id": "A123",
"name": "John Doe",
"email": "john.doe@example.com"
}
}
You can adjust the pipeline stages depending on your specific needs, such as adding more stages to filter, sort, or project fields.
