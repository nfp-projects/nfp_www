'use strict';

var m = require('mithril');

exports.link = function(element) {
  element.href = this.attrs.href;
  element.removeEventListener("click", routeUnobtrusive);
  element.addEventListener("click", routeUnobtrusive);
};

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
    console.error(error);
    var message = 'Error: ' + error.message;
    if (currentTarget.parentElement &&
        currentTarget.parentElement.className &&
        currentTarget.parentElement.className.indexOf('navigation-item') > 0) {
      message = 'Error';
    }
    m.render(currentTarget, m('span', {class: 'link-error'}, message));
  }
}
