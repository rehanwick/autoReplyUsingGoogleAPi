const express = require("express");
const router = express.Router();
const oAuth = require("./oauth/index");

function init() {  
   auth() ; 
}


function auth() { 
    router.get("/auth/google/login" ,  oAuth.authAction.googleAuthLogin )
    router.get('/auth/google/callback' , oAuth.authAction.googleAuthCallback) ; 
}


init();




module.exports = router;
