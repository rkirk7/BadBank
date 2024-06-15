const MongoClient = require('mongodb').MongoClient;
const url          = 'mongodb://localhost:27017';
let db              = null;
const { initializeApp } = require("firebase/app");
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require("firebase/auth");

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

  async function createFirebase(name, email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        create(name, email, password);
      } catch (error) {
        console.error('Error creating user with Firebase:', error.code, error.message);
        throw error;
      }
  }

  async function create(name, email) {
    if (!db) {
        throw new Error('database connection not successful');
    }
    const collection = db.collection('users');
    const doc = {name, email, balance: 0};
    try {
        const result = await collection.insertOne(doc);
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

async function balance(email) {
    if (!db) {
        throw new Error('database connection not successful');
    }
    try {
        const docs = await db.collection('users').find( {"email" : email}).toArray();
        console.log(docs);
        return docs[0];
    } catch (err) {
        console.error('error retrieving docs', err);
    }
}

async function updateBalance(email, newamount) {
    if (!db) {
        throw new Error('database connection not successful');
    }
    try {
        const result = await db.collection('users').updateOne(
            { email: email },
            { $set: { balance: newamount } }
        );
        return newamount;
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
    } catch (err) {
        console.error('error retrieving docs', err);       
    }
}

async function loginFirebase(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('logged in on firebase');
        return await login(email);
    } catch (error) {
        console.error('Error logging in with Firebase:', error.code, error.message);
        return(error);
    }
}

async function logout() {
    try {
        await auth.signOut();
        return { message: 'Logout successful' };
    } catch (error) {
        console.error('Error during logout:', error);
        throw error;
    }
}

  module.exports = {create, createFirebase, loginFirebase, all, balance, updateBalance, login, logout}