'use strict';

var _ = require('lodash');
var m = require('mithril');
var helper = require('../../helpers/view');

exports.message = function(ctrl, name) {
  var message = ctrl.vm.message();
  return <p key="message" class={name + '-message ' + name + '-message--' + (message && message.type || 'none')}>{message && message.message || ''}</p>;
}

exports.loadingIcon = function(ctrl, name) {
  return <div class="row" style={{display: ctrl.vm.working ? 'block' : 'none'}}>
            <div class="large-12 columns">
              <div class="spinner spinner--large">
                <div class="bounce1"></div>
                <div class="bounce2"></div>
                <div class="bounce3"></div>
              </div>
            </div>
          </div>
}
