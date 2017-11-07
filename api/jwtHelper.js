var config  = require('./config');
var jwt = require('jsonwebtoken');
var fs = require('fs');

var jwtHelper = {
    
    validate: function(req, res, next) {
        try {
          var key = fs.readFileSync(__dirname + '/keys/public_key.pem');
          jwt.verify(req.headers.authorization,key);
        } catch (e) {
          res.status(401);
          res.send('Unauthorized. Message: '+ e);
          return;
        }
        next();
      },

      generate: function(payload) {
        var key = fs.readFileSync(__dirname + '/keys/private_key.pem');
        let expiration = Math.floor(Date.now() / 1000) + (60 * 60);
        return jwt.sign({payload: payload, exp: expiration},key, {algorithm: 'RS256'});  
      }
}

module.exports = jwtHelper;