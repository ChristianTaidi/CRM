const express = require('express');
const path = require('path');
//const controller = require('./controller')
//var dao = new controller('./database.db');

var app = express();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/marketing', function (req, res) {
    console.log(req.body)
    res.json(req.body)
});

app.post('/customer', function (req, res) {
    console.log(req.body)
    res.json(req.body)
});

app.listen(8080, function () {
    console.log('App listening on port 8080!');
});