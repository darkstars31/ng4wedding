
var config  = require('./config');
var express = require('express');
var app     = express();
var jwt     = require('jsonwebtoken');
var bodyparser = require('body-parser');
var firebase = require("firebase");

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
firebase.initializeApp(config.firebase);

var dbContext = firebase.database();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

console.log('Listening on localhost:'+ config.express.port);

app.get('/rsvp/:code', function(req, res, next){
    dbContext.ref('/rsvp/families/'+req.params.code).once('value').then(function(snapshot) {
      if(snapshot.exists()){
        res.send(generateJwt());
      } else {
        res.send(snapshot.exists()); 
      } 
    });    
});

app.patch('/rsvp/:code', validateJwt, function (req, res, next) {
  //validateJwt(req,res);
  dbContext.ref('/rsvp/families/'+req.params.code).once('value').then(function(snapshot) {
    if(snapshot.exists()) {
      var family = dbContext.ref('/rsvp/families/');
      family.child(req.params.code).update(
        req.body
      );
        res.send(true);
      } else {
        res.send(false);
      }
  });    
});

function validateJwt(req, res, next) {
  try {
    jwt.verify(req.headers.authorization,config.rsaKeys.public);
  } catch (e) {
    res.statusCode = 401;
    res.send('Unauthorized');
    return;
  }
  next();
    
}

function generateJwt() {
  let expiration = Math.floor(Date.now() / 1000) + (60 * 60);
  return jwt.sign({exp: expiration},config.rsaKeys.private, {algorithm: 'RS256'});  
}


  
app.listen(config.express.port);

