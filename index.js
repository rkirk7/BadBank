const express = require('express');
const app = express();
const cors = require('cors');
var dal = require('./dal.js');

//used to serve static files from public directory
app.use(express.static('build'));
app.use(cors());

//create an account
app.get('/account/create/:name/:email/:password', async (req, res) => {
    try {
        const user = await dal.create(req.params.name, req.params.email, req.params.password);
        res.status(201).send(user);
    } catch (err) {
        console.error('error creating account', err);
        res.status(500).send({error: 'failed to create account'});
    }
});

app.get('/account/createfirebase/:name/:email/:password', async (req, res) => {
    try {
        const user = await dal.createFirebase(req.params.name, req.params.email, req.params.password);
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
        const doc = await dal.balance(req.params.email);
        res.send(doc);
    } catch (err) {
    console.error('error retrieving balance', err);
    res.status(500).send({error: 'failed to retrieve balance'});
    }
});

app.get('/account/updateBalance/:email/:amount', async function(req,res) {
    try {
        const newBalance = await dal.updateBalance(req.params.email, Number(req.params.amount));
        res.send({ email: req.params.email, newBalance });
    } catch (err) {
        console.error('Error updating balance', err);
        res.status(500).send({ error: 'Failed to update balance' });
    }
});

//login user
app.get('/account/login/:email/', async function(req,res) {
    try {
        const doc = await dal.login(req.params.email);
        res.send(doc);
    } catch (err) {
        res.status(404).send({ error: 'Failed to find account' });
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
        const doc = await dal.loginFirebase(req.params.email, req.params.password);
        res.send(doc);
    } catch (err) {
        res.status(404).send({ error: 'Failed to find account' });
    }
});

var port = 3000;
app.listen(port);
console.log('running on port:' + port);