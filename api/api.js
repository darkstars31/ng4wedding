
var config  = require('./config');
var express = require('express');
var app     = express();
var bodyparser = require('body-parser');
var firebase = require("firebase");

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

firebase.initializeApp(config.firebase);
var dbContext = firebase.database();


app.get('/rsvp/:code', function(req, res){
    dbContext.ref('/rsvp/families/'+req.params.code).once('value').then(function(snapshot) {
      res.send(snapshot.exists()); 
    });    
});

app.patch('/rsvp/:code', function (req, res) {
  dbContext.ref('/rsvp/families/'+req.params.code).once('value').then(function(snapshot) {
    if(snapshot.exists()) {
      var family = dbContext.ref('/rsvp/families/');
      family.child(req.params.code).update(
        req.body
      );
        res.send("Success");
      } else {
        res.send('Failure');
      }
  });    
});


  
app.listen(config.express.port);

