const express = require('express');
const cors = require('cors');
var dal = require('./dal.js');
const {MongoClient, ServerApiVersion}= require('mongodb');
const uri = "mongodb+srv://regankirk:1UARA3FrwCJ2RQ6O@bankcluster.0ttoepa.mongodb.net/?retryWrites=true&w=majority&tls=true&tlsAllowInvalidCertificates=true&appName=bankcluster";
let db = null;

const app = express();
const port = 5000;

app.use(express.static('build'));
app.use(cors());

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
      console.log('database:', db);
      app.get('/account/createfirebase/:name/:email/:password/:role', async (req, res) => {
        try {
            const user = await dal.createFirebase(req.params.name, req.params.email, req.params.password, req.params.role);
            res.status(201).send(user);
        } catch (err) {
            console.error('error creating account', err);
            res.status(500).send({error: 'failed to create account'});
        }
    });
    
    app.get('/account/all', async (req, res) => {
        try {
        const docs = await dal.all();
            res.send(docs);
        } catch (err) {
            console.error('error retrieving all accounts', err);
            res.status(500).send({error: 'failed to retrieve accounts'});
        }
    });
    
    app.get('/account/balance/:email', async function(req,res) {
        try {
            const balanceDoc = await dal.balance(req.params.email);
            res.send(balanceDoc);
        } catch (err) {
        console.error('error retrieving balance', err);
        res.status(500).send({error: 'failed to retrieve balance'});
        }
    });
    
    app.get('/account/updateBalance/:email/:newamount/:status/:amount', async function(req,res) {
        try {
            const data = await dal.updateBalance(req.params.email, Number(req.params.newamount), req.params.status, Number(req.params.amount));
            res.send({ email: req.params.email, data });
        } catch (err) {
            console.error('Error updating balance', err);
            res.status(500).send({ error: 'Failed to update balance' });
        }
    });
    
    app.get('/account/getActivity/:email/:role', async function(req,res) {
        try {
            const data = await dal.getActivity(req.params.email, req.params.role);
            res.send(data);
        } catch (err) {
            console.error('Error updating balance', err);
            res.status(500).send({ error: 'Failed to update balance' });
        }
    });
    
    app.get('/account/logout/', async function(req,res) {
        try {
            const resp = await dal.logout();
            res.send(resp);
        } catch (err) {
            res.status(404).send({ error: 'Failed to find account' });
        }
    });
    
    
    app.get('/account/loginfirebase/:email/:password', async function(req,res) {
        try {
            const data = await dal.loginFirebase(req.params.email, req.params.password);
            res.send(data);
        } catch (err) {
            res.status(404).send({ error: 'Failed to find account' });
        }
    });
    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);

app.listen(port);
console.log(`server running on port ${port}`);

module.exports = {db}