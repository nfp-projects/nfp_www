'use strict';

var m = require('mithril');
var Module = require('../../../helpers/module');

var footer = new Module();

footer.controller = function() {
  //Intentionally empty
};

footer._view = function() {
  return m("div", {class:"footer"}, [
            m("div", {class:"row footer-list"}, [
              m("div", {class:"small-offset-3 small-3 columns"}, [
                m("a", {href:"/rss", target:"_blank"}, ["RSS"])
              ]), 
              m("div", {class:"small-3 columns end"}, [
                m("a", {href:"https://github.com/nfp-projects/nfp_www", target:"_blank"}, ["Source Code"])
              ])
            ]), 
            m("div", {class:"footer-copyright"}, [
              m("p", {class:"footer-copyright-text"}, [
                "Copyright © 2011 - ", new Date().getUTCFullYear(), " NFP Encodes - All Rights Reserved ", m("br"), 
                "Design blatantly stolen from ", 
                  m("a", {href:"https://www.blackmagicdesign.com/"}, ["Blackmagic Design"]), " - Powered by ", 
                  m("a", {href:"http://lhorie.github.io/mithril/", target:"_blank"}, ["Mithril"]), " & ", 
                  m("a", {href:"http://koajs.com/", target:"_blank"}, ["koa"])
              ])
            ])
          ]);
};

module.exports = footer;
