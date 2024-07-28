# Mongodb Cursor and how it is useful for iterating documents using find method- MongoDB

when you insert many doc , it will show only top 20 doc
ecommerse> db.categories.find()
after you need to type " it " for show more doc

ecommerse> var cat=db.categories.find()
ecommerse> cat
for showing all doc type this cmd
ecommerse> db.categories.find().forEach(cat =>printjson(cat))

<!--  -->

In MongoDB, a cursor is an object that allows you to iterate over the results of a query. When you perform a query using the find method, MongoDB returns a cursor, which you can then use to traverse the documents that match the query criteria.

Key Features of MongoDB Cursor:
Lazy Fetching: A cursor fetches documents in batches, reducing memory consumption and allowing the application to start processing documents before the entire result set is retrieved.
Iterable: You can iterate through the documents using methods such as next, hasNext, or even using loops in various programming languages.
Methods: Cursors provide various methods to control the query and its results, such as limit, skip, sort, count, etc.
Tailable Cursors: These are special cursors that allow you to continue retrieving documents as they are added to the collection, useful for processing logs or real-time data.

# Benefits of Using Cursors

Memory Efficiency: By fetching documents in batches, cursors reduce the memory footprint of your application.
Immediate Processing: You can start processing documents as they are retrieved, without waiting for the entire query to complete.
Control: Cursors give you fine-grained control over the retrieval and processing of documents, enabling efficient and optimized querying.
Cursors are a fundamental part of working with MongoDB, allowing for flexible and efficient data retrieval and processing.
