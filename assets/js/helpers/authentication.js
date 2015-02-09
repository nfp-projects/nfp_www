'use strict';

//Modules

var jso = require('jso-browser');
var m = require('mithril');


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

auth.loggedIn = m.prop(false);
auth.jso = jso;
auth.scopes = {
  google: ['https://www.googleapis.com/auth/userinfo.profile']
};

auth.init = function() {
  var access_token = localStorage.getItem('access_token');
  if (access_token) {
    auth.loggedIn(true);
  }
};

auth.authenticated = function(access_token) {
  localStorage.setItem('access_token', access_token);
  auth.loggedIn(true);
};

auth.logout = function() {
  localStorage.removeItem('access_token');
  auth.loggedIn(false);
  jso.wipe();
};

auth.config = function(xhr) {
  xhr.setRequestHeader("Content-Type", "application/json");
};

module.exports = auth;
