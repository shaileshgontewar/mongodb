ctrl + L --- clear all

test> use school_db
switched to db school_db
school_db> db.students
school_db.students
school_db> db.students.insertOne({name:"Shailesh",age:12})
{
acknowledged: true,
insertedId: ObjectId("6534ba43c6181a5e3c0f5ead")
}
school_db> db.students.insertOne({name:"Pranay",age:32})
{
acknowledged: true,
insertedId: ObjectId("6534ba62c6181a5e3c0f5eae")
}
school_db>
