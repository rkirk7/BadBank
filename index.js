const express = require('express');
const app = express();
const cors = require('cors');

//used to serve static files from public directory
app.use(express.static('build'));
app.use(cors());

//create an account
app.get('/account/create/:name/:email/:password', function(req, res) {
    res.send({
        name:       req.params.name,
        email:      req.params.email,
        password:   req.params.password
    });
});

//login user
app.get('/account/login/:email/:password', function(req,res) {
    res.send({
        email:      req.params.email,
        password:   req.params.password
    });
});

app.get('/account/all', function(req, res) {
    res.send({
        name:       'test',
        email:      'test@gmail.com',
        password:   'secret'
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