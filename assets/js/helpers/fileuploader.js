'use strict';

function fileUploader(options, element, isInitialized) {
  if (isInitialized) return;
  options = options || {};

  element.addEventListener("dragover", activate);
  element.addEventListener("dragleave", deactivate);
  element.addEventListener("dragend", deactivate);
  element.addEventListener("drop", deactivate);
  element.addEventListener("drop", update);

  element.addEventListener("click", click);
  var input = null;

  if (element.childElementCount > 0 && element.children[0].tagName === 'INPUT') {
    input = element.children[0];
    input.addEventListener("change", inputChanged);
  }

  function activate(e) {
      e.preventDefault()
  }
  function deactivate() {}
  function update(e, files) {
      e.preventDefault()
      var files = files || (e.dataTransfer || e.target).files;
      if (options.upload) {
        options.upload(files);
      }
  }
  function click(e) {
    if (input) {
      input.click();
    }
    //e.preventDefault();
  }
  function inputChanged(e) {
    update(e, input.files);
  }
}
module.exports = fileUploader;
