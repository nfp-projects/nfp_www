'use strict';

var _ = require('lodash');
var m = require('mithril');
var helper = require('../helpers/view');

exports.message = function(ctrl, name) {
  var message = ctrl.vm.message();
  return <p key="message" class={name + '-message ' + name + '-message--' + (message && message.type || 'none')}>{message && message.message || ''}</p>;
}

exports.header_link = function(ctrl, item, classes) {
  var path = '/' + item.slug;
  classes += ctrl.vm.isRouteMatch(path) && ' navigation-item--selected' || '';
  item.children = item.children || [];
  return <div class={classes + ' navigation-item columns'}>
          <a href={path} config={_.partial(helper.smartLink, item)}>{item.title}</a>
          <ul class='navigation-item-submenu'>
            {item.children.map(function(sub) {
              var curr = path + '/' + sub.slug;
              return <li class={'navigation-item-submenu-item ' + ctrl.vm.isRouteMatch(curr) && 'navigation-item-submenu-item--selected' || ''}>
                      <a href={curr} config={_.partial(helper.smartLink, sub)}>{sub.title}</a>
                    </li>
            })}
          </ul>
        </div>
}
