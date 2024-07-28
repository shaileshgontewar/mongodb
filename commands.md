show dbs
use school - create and switch into db

db.createCollection("shailesh") create collection
show.collections

find()
findOne()

insertOne()
insertMany()

<!-- Delete cllection -->

db.yourCollectionName.deleteMany({ id: { $gte: 54, $lte: 60 } })
db.yourCollectionName.deleteMany({ id: { $gt: 54 } })

db.collectionname.drop()

<!-- update -->

db.students.updateOne({},{})
school_db> db.students.updateOne({name:"Kalyani"},{$set:{age:27}})
school_db> db.students.updateMany({age:{$lte:18}},{$set:{isEligible:false}})
school_db> db.students.updateMany({},{$set:{hobbies:["reading"]}})
school_db> db.students.updateMany({name:"Kalyani"},{$set:{isIdentity:{hasPancard:false,hasAadhar:true}}})
school_db> db.students.find({"isIdentity.hasAadhar":true})

<!-- Ordered Option -->

insertOne(data,option)
insertMany(data,option)
let option {ordered:false} - if you want to insert id 3 then use option its doent show error
library> db.books.insertMany([{_id:1,name:"Science",price:100},{_id:2,name:"Geography",price:40}],option)
library> db.books.insertMany([
{_id:1,name:"Science",price:100},
{_id:2,name:"Geography",price:40},
{_id:3,name:"Geography",price:40}],option)
