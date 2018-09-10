const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/conFusion';
const dbname = 'conFusion';

MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {

  assert.equal(err, null);

  console.log('Connected correctly to server');
  
  const db = client.db(dbname);
  const collection = db.collection("dishes");
  /*
  collection.insertOne(({"name": "Mighty Tasty Burgers", "description": "World's tastiest burgers!"}), 
  (err, result) => {
    assert.equal(err, null);

    console.log("After Insert:\n");
    console.log(result.ops);

    collection.find({}).toArray((err, docs) => {
      assert.equal(err, null);

      console.log("Found:\n");
      console.log(docs);

      db.dropCollection("dishes", (err, result) => {
        assert.equal(err, null);

        client.close();
      });
    });
  });
  */
  dboper.insertDocument(db, { name: "Bacon Cheese Burger", description: "Tasty" },
      "dishes", (result) => {
        console.log("Insert Document:\n", result.ops);

        dboper.findDocuments(db, "dishes", (docs) => {
          console.log("Found Documents:\n", docs);

          dboper.updateDocument(db, { name: "Bacon Cheese Burger" },
              { description: "Very, very tasty" }, "dishes", 
              (result) => {
                console.log("Updated Document:\n", result.result);

            dboper.findDocuments(db, "dishes", (docs) => {
              console.log("Found Updated Documents:\n", docs);

              db.dropCollection("dishes", (result) => {
                console.log("Dropped Collection: ", result);

                client.close();
              });
            });
          });
        });
  });
});


