var config  = require('./config');
var jwt = require('jsonwebtoken');
var log4js  = require('log4js');
log4js.configure(config.log4jsConfig);
var logger = log4js.getLogger('api');
var fs = require('fs');

var jwtHelper = {
    
    validate: (req, res, next) => {
        try {
          var key = fs.readFileSync(__dirname + '/keys/public_key.pem');
          jwt.verify(req.headers.authorization.replace(/"/g,''),key);
        } catch (e) {
          logger.error('Token validation failure, Reason:' + e);
          logger.error('Failed Token:' + req.headers.authorization);
          res.status(401);
          res.send('Unauthorized. Message: '+ e);
          return;
        }
        next();
      },

      generate: (payload) => {
        var key = fs.readFileSync(__dirname + '/keys/private_key.pem');
        return jwt.sign({payload: payload}, key, {algorithm: 'RS256', expiresIn: '1h'});  
      }
}

module.exports = jwtHelper;