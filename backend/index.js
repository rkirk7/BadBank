require('dotenv').config();
const express = require('express');
const cors = require('cors');
var dal = require('./dal.js');

const app = express();
const port = 4000;

app.use(express.static('build'));
app.use(cors());
app.use(express.json());

app.post('/account/createaccount/', async (req, res) => {
    const { name, email, password, requestedRole } = req.body;
    try {
        const user = await dal.createFirebase(name, email, password, requestedRole);
        res.status(201).send(user);
    } catch (err) {
        console.error('error creating account', err);
        res.status(500).send({error: 'failed to create account'});
    }
});

app.post('/account/login/', async function(req,res) {
    const { email, password } = req.body;
    try {
        const user = await dal.loginFirebase(email, password);
        res.send(user);

    } catch (err) {
        console.error('Error logging in:', err);
        res.status(404).send({ error: 'Failed to find account' });
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

app.get('/account/authorization/', async function(req,res) {
    try {
        const user = await dal.checkAuthorization();
        if (user === null) {
            res.send("error");
        } else {
        res.send(user);
        }
    } catch (err) {
    console.error('error checking authorization', err);
    res.status(500).send({error: 'failed to check authorization'});
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

app.get('/account/transfer/:fromemail/:toemail/:sentamount/:frombalance/:tobalance', async function(req,res) {
    try {
        const data = await dal.transfer(req.params.fromemail, req.params.toemail, Number(req.params.sentamount), Number(req.params.frombalance), Number(req.params.tobalance));
        res.send(data);
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

app.listen(port);
console.log(`server running on port ${port}`);