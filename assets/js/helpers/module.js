'use strict';

var m = require('mithril');
var layout;

function Module() {
  var built = false;

  this.controller = function() {
    var route = m.route();
    try {
      if (!built && this.vm) {
        this.vmBuilder(this.vm);
      }
      built = true;
      if (this._controller) {
        this._controller.call(this);
      }
    }
    catch (error) {
      console.error(error);
      if (this.vm && this.vm.addMessage) {
        this.vm.message({
          type: 'error',
          message: 'Unhandled error: ' + error.message,
          error: error
        });
      } else {
        this.criticalState = true;
        var generic = require('../components/public/generic/generic.controller');
        m.render(document.body, m('#container.container', generic('error').view(error)));
      }
    }
    if (route === m.route()) {
      layout.loadLayout(this.layout);
    }
  };

  this.controller.prototype = this;
}

Module.prototype = {

  vmBuilder: function(vm) {
    vm.working = false;

    if (vm.addMessage) {
      this.vmAddMessage(vm);
    }

    vm._init = vm.init || function() { };
    vm.init = function(ctrl) {
      if (vm.addMessage) {
        vm.message();
      }
      vm._init(ctrl);
      return vm;
    };
  },

  vmAddMessage: function(vm) {
    //Support for single-use messages
    var message = null;
    vm.message = function(value) {
      if (value) {
        return message = value;
      }
      var temp = message;
      message = null;
      return temp;
    };

    vm.messagePeek = function() {
      return message;
    };

    ['info','error','success'].forEach(function(k) {
      vm[k] = function(message) {
        vm.message({type: k, message: message});
      };
    });
  },

  view: function(ctrl) {
    if (ctrl.layout) {
      return layout.view(ctrl, this.render.bind(this));
    }
    return this.render(ctrl);
  },

  render: function(ctrl) {
    if (ctrl.criticalState) return;
    var generic = require('../components/public/generic/generic.controller');

    var peek = ctrl.vm && ctrl.vm.messagePeek && ctrl.vm.messagePeek() || null;

    try {
      var view = this._view(ctrl);
      if (peek && ctrl.vm && ctrl.vm.message && ctrl.vm.messagePeek() === peek && peek.error) {
        return generic('error_small').view(peek.error);
      }
      return view;
    }
    catch (error) {
      if (peek && peek.error) {
        ctrl.vm.message(peek);
        return generic('error_small').view(peek.error);
      }
      if (ctrl.vm && this.vm.addMessage) {
        return generic('error_small').view(error);
      } else {
        this.criticalState = true;
        m.render(document.body, m('#container.container', generic('error').view(error)));
      }
    }
  },
};

module.exports = Module;

layout = require('./layout')
