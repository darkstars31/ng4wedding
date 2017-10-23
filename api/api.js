
var config  = require('./config');
var express = require('express');
var log4js  = require('log4js');
var app     = express();
var jwt     = require('jsonwebtoken');
var bodyparser = require('body-parser');
var firebase = require("firebase");

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
firebase.initializeApp(config.firebase);
firebase.auth().signInWithEmailAndPassword(config.firebaseAuth.email,config.firebaseAuth.password).catch(err => { console.log(err)});
var dbContext = firebase.database();
var logger = log4js.getLogger('api');
log4js.configure(config.log4jsConfig);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

console.log('Listening on localhost:'+ config.express.port);

app.get('/health', function(req,res,next){
    res.status(200);
    res.send();
});

app.get('/rsvp/:code', function(req, res, next){
    dbContext.ref('/rsvp/families/'+req.params.code).once('value').then(function(snapshot) {
      if(snapshot.exists()){
        res.send(generateJwt(snapshot));
      } else {
        logger.error("Rsvp Code does not exist. Code: " + req.params.code);
        res.send(snapshot.exists()); 
      } 
    });    
});

app.patch('/rsvp/:code', validateJwt, function (req, res, next) {
  //validateJwt(req,res);
  dbContext.ref('/rsvp/families/'+req.params.code).once('value').then(function(snapshot) {
    if(snapshot.exists()) {
      try{
      var family = dbContext.ref('/rsvp/families/');
      family.child(req.params.code).update(req.body);
      res.send(true);
      } catch(e){
        logger.error("Failure updating Family: "+req.params.code+" with data "+ JSON.stringify(req.body));
      }
    } else {
      res.send(false);
    }
  });    
});

function validateJwt(req, res, next) {
  try {
    jwt.verify(req.headers.authorization,config.rsaKeys.public);
  } catch (e) {
    res.status(401);
    res.send('Unauthorized');
    return;
  }
  next();
}

function generateJwt(payload) {
  let expiration = Math.floor(Date.now() / 1000) + (60 * 60);
  return jwt.sign({payload: payload, exp: expiration},config.rsaKeys.private, {algorithm: 'RS256'});  
}


  
app.listen(config.express.port);

