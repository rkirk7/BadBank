const express = require('express');
const cors = require('cors');
var dal = require('./backend/dal.js');

const app = express();
const port = 5000;

app.use(express.static('build'));
app.use(cors());

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

app.listen(port);
console.log(`server running on port ${port}`);