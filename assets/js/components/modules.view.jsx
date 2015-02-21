'use strict';

var m = require('mithril');
var helper = require('../helpers/view');

exports.message = function(ctrl, name) {
  var message = ctrl.vm.message();
  return <p key="message" class={name + '-message ' + name + '-message--' + (message && message.type || 'none')}>{message && message.message || ''}</p>;
}

exports.header_link = function(ctrl, path, text, classes, hide) {
  if (hide) return;
  if (m.route().indexOf(path) === 0 && path !== '/' || path === m.route()) {
    classes += ' navigation-item--selected';
  }
  return <div key={path} class={classes}>
          <a href={path} config={helper.link}>{text}</a>
        </div>
}
