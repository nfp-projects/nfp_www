'use strict';

module.exports = function(builder) {
  var vm = {};

  var message = null;

  //Support for single-use message displayment
  vm.message = function(value) {
    if (value) {
      message = value;
      return;
    }
    var temp = message;
    message = null;
    return temp;
  };

  ['info','error','success'].forEach(function(k) {
    vm[k] = function(message) {
      vm.message({
        type: k,
        message: message
      });
    };
  });

  //Define whether we're working or not
  vm.working = false;

  //Run the builder
  builder(vm);

  //Wrap init so it always returns the vm
  vm._init = vm.init;
  vm.init = function() {
    message = null;
    vm._init();
    return vm;
  };

  return vm;
};
