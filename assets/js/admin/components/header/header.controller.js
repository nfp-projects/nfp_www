'use strict';

//Local modules
var m = require('mithril');
var auth = require('../../../helpers/authentication');
var header = require('./header.model');

require('./header.view'); //load the view

header._controller = function() {
};

module.exports = header;