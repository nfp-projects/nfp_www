'use strict';

var _ = require('lodash');
var m = require('mithril');
var helper = require('../helpers/view');

exports.message = function(ctrl, name) {
  var message = ctrl.vm.message();
  return <p key="message" class={name + '-message ' + name + '-message--' + (message && message.type || 'none')}>{message && message.message || ''}</p>;
}
