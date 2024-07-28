# Understanding One to One Relationship and create Collection with example- MongoDB

A one-to-one relationship in MongoDB (or any database) occurs when each document in a collection is associated with exactly one document in another collection. This type of relationship can be useful when you want to separate concerns or optimize performance by splitting data across multiple collections.

Example Scenario
Consider an application where you have users and each user has a profile with detailed information. In this case, you might want to separate the user data and the profile data into two collections for better organization and performance.

Design Approach

1. Embedded Document Approach:
   You could store the profile data as an embedded document within the user document. However, if the profile data is large or frequently accessed independently, it might make sense to use a separate collection.

2. Referencing Approach (Separate Collections):

Users Collection: Stores basic information about users.
Profiles Collection: Stores detailed profile information, linked to the user.
Implementation Example

1. Create a Users Collection
   js
   Copy code
   db.users.insertOne({
   \_id: ObjectId("60b6cdd4e1d39c5e4f3e0b1d"),
   username: "johndoe",
   email: "john@example.com",
   profileId: ObjectId("60b6cdd4e1d39c5e4f3e0b1e")
   });
2. Create a Profiles Collection
   js
   Copy code
   db.profiles.insertOne({
   \_id: ObjectId("60b6cdd4e1d39c5e4f3e0b1e"),
   userId: ObjectId("60b6cdd4e1d39c5e4f3e0b1d"),
   firstName: "John",
   lastName: "Doe",
   age: 30,
   address: {
   street: "123 Main St",
   city: "Anytown",
   state: "CA",
   zip: "12345"
   }
   });
   How to Link and Retrieve Data
   To retrieve a user along with their profile, you can use a query to fetch the user and then another query to fetch the profile using the profileId stored in the user document. This is known as a manual "join" in MongoDB.

Example Query
js
Copy code
const userId = ObjectId("60b6cdd4e1d39c5e4f3e0b1d");

// Fetch the user
const user = db.users.findOne({ \_id: userId });

// Fetch the associated profile
const profile = db.profiles.findOne({ \_id: user.profileId });

print("User:", user);
print("Profile:", profile);
Advantages and Considerations
Separation of Concerns: Storing data in separate collections can make the database easier to manage and scale.
Performance: Fetching smaller documents (e.g., user data) is faster. You can fetch profile data only when needed.
Complexity: Managing references and ensuring data integrity requires careful handling, such as using transactions if you need atomic operations across collections.
In this design, every user document points to a unique profile document, ensuring a one-to-one relationship.
