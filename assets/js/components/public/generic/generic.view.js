'use strict';

var m = require('mithril');
var helper = require('../../../helpers/view');

exports.throw_error = function(ctrl) {
  ctrl.something(); //this will crash
}

exports.error = function(error) {
  console.error(error);
  var stack = '';
  if (error.stack) {
    stack = error.stack.replace(/>/g, '&gt;');
    stack = stack.replace(/</g, '&lt;');
    stack = stack.replace(/\n/g,'<br />');
  }
  return m("main", {class:"generic-critical_error"}, [
      m("section", {class:"generic-critical_error-box"}, [
        m("div", {class:"generic-critical_error-box-img"}), 
        m("h4", {class:"generic-critical_error-box-title"}, ["Critical Error Occured: ", error.message]), 
        m("a", {class:"generic-critical_error-box-link", href:"/"}, ["Click here to go back to Home"]), 
        m("p", {class:"generic-critical_error-box-stack"}, [m.trust(stack)])
      ])
    ])
}

exports.error_small = function(error) {
  console.error(error);
  var stack = '';
  if (error.stack) {
    stack = error.stack.replace(/>/g, '&gt;');
    stack = stack.replace(/</g, '&lt;');
    stack = stack.replace(/\n/g,'<br />');
  }
  return m("section", {class:"generic-error_box"}, [
      m("div", {class:"row"}, [
        m("div", {class:"medium-6 columns columns-centered"}, [
          m("h3", {class:"generic-error_box-header"}, ["Unhandled Error Occured:", m("br"), error.message]), 
          m("a", {class:"generic-critical_error-box-link", href:"/"}, ["Click here to go back to Home"]), 
          m("p", {class:"generic-error_box-text"}, [m.trust(stack)])
        ]), 
        m("div", {class:"medium-6 columns columns-centered"}, [
          m("div", {class:"generic-error_box-image"})
        ])
      ])
    ])
}

exports.not_found = function(ctrl) {
  var message = 'Page not found.';
  var subtitle = 'Unfortunately the page you were trying to '+
                 'retrieve is missing, does not exist or you '+
                 'don\'t have permission to view it.';
  var items = [
    {url: '/', text: 'Go to the frontpage'},
    {url: '/releases', text: 'Latest releases on NFP'},
    {url: '/profile', text: 'Your personal profile'}
  ];
  if (ctrl && ctrl.vm && ctrl.vm.messagePeek && ctrl.vm.messagePeek()) {
    var temp = ctrl.vm.message();
    if (temp && temp.message) {
      message = temp.message;
    }
    if (temp && temp.subtitle) {
      subtitle = temp.subtitle;
    }
    if (temp && temp.items) {
      items = temp.items;
    }
  }
  return m("section", {class:"generic-not_found"}, [
      m("div", {class:"row"}, [
        m("div", {class:"medium-6 columns columns-centered"}, [
          m("h3", {class:"generic-not_found-header"}, [m.trust(message)]), 
          m("p", {class:"generic-not_found-text"}, [m.trust(subtitle)]), 
          m("h5", {class:"generic-not_found-suggestion"}, ["Suggestions"]), 
          m("ul", {class:"generic-not_found-list"}, [
          items.map(function(item) {
            return m("li", {class:"generic-not_found-list-item"}, [
                m("a", {href:item.url, config:helper.link}, [
                  item.text
                ])
              ]);
          })
          ])
          /*<h5 class="generic-not_found-suggestion">Search</h5>
          <p class="generic-not_found-text">
            Alternatively, try using the search engine.
          </p>*/
        ]), 
        m("div", {class:"medium-6 columns columns-centered"}, [
          m("div", {class:"generic-not_found-image"})
        ])
      ])
    ])
}
