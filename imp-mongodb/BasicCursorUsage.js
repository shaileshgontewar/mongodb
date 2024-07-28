const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
const dbName = "mydatabase";

MongoClient.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) throw err;
    const db = client.db(dbName);
    const collection = db.collection("mycollection");

    const cursor = collection.find({}); // Find all documents

    cursor.forEach(
      (doc) => {
        console.log(doc); // Process each document
      },
      (err) => {
        if (err) throw err;
        client.close();
      }
    );
  }
);

collection
  .find({})
  .limit(10) // Limit the result to 10 documents
  .skip(5) // Skip the first 5 documents
  .sort({ age: -1 }) // Sort documents by age in descending order
  .toArray((err, docs) => {
    if (err) throw err;
    console.log(docs);
    client.close();
  });

const cursor = collection.find({});
function iterateCursor() {
  cursor.hasNext((err, hasNext) => {
    if (err) throw err;
    if (hasNext) {
      cursor.next((err, doc) => {
        if (err) throw err;
        console.log(doc); // Process each document
        iterateCursor(); // Recursively process next document
      });
    } else {
      client.close();
    }
  });
}

iterateCursor();
