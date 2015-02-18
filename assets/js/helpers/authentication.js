'use strict';

//Modules
var jso = require('jso-browser');
var m = require('mithril');
var jwt_decode = require('jwt-decode');

//Configure JSO
jso.configure({
  google: {
    client_id: '1076074914074-0v1jdrfjbacdkihmorbksl3v7jhkvqvi.apps.googleusercontent.com',
    redirect_uri: 'http://localhost:3001/login/oauth2',
    authorization: 'https://accounts.google.com/o/oauth2/auth',
    presenttoken: 'qs'
  }
});

var auth = {};

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
  xhr.setRequestHeader("Content-Type", "application/json");
  auth.verifyExp();
  if (auth.loggedIn) {
    xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('access_token'));
  }
};

module.exports = auth;
