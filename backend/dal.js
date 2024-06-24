const {MongoClient, ServerApiVersion}= require('mongodb');
const uri = "mongodb+srv://regankirk:1UARA3FrwCJ2RQ6O@bankcluster.0ttoepa.mongodb.net/?retryWrites=true&w=majority&tls=true&tlsAllowInvalidCertificates=true&appName=bankcluster";
const { initializeApp } = require("firebase/app");
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require("firebase/auth");
const { emit } = require('process');
let db = null;

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  
  async function runMongo() {
    try {
      await client.connect();
      await client.db("myproject").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
      db = client.db("myproject");
      if (db) console.log('database found');
    } catch(error) {
        console.log('error:', error);
    }
  }
  runMongo();

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

  async function createFirebase(name, email, password, requestedRole) {
    if (!db) {
        throw new Error('Database connection not established');
    }
    try {
        if (await checkAccount(email)) {
            console.log('Account already exists.');
            return true;
        } else {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log('firebase creation successful')
            return await create(name, email, requestedRole);
        }
      } catch (error) {
        console.error('Error creating user with Firebase:', error.code, error.message);
        throw error;
      }
  }

  async function checkAccount(email) {
    if (!db) {
        throw new Error('Database connection not established');
    }
    try {
        const docs = await db.collection('users').find( {"email" : email}).toArray();
        if (docs[0]) {
            return true;
        } else {
            return false;
        }
      } catch (error) {
        throw error;
      }
  }

  async function create(name, email, requestedRole) {
    if (!db) {
        throw new Error('database connection not successful');
    }
    const collection = db.collection('users');
    const doc = {name, email, balance: 0, requestedRole};
    try {
        const result = await collection.insertOne(doc);
        return await log(email, `${email } created an account.`, result);
    } catch (err) {
        console.error('error inserting doc', err);
        throw err;
    }
  }

  async function loginFirebase(email, password) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        return await login(email);
    } catch (error) {
        console.error('Error logging in with Firebase:', error.code, error.message);
        return(error);
    }
}

async function login(email) {
    if (!db) {
        throw new Error('database connection not successful');
    }
    try {
        const docs = await db.collection('users').find( {"email" : email}).toArray();
         return docs[0];
    } catch (err) {
        console.error('error retrieving docs', err);       
    }
}

  async function log(email, activity, data) {
    if (!db) {
        throw new Error('database connection not successful');
    }
    const collection = db.collection('activity');
    let date = new Date();
    const doc = {email, activity, date};
    try {
        await collection.insertOne(doc);
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
    } catch (err) {
        console.error('error retrieving docs', err);
    }
}

async function transfer(fromemail, toemail, sentamount, frombalance, tobalance ) {
    if (!db) {
        throw new Error('database connection not successful');
    }
    try {
        await db.collection('users').updateOne(
            { email: fromemail },
            { $set: { balance: frombalance } }
        );
        await db.collection('users').updateOne(
            { email: toemail },
            { $set: { balance: tobalance } }
        );
        let string = `${fromemail} transferred $${sentamount} to ${toemail}.`
        await log(toemail, string, 'money received');
        return log(fromemail, string, 'money sent'); 
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


async function logout() {
    try {
        await auth.signOut();
        return;
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

  module.exports = {create, createFirebase, loginFirebase, all, balance, updateBalance, login, logout, getActivity, transfer}