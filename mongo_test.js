const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

MongoClient.connect(url)
  .then((client) => {
    console.log('Success!')

    //database name
    const dbName = 'myproject';
    const db = client.db(dbName);

    //new user
    var name = 'user' + Math.floor(Math.random()*10000);
    var email = name + '@mit.edu';

    //insert into customer table
    var collection = db.collection('customers');
    var doc = {name, email};
    try {
        collection.insertOne(
            doc,
            { writeConcern: { w : "majority", wtimeout : 100 } }
        );
    }  catch(err) {
    console.log('Error', err);
  };

  async function getCustomers() {
    try {
    var customers = await db.collection('customers').find().toArray();
    if (!customers || !customers.length) {
        throw('no customers found');
    }
    console.log(customers);
    client.close();
  } catch (e) {
    console.log('search error', e);
    client.close();
}
  }
  getCustomers();
});
