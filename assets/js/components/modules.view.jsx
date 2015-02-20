'use strict';

var m = require('mithril');

exports.message = function(ctrl, name) {
  var message = ctrl.vm.message();
  return <p key="message" class={name + '-message ' + name + '-message--' + (message && message.type || 'none')}>{message && message.message || ''}</p>;
}
