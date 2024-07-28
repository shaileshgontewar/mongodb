# Implement Many to Many Relationship with Embedded Documents - MongoDB

In MongoDB, implementing a many-to-many relationship can be done using embedded documents or by referencing documents. When using embedded documents, you essentially store arrays of embedded documents within other documents. However, embedded documents are typically used for simpler relationships or when data is not too large. For many-to-many relationships with potentially large or complex datasets, using references might be more suitable.

Here’s an example of how to implement a many-to-many relationship using embedded documents in MongoDB:

Example Scenario
Let’s say you have two collections: Students and Courses. A student can enroll in multiple courses, and a course can have multiple students.

Embedded Document Approach
Define the Schema:

Student Document:{
"\_id": "student_id_1",
"name": "John Doe",
"enrolledCourses": [
{
"courseId": "course_id_1",
"courseName": "Mathematics"
},
{
"courseId": "course_id_2",
"courseName": "Science"
}
]
}

Course Document:{
"\_id": "course_id_1",
"courseName": "Mathematics",
"studentsEnrolled": [
{
"studentId": "student_id_1",
"studentName": "John Doe"
},
{
"studentId": "student_id_2",
"studentName": "Jane Smith"
}
]
}
Insert Documents:
// Insert a student
db.students.insertOne({
\_id: "student_id_1",
name: "John Doe",
enrolledCourses: [
{
courseId: "course_id_1",
courseName: "Mathematics"
},
{
courseId: "course_id_2",
courseName: "Science"
}
]
});

// Insert a course
db.courses.insertOne({
\_id: "course_id_1",
courseName: "Mathematics",
studentsEnrolled: [
{
studentId: "student_id_1",
studentName: "John Doe"
},
{
studentId: "student_id_2",
studentName: "Jane Smith"
}
]
});
Querying:

To find all courses a student is enrolled in:

db.students.findOne({ \_id: "student_id_1" }, { enrolledCourses: 1 });
To find all students enrolled in a course:

db.courses.findOne({ \_id: "course_id_1" }, { studentsEnrolled: 1 });
Considerations
Data Redundancy: Using embedded documents can lead to redundancy. For example, updating a student’s name requires updating all instances where the student's name appears in course documents.

Data Size Limitations: MongoDB documents have a size limit (16 MB). If the embedded arrays become too large, you might hit this limit.

Performance: Embedded documents can lead to faster reads since related data is stored together, but they can also impact write performance due to data duplication.

Alternative: Using References
If the many-to-many relationship becomes too complex or if data size grows significantly, using references (manual linking of documents) might be a better choice. In this approach, you store references to other documents and manage relationships in your application logic.

Feel free to ask if you need more details on any specific part!

# Many to Many relationship with reference in Documents - MongoDB

In MongoDB, managing a many-to-many relationship involves a bit of design work since MongoDB is a NoSQL database and doesn't have built-in relational support like SQL databases. Here's how you can manage many-to-many relationships using references in documents:

Example Scenario
Suppose you have two collections: Students and Courses. Each student can enroll in multiple courses, and each course can have multiple students. This represents a many-to-many relationship.

Approach

1. Use Reference Fields
   In MongoDB, you can represent many-to-many relationships by using reference fields. This involves storing an array of references (ObjectIDs) in each document.

Students Collection:{
"\_id": ObjectId("student_id"),
"name": "John Doe",
"enrolledCourses": [
ObjectId("course_id_1"),
ObjectId("course_id_2")
]
}

Courses Collection:{
"\_id": ObjectId("course_id_1"),
"title": "Introduction to MongoDB",
"enrolledStudents": [
ObjectId("student_id")
]
}
In this approach:

The Students collection has an array of course IDs in the enrolledCourses field.
The Courses collection has an array of student IDs in the enrolledStudents field.

2. Update Operations
   When enrolling a student in a course:

Add the course ID to the student’s enrolledCourses array.
Add the student ID to the course’s enrolledStudents array.

When removing a student from a course:

Remove the course ID from the student’s enrolledCourses array.
Remove the student ID from the course’s enrolledStudents array.
Considerations
Data Redundancy: Keeping references in both collections ensures that you can quickly query either side of the relationship but does introduce some redundancy.
Atomicity: MongoDB does not support multi-document transactions prior to version 4.0. For versions prior to 4.0, you need to manage consistency manually. From version 4.0 onward, you can use multi-document transactions to ensure atomicity.
Indexing: Ensure that the fields used for referencing (ObjectIDs) are indexed to improve query performance.
Example Queries
Find all courses for a student:

db.students.findOne({ \_id: ObjectId("student_id") }).enrolledCourses
.map(courseId => db.courses.findOne({ \_id: courseId }));
Find all students in a course:

db.courses.findOne({ \_id: ObjectId("course_id") }).enrolledStudents
.map(studentId => db.students.findOne({ \_id: studentId }));
This way, you can effectively manage many-to-many relationships in MongoDB using document references.
