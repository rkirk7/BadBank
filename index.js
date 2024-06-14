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
        console.log('express success', user);
    } catch (err) {
        console.error('error creating account', err);
        res.status(500).send({error: 'failed to create account'});
    }
});

app.get('/account/all', async (req, res) => {
    try {
    const docs = await dal.all();
    console.log(docs);
        res.send(docs);
    } catch (err) {
        console.error('error retrieving all accounts', err);
        res.status(500).send({error: 'failed to retrieve accounts'});
    }
});

//login user
app.get('/account/login/:email/:password', function(req,res) {
    res.send({
        email:      req.params.email,
        password:   req.params.password
    });
});


app.get('/account/deposit/:email/:amount', function(req,res) {
    res.send({
        email:      req.params.email,
        password:   req.params.amount
    });
});

app.get('/account/withdraw/:email/:amount', function(req,res) {
    res.send({
        email:      req.params.email,
        password:   req.params.amount
    });
});

var port = 3000;
app.listen(port);
console.log('running on port:' + port);