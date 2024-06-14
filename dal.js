const MongoClient = require('mongodb').MongoClient;
const url          = 'mongodb://localhost:27017';
let db              = null;

//connect to Mongo
MongoClient.connect(url)
  .then((client) => {
    console.log('Connected to MongoDB!')

     db = client.db('myproject');
  })
  .catch(err => {
    console.error('failed to connect to MongoDB', err);
  });

  //create user account

  async function create(name, email, password) {
    if (!db) {
        throw new Error('database connection not successful');
    }
    const collection = db.collection('users');
    const doc = {name, email, password, balance: 0};
    try {
        const result = await collection.insertOne(doc);
        console.log('result:', result);
        return result;
    } catch (err) {
        console.error('error inserting doc', err);
        throw err;
    }
  }

  async function all() {
    if (!db) {
        throw new Error('database connection not successful');
    }
    try {
        const docs = await db.collection('users').find().toArray();
        return docs
    } catch (err) {
        console.error('error retrieving docs', err);
        throw err;
    }
}

  module.exports = {create,all}