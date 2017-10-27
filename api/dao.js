var config  = require('./config');
var firebase = require("firebase");
firebase.initializeApp(config.firebase);
firebase.auth().signInWithEmailAndPassword(config.firebaseAuth.email,config.firebaseAuth.password).catch(err => { console.log(err)});

var dbContext = firebase.database();

var dao = {
    get: function (value) {
        
        return dbContext.ref(value).once('value').catch(e => console.log(e));
    }
}

module.exports = dao;