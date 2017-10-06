
var config  = require('./config');
//var tunnel  = require('tunnel-ssh')
var express = require('express');
var app     = express();
var firebase = require("firebase");
firebase.initializeApp(config.firebase);

var db = firebase.database();


app.get('/rsvp', function(req, res){
    res.send('hello world');
  });
  
app.listen(config.express.port);

