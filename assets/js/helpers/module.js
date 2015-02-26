'use strict';

var m = require('mithril');

function Module() {
  var built = false;

  this.controller = function() {
    try {
      if (!built) {
        this.vmBuilder(this.vm);
      }
      built = true;
      
      this._controller.call(this);
    }
    catch (error) {
      console.error(error);
      if (this.vm.addMessage) {
        this.vm.message({
          type: 'error',
          message: 'Unhandled error: ' + error.message,
          error: error
        });
      } else {
        this.criticalState = true;
        var generic = require('../components/generic/generic.controller');
        m.render(document.getElementById('container'), generic('error').view(error));
      }
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
    if (ctrl.criticalState) return;
    var generic = require('../components/generic/generic.controller');

    var peek = ctrl.vm.messagePeek && ctrl.vm.messagePeek() || null;

    try {
      var view = this._view(ctrl);
      if (peek && ctrl.vm && ctrl.vm.message && ctrl.vm.messagePeek() === peek) {
        return generic('error_small').view(peek.error);
      }
      return view;
    }
    catch (error) {
      if (peek && peek.error) {
        ctrl.vm.message(peek);
        return generic('error_small').view(peek.error);
      }
      return generic('error_small').view(error);
    }
  },
};

module.exports = Module;
