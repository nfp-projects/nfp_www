'use strict';

var m = require('mithril');

var currentActive = '';
var isTouch = false;
var isDragging = false;

function link(element) {
  element.href = this.attrs.href;
  element.removeEventListener("click", routeUnobtrusive);
  element.addEventListener("click", routeUnobtrusive);
};
exports.link = link;

function smartLink(item, element) {
  element.href = this.attrs.href;
  element._item = item;
  element.removeEventListener('touchmove', checkTouchMove);
  element.addEventListener('touchmove', checkTouchMove);
  element.removeEventListener('touchend', checkTouch);
  element.addEventListener('touchend', checkTouch);
  element.removeEventListener("click", routeSmart);
  element.addEventListener("click", routeSmart);
};
exports.smartLink = smartLink;

function prevent(e) {
  e = e || event;
  if (e.preventDefault) e.preventDefault();
  else e.returnValue = false;
}
exports.noop = prevent;

function routeUnobtrusive(e) {
  /*jshint validthis: true */
  e = e || event;
  if (e.ctrlKey || e.metaKey || e.which === 2) return;
  if (e.preventDefault) e.preventDefault();
  else e.returnValue = false;
  var currentTarget = e.currentTarget || this;

  try {
    m.route(currentTarget.pathname);
  }
  catch (error) {
    displayError(currentTarget, error);
  }
}

function checkTouch(e) {
  /*jshint validthis: true */
  isTouch = true;
  if (isDragging) {
    isDragging = false;
    return;
  }
  routeSmart(e, true);
}

function checkTouchMove() {
  /*jshint validthis: true */
  isDragging = true;
}

function routeSmart(e, b) {
  /*jshint validthis: true */
  e = e || event;
  if (e.ctrlKey || e.metaKey || e.which === 2) return;

  if (!b) {
    prevent(e);
    if (isTouch) {
      return;
    }
  }
  var currentTarget = e.currentTarget || this;

  if (!isTouch && document.body.clientWidth > 640) {
    prevent(e);
    return route(currentTarget);
  }

  var hasChildren = currentTarget._item.children && currentTarget._item.children.length;

  if (document.body.clientWidth > 640) {
    if (hasChildren && currentActive !== currentTarget.pathname) {
      currentActive = currentTarget.pathname;
      return;
    }
    currentActive = currentTarget.pathname;

    prevent(e);
    return route(currentTarget);
  }

  if (currentTarget._open || (!hasChildren && currentTarget.pathname !== '/')) {
    prevent(e);
    return route(currentTarget);
  }
  currentTarget._open = true;

  if (currentTarget.pathname === '/') {
    currentTarget.parentElement.parentElement.parentElement.className += ' navigation--expand';
  } else {
    currentTarget.parentElement.className += ' navigation-item--expand';
  }
}

function route(element) {
  try {
    m.route(element.pathname);
  }
  catch (error) {
    displayError(element, error);
  }
}

function displayError(element, error) {
  console.error(error);
  var message = '[Cannot open link: ' + error.message + ']';
  if (element.parentElement &&
      element.parentElement.className &&
      element.parentElement.className.indexOf('navigation-item') > 0) {
    message = '[Error]';
  }
  m.render(element, m('span', {class: 'link-error'}, message));
}
