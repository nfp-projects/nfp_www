'use strict';

var _ = require('lodash');

function DragDrop(options) {
  this.options = _.defaults(options, {
    parent: 1,
    dropped: function() {},
    pos_x: 0,
    pos_y: 0
  });
}

DragDrop.prototype.config = function(element, isInitialized) {
  if (isInitialized) return;
  var that = this;
  var crt;

  element.addEventListener("dragstart", function(event) {
    event.dataTransfer.setData('text', this.dataset[that.options.data]);

    crt = this.cloneNode(true);
    crt.style['z-index'] = -999;
    crt.style.position = "absolute"; crt.style.top = "-100px"; crt.style.right = "0px";
    this.style.opacity = that.options.opacity;
    document.body.appendChild(crt);
    event.dataTransfer.setDragImage(crt, that.options.pos_x, that.options.pos_y);
  });
  element.addEventListener("dragover", function(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  });
  element.addEventListener("drop", function(event) {
    event.preventDefault();
    that.options.dropped(event.dataTransfer.getData('text'), this.dataset[that.options.data]);
  });
  element.addEventListener("dragend", function(event) {
    this.style.opacity = 1.0;
    if (crt) {
      document.body.removeChild(crt);
      crt = null;
    }
    event.preventDefault();
  });
};

DragDrop.prototype.allowDrag = function(element, isInitialized) {
  if (isInitialized) return;
  var that = this;

  element.addEventListener("mouseenter", function( event ) {
    var target = event.target;
    for (var i = 0; i < that.options.parent; i++) {
      target = target.parentElement;
    }
    target.setAttribute('draggable', true);
  });
  element.addEventListener("mouseleave", function( event ) {
    var target = event.target;
    for (var i = 0; i < that.options.parent; i++) {
      target = target.parentElement;
    }
    target.setAttribute('draggable', false);
  });
};

module.exports = DragDrop;
