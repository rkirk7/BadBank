require('dotenv').config();
const express = require('express');
const cors = require('cors');
var dal = require('./dal.js');

const app = express();
const port = 3000;

app.use(express.static('build'));
app.use(cors());
app.use(express.json());

app.get('/account/createaccount/:name/:email/:requestedRole', async (req, res) => {
    try {
        const user = await dal.create(req.params.name, req.params.email, req.params.requestedRole);
        res.send(user);
    } catch (err) {
        console.error('error creating account', err);
        res.status(500).send({error: 'failed to create account'});
    }
});

app.get('/account/login/:email', async function(req,res) {
    try {
        const user = await dal.login(req.params.email);
        if (user) res.send(user);
        else {
            res.send(null);
        }

    } catch (err) {
        console.error('Error logging in:', err);
        res.status(404).send({ error: 'Failed to find account' });
    }
});

app.get('/account/checkaccount/:email', async function(req,res) {
    try {
        const accountExists = await dal.checkAccount(req.params.email);
        if (accountExists) res.send(true);
        else {
            res.send(false);
        }

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

app.get('/authorization/:email', async function(req,res) {
    try {
        const user = await dal.dalCheckAuthorization(req.params.email);
        if (!user) {
            res.send(false);
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