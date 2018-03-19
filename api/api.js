
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
  var origin = req.get('origin');
  console.log('Origin:' ,origin);
  if( !origin || config.express.allowedOrigins.some((item) => origin.includes(item))){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.header("Content-Type","application/json")
    next();
  } else {
    res.status(401);
    res.send('Not in the allowed origins list.');
  }
  
});

console.log('Listening on localhost:'+ config.express.port);
console.log('Allowing Origins:'+ config.express.allowedOrigins);

app.get('/health', (req,res,next) => {
  dao.get('/rsvp/health').then((snapshot) => {
    res.status(200);
    res.send({ health: snapshot });
  }).catch(e => {
    console.log(e);
    res.status(503);
    res.send({ health: 'false' });
  });    
});

app.get('/rsvp/:code', (req, res, next) => {
    dao.get('/rsvp/families/'+req.params.code.toLowerCase()).then((snapshot) => {
      if(snapshot.exists()){
        res.send({ 
          "accessToken": jwtHelper.generate(req.params.code)
        });
      } else {
        if(req.params.code != 'health'){
          logger.error("Rsvp Code does not exist. Code: " + req.params.code);
        }
        res.send(snapshot.exists()); 
      } 
    }).catch(e => {
      InternalServerError(res, e);
    });    
});

app.patch('/rsvp/:code', jwtHelper.validate, (req, res, next) => {
  dao.get('/rsvp/families/'+req.params.code).then((snapshot) => {
    if(snapshot.exists()) {
      try{
        var family = dao.ref('/rsvp/families/');
        family.child(req.params.code).update(req.body);
        res.send(true);
      } catch(e){
        InternalServerError(res, e);
      }
    } else {
      res.send(false);
    }
  });    

});

// app.use(function (req, res, next) {
//   res.status(404).send(`404 No Route Match for ${req.url}`);
//   if(res.status(404)){
//     console.log(`404 No Route Match`);
//   }
// });

function InternalServerError(res, e){
  console.log('Exception Caught: ' + e);
  res.status(503);
  res.send("Internal Server Error. Message: " + e);
}

  
app.listen(config.express.port);

