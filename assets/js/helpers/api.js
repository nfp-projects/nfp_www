'use strict';

var m = require('mithril');
var auth = require('./authentication');

var apiUrl = 'http://localhost:3000';
var api = {};

api._unwrapError = function(data, xhr) {
  return {
    status: xhr.status,
    data: data
  };
};

api.get = function(path) {
  return m.request({
    method: 'GET',
    url: apiUrl + path,
    unwrapError: api._unwrapError,
    config: auth.config()
  });
};

api.post = function(path, data) {
  return m.request({
    method: 'POST',
    url: apiUrl + path,
    data: data,
    unwrapError: api._unwrapError,
    config: auth.config
  });
};

module.exports = api;
