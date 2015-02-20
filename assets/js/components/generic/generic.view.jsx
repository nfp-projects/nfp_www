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
