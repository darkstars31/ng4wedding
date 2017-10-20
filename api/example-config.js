var config = 
{
    "express": {
        "port": "3031"
    },
    "firebase":{       
        apiKey: "firebaseApiKey",
        authDomain: "[YourFirebaseSubDomain].firebaseapp.com",
        databaseURL: "https://[YourFirebaseSubDomain].firebaseio.com",
        projectId: "[YourFirebaseProjectId]",
        storageBucket: "[YourFirebaseProjectId].appspot.com",
        messagingSenderId: "[YourFirebaseMessageSenderId]"    
    },
    firebaseAuth = {
        email : "example@example.com",
        password: "[Insert Firebase Email Auth Password Here]"
    },
    rsaKeys = {
        private: `-----BEGIN RSA PRIVATE KEY-----
        FULL RSA KEY INCLUDING THE BEGIN/END RSA Key
        -----END RSA PRIVATE KEY-----`,
        public: `-----BEGIN PUBLIC KEY-----
        FULL RSA KEY INCLUDING THE BEGIN/END RSA Key
        -----END PUBLIC KEY-----
        `}
    
}

module.exports = config;