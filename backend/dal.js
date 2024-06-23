const {MongoClient, ServerApiVersion}= require('mongodb');
const uri = "mongodb+srv://regankirk:1UARA3FrwCJ2RQ6O@bankcluster.0ttoepa.mongodb.net/?retryWrites=true&w=majority&tls=true&tlsAllowInvalidCertificates=true&appName=bankcluster";


let db              = null;
const { initializeApp } = require("firebase/app");
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require("firebase/auth");

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  
  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);



MongoClient.connect(uri, {tls: true})
.then((client) => {
   db = client.db('myproject');
   console.log('connected to MongoDB');
   console.log('db:', db);
})
.catch(err => {
  console.error('failed to connect to MongoDB', err);
});

const firebaseConfig = {
    apiKey: "AIzaSyDhKNCusOPW2y52bMwLnOrXIy-u1y1Q4KI",
    authDomain: "bank-f0c47.firebaseapp.com",
    projectId: "bank-f0c47",
    storageBucket: "bank-f0c47.appspot.com",
    messagingSenderId: "710670974978",
    appId: "1:710670974978:web:b724e76530555264b8271b"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth();

  async function createFirebase(name, email, password, role) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password, role);
        const user = userCredential.user;
        create(name, email, role);
      } catch (error) {
        console.error('Error creating user with Firebase:', error.code, error.message);
        throw error;
      }
  }

  async function create(name, email, role) {
    if (!db) {
        throw new Error('database connection not successful');
    }
    const collection = db.collection('users');
    const doc = {name, email, balance: 0, role};
    try {
        const result = await collection.insertOne(doc);
        return await log(email, "Created account.", result);
    } catch (err) {
        console.error('error inserting doc', err);
        throw err;
    }
  }

  async function log(email, activity, data) {
    if (!db) {
        throw new Error('database connection not successful');
    }
    const collection = db.collection('activity');
    let date = new Date();
    const doc = {email: email, activity: activity, date: date};
    try {
        const result = await collection.insertOne(doc);
        return data;
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

async function balance(email) {
    if (!db) {
        throw new Error('database connection not successful');
    }
    try {
        const docs = await db.collection('users').find( {"email" : email}).toArray();
        return docs[0]; 
        //log(email, "Checked balance.", docs[0]);
    } catch (err) {
        console.error('error retrieving docs', err);
    }
}

async function updateBalance(email, newamount, status, amount) {
    if (!db) {
        throw new Error('database connection not successful');
    }
    try {
        const result = await db.collection('users').updateOne(
            { email: email },
            { $set: { balance: newamount } }
        );
        var string = "";
        if (status === "deposit") {
           string = `Deposited $${amount}. New balance: $${newamount}.`
        } else if (status === "withdrawal") {
            string = `Withdrew $${amount}. New balance: $${newamount}.`
        }
        return await log(email, string, newamount);
    } catch (err) {
        console.error('Error updating balance:', err);
        throw err;
    }
}

async function login(email) {
    if (!db) {
        throw new Error('database connection not successful');
    }
    try {
        const docs = await db.collection('users').find( {"email" : email}).toArray();
         return docs[0];
         //await log(email, "Logged in.", docs[0]);
    } catch (err) {
        console.error('error retrieving docs', err);       
    }
}

async function loginFirebase(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return await login(email);
    } catch (error) {
        console.error('Error logging in with Firebase:', error.code, error.message);
        return(error);
    }
}

async function logout() {
    try {
        await auth.signOut();
        return;
        //await log(email, "Logged out.", { message: 'Logout successful' });
    } catch (error) {
        console.error('Error during logout:', error);
        throw error;
    }
}

async function getActivity(email, role) {
    if (!db) {
        throw new Error('database connection not successful');
    }
    try {
        let docs;
        if (role === "admin") {
            docs = await db.collection('activity').find().toArray();
        } else {
         docs = await db.collection('activity').find( {"email" : email}).toArray();
        }
        return docs;
    } catch (err) {
        console.error('error retrieving docs', err);
        throw err;
    }
}

  module.exports = {create, createFirebase, loginFirebase, all, balance, updateBalance, login, logout, getActivity}