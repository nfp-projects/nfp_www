'use strict';
/* global settings */

//Modules
var jso = require('jso-browser');
var jwt_decode = require('jwt-decode');

//Configure JSO
jso.configure({
  google: {
    client_id: settings.google_api,
    redirect_uri: settings.redirect_url,
    authorization: 'https://accounts.google.com/o/oauth2/auth',
    presenttoken: 'qs'
  }
});

var auth = {};

window.components.auth = auth;

auth.loggedIn = false;
auth.jso = jso;
auth.user = null;
auth.scopes = {
  google: ['https://www.googleapis.com/auth/userinfo.profile',
           'https://www.googleapis.com/auth/userinfo.email']
};

auth.init = function() {
  var access_token = localStorage.getItem('access_token');
  if (access_token) {
    auth.loggedIn = true;
    auth.decode(access_token);
  }
};

auth.decode = function(token) {
  auth.user = jwt_decode(token);
  auth.verifyExp();
};

auth.verifyExp = function() {
  if (auth.user && auth.user.exp) {
    if (Math.floor(Date.now() / 1000) >= auth.user.exp) {
      auth.logout();
    }
  }
};

auth.authenticated = function(authentication) {
  localStorage.setItem('access_token', authentication.access_token);
  auth.init();
};

auth.logout = function() {
  localStorage.removeItem('access_token');
  auth.loggedIn = false;
  auth.user = null;
  jso.wipe();
};

auth.config = function(xhr) {
  //xhr.setRequestHeader("Content-Type", "application/json");
  //Above line will fail in Chrome
  auth.verifyExp();
  if (auth.loggedIn) {
    xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('access_token'));
  }
};

module.exports = auth;
