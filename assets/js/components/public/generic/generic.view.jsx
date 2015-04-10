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
  return <main class="generic-critical_error">
      <section class="generic-critical_error-box">
        <div class="generic-critical_error-box-img"></div>
        <h4 class="generic-critical_error-box-title">Critical Error Occured: {error.message}</h4>
        <a class="generic-critical_error-box-link" href="/">Click here to go back to Home</a>
        <p class="generic-critical_error-box-stack">{m.trust(stack)}</p>
      </section>
    </main>
}

exports.error_small = function(error) {
  console.error(error);
  var stack = '';
  if (error.stack) {
    stack = error.stack.replace(/>/g, '&gt;');
    stack = stack.replace(/</g, '&lt;');
    stack = stack.replace(/\n/g,'<br />');
  }
  return <section class="generic-error_box">
      <div class="row">
        <div class="medium-6 columns columns-centered">
          <h3 class="generic-error_box-header">Unhandled Error Occured:<br />{error.message}</h3>
          <a class="generic-critical_error-box-link" href="/">Click here to go back to Home</a>
          <p class="generic-error_box-text">{m.trust(stack)}</p>
        </div>
        <div class="medium-6 columns columns-centered">
          <div class="generic-error_box-image"></div>
        </div>
      </div>
    </section>
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
  return <section class="generic-not_found">
      <div class="row">
        <div class="medium-6 columns columns-centered">
          <h3 class="generic-not_found-header">{m.trust(message)}</h3>
          <p class="generic-not_found-text">{m.trust(subtitle)}</p>
          <h5 class="generic-not_found-suggestion">Suggestions</h5>
          <ul class="generic-not_found-list">
          {items.map(function(item) {
            return <li class="generic-not_found-list-item">
                <a href={item.url} config={helper.link}>
                  {item.text}
                </a>
              </li>;
          })}
          </ul>
          {/*<h5 class="generic-not_found-suggestion">Search</h5>
          <p class="generic-not_found-text">
            Alternatively, try using the search engine.
          </p>*/}
        </div>
        <div class="medium-6 columns columns-centered">
          <div class="generic-not_found-image"></div>
        </div>
      </div>
    </section>
}
