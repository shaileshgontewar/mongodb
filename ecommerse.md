           show dbs
           use ecommerse

ecommerse> db.product.insertOne({title:"shose",price:100})
ecommerse> show collections
ecommerse> db.product.find()
ecommerse> db.product.findOne()
ecommerse> db.product.findOne({price:100})

# for cleare - cls

# delete document

ecommerse> db.categories.deleteOne({\_id: ObjectId("669c9fad9e2207be1ce8375f")})
ecommerse> db.categories.deleteMany({})

# update document

ecommerse> db.categories.updateOne({title:"sample 1"},{$set:{quantity:13}})
ecommerse> db.categories.updateMany({title:"sample 12"},{$set:{quantity:13}})
ecommerse> db.categories.updateMany({},{$set:{quantity:13}})

# for drop collection

ecommerse> db.categories.drop()

for find doc whose quantity is less the ten
ecommerse> db.categories.find({quantity:{$lt:50}})

ecommerse> db.categories.updateOne({quantity:{$lt:15}},{$set:{quantity:55}})

# update and replaceOne is important part
