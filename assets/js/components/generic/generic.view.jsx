'use strict';

var m = require('mithril');

exports.not_found = function() {
  return <div class="generic-not_found">
      <div class="row">
        <div class="large-12 columns columns-centered">
          <p class="generic-text">
            The page or file you requested could not be found.
          </p>
          <div class="generic-not_found-image"></div>
        </div>
      </div>
    </div>
}

exports.error = function(error) {
  console.error(error);
  var stack = '';
  if (error.stack) {
    stack = error.stack.replace(/>/g, '&gt;');
    stack = stack.replace(/</g, '&lt;');
    stack = stack.replace(/\n/g,'<br />');
  }
  return <main class="generic-error">
      <section class="generic-error-box">
        <div class="generic-error-box-img"></div>
        <h4 class="generic-error-box-title">Unhandled Error Occured: {error.message}</h4>
        <a class="generic-error-box-link" href="/">Click here to go back to Home</a>
        <p class="generic-error-box-stack">{m.trust(stack)}</p>
      </section>
    </main>
}
