
var config  = require('./config');
var tunnel  = require('tunnel-ssh')
var express = require('express');
var app     = express();
var mysql   = require('mysql');


var db = mysql.createConnection(config.mysql);

var server  = tunnel(config.sshData, function(err, result) {
    console.log('SSH TUNNEL CONNECTED.');
    db.connect();
});

app.get('/rsvp', function(req, res){
    res.send('hello world');
  });
  
app.listen(config.express.port);

