
var config  = require('./config');
var dao     = require('./dao');
var express = require('express');
var log4js  = require('log4js');
var app     = express();
var jwtHelper = require('./jwtHelper');
var bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
var logger = log4js.getLogger('api');
log4js.configure(config.log4jsConfig);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

console.log('Listening on localhost:'+ config.express.port);

app.get('/health', (req,res,next) => {
  dao.get('/rsvp/health').then((snapshot) => {
    res.status(200);
    res.send(snapshot);
  }).catch(e => console.log(e));    
});

app.get('/rsvp/:code', (req, res, next) => {
    dao.get('/rsvp/families/'+req.params.code).then((snapshot) => {
      if(snapshot.exists()){
        res.send(JSON.stringify(jwtHelper.generate(snapshot)));
      } else {
        logger.error("Rsvp Code does not exist. Code: " + req.params.code);
        res.send(snapshot.exists()); 
      } 
    }).catch(e => {
      console.log(e);
      res.status(503);
      res.send("Error: "+ e);
    });    
});

app.patch('/rsvp/:code', jwtHelper.validate, (req, res, next) => {
  dao.get('/rsvp/families/'+req.params.code).then((snapshot) => {
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

  
app.listen(config.express.port);

