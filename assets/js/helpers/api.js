'use strict';

var m = require('mithril');
var auth = require('./authentication');
var _ = require('lodash');

var apiUrl = 'https://api.nfp.is';
var api = {};

api._unwrapError = function(data, xhr) {
  return {
    status: xhr.status,
    data: data
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
