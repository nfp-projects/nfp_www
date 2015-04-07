'use strict';

var m = require('mithril');
var Module = require('../../../helpers/module');

var footer = new Module();

footer.controller = function() {
  //Intentionally empty
};

footer._view = function() {
  return <div class="footer">
            <div class="row footer-list">
              <div class="small-offset-3 small-3 columns">
                <a href="/rss" target="_blank">RSS</a>
              </div>
              <div class="small-3 columns end">
                <a href="https://github.com/nfp-projects/nfp_www" target="_blank">Source Code</a>
              </div>
            </div>
            <div class="footer-copyright">
              <p class="footer-copyright-text">
                Copyright © 2011 - {new Date().getUTCFullYear()} NFP Encodes - All Rights Reserved <br />
                Design blatantly stolen from&nbsp;
                  <a href="https://www.blackmagicdesign.com/">Blackmagic Design</a> - Powered by&nbsp;
                  <a href="http://lhorie.github.io/mithril/" target="_blank">Mithril</a> &amp;&nbsp;
                  <a href="http://koajs.com/" target="_blank">koa</a>
              </p>
            </div>
          </div>;
};

module.exports = footer;
