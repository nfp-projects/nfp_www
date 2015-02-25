'use strict';

function Module() {
  var built = false;
  this.controller = function() {
    if (!built) {
      this.vmBuilder(this.vm);
    }
    built = true;
    
    this._controller.call(this);
  };

  this.controller.prototype = this;
}

Module.prototype = {
  vmBuilder: function(vm) {
    vm.working = false;

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

    ['info','error','success'].forEach(function(k) {
      vm[k] = function(message) {
        vm.message({type: k, message: message});
      };
    });

    vm._init = vm.init || function() { };
    vm.init = function(ctrl) {
      vm._init(ctrl);
      return vm;
    };
  },

  view: function(ctrl) {
    return this._view(ctrl);
  },
};

module.exports = Module;

