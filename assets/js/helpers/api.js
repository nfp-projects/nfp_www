'use strict';
/* global settings */

var m = require('mithril');
var auth = require('./authentication');
var _ = require('lodash');

var apiUrl = settings.api_url;

var api = {};

api._unwrapError = function(data, xhr) {
  data = data || {};
  if (xhr.status === 401) {
    auth.logout();
    m.route('/login');
    var login = require('../components/login/login.model');
    login.vm.errors('Unauthorized error, please re-login');
  }
  return {
    status: xhr.status,
    message: data.message || 'Unknown critical error',
    body: data.body
  };
};

api.get = function(path, options) {
  options = _.defaults(options || {}, {
    method: 'GET',
    url: apiUrl + path,
    unwrapError: api._unwrapError,
    config: auth.config
  });
  return m.request(options);
};

api.post = function(path, data, options) {
  options = _.defaults(options || {}, {
    method: 'POST',
    url: apiUrl + path,
    data: data,
    unwrapError: api._unwrapError,
    config: auth.config
  });
  return m.request(options);
};

module.exports = api;

