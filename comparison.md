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
