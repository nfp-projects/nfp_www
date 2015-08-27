'use strict';

var _ = require('lodash');
var m = require('mithril');
var helper = require('../../helpers/view');

exports.message = function(ctrl, name) {
  var message = ctrl.vm.message();
  return m("p", {key:"message", class:name + '-message ' + name + '-message--' + (message && message.type || 'none')}, [message && message.message || '']);
}

exports.loadingIcon = function(ctrl, name) {
  return m("div", {class:"row", style:{display: ctrl.vm.working ? 'block' : 'none'}}, [
            m("div", {class:"large-12 columns"}, [
              m("div", {class:"spinner spinner--large"}, [
                m("div", {class:"bounce1"}), 
                m("div", {class:"bounce2"}), 
                m("div", {class:"bounce3"})
              ])
            ])
          ])
}
