'use strict';

var m = require('mithril');

exports.message = function(ctrl) {
  var message = ctrl.vm.message();
  return <p key="message" class={'profile-message profile-message--' + (message && message.type || 'none')}>{message && message.message || ''}</p>;
}
