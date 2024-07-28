# Implement Subset Pattern in the one to many Relationship for the documents - MongoDB

The Subset Pattern is a design pattern used in MongoDB to handle one-to-many relationships where a subset of the related data needs to be frequently accessed together with the parent document. It optimizes for performance by embedding a small number of related documents inside the parent document, while keeping the rest of the data in a separate collection.

Here's how you can implement the Subset Pattern in MongoDB:

1. Define the Data Structure
   Suppose you have a User collection and a Post collection. A user can have many posts, but you often need to access the most recent posts with the user's profile.

User Document:

json
Copy code
{
"\_id": ObjectId("..."),
"username": "john_doe",
"email": "john@example.com",
"recentPosts": [
{
"_id": ObjectId("..."),
"title": "First Post",
"content": "This is the first post.",
"createdAt": ISODate("2024-07-27T12:00:00Z")
},
{
"_id": ObjectId("..."),
"title": "Second Post",
"content": "This is the second post.",
"createdAt": ISODate("2024-07-27T12:30:00Z")
}
]
}
Post Document:

json
Copy code
{
"\_id": ObjectId("..."),
"userId": ObjectId("..."),
"title": "Post Title",
"content": "Post content.",
"createdAt": ISODate("2024-07-27T12:00:00Z")
} 2. Inserting Documents
When a user creates a new post, you add it to both the Post collection and the recentPosts array in the User document.

Example of Inserting a New Post:

js
Copy code
const post = {
userId: userId,
title: "New Post",
content: "This is a new post.",
createdAt: new Date()
};

// Insert into the Posts collection
const postId = db.posts.insertOne(post).insertedId;

// Add to the recentPosts array in the User document
db.users.updateOne(
{ \_id: userId },
{
$push: {
recentPosts: {
\_id: postId,
title: post.title,
content: post.content,
createdAt: post.createdAt
}
},
$slice: -5 // Keep only the last 5 posts
}
); 3. Handling Data Consistency
Updates: When a post is updated, you must update it both in the Post collection and the recentPosts array in the User document.
Deletions: When a post is deleted, ensure it is removed from both the Post collection and the recentPosts array.
Example of Updating a Post:

js
Copy code
const postId = ...; // The ID of the post to update
const updatedContent = "Updated content.";

db.posts.updateOne({ \_id: postId }, { $set: { content: updatedContent } });
db.users.updateOne(
  { "recentPosts._id": postId },
  { $set: { "recentPosts.$.content": updatedContent } }
); 4. Querying Data
To fetch a user's profile along with their recent posts, you can query the User collection directly:

Example of Fetching User with Recent Posts:

js
Copy code
const userId = ...;
const user = db.users.findOne({ \_id: userId }, { recentPosts: 1, username: 1, email: 1 }); 5. Advantages and Considerations
Advantages:

Performance: Reduces the number of queries needed to fetch frequently accessed data.
Convenience: Related data is stored together, simplifying access.
Considerations:

Consistency: Ensuring that data in the embedded array and the separate collection remains consistent can require additional logic.
Size Limits: MongoDB documents have a maximum size limit of 16MB, so this pattern is best suited for small to moderate-sized subsets.
By carefully choosing which data to embed, you can optimize your application's performance while maintaining manageable data sizes.
