'use strict';

var m = require('mithril');
var modules = require('../modules.view');
var profile = require('./profile.model');
var helper = require('../../../helpers/view');

profile._view = function(ctrl) {
  
  return m("section", {class:"profile"}, [
          m("header", {class:"profile-header"}, [
            m("div", {class:"profile-header-inside"}, [
              m("h3", {class:"profile-header-inside--profile"}, ["Profile"]), 
              m("div", {class:"profile-header-inside-image profile-header-inside-image--profile"})
            ])
          ]), 
          m("form", {class:"profile-form", type:"post", onchange:ctrl.vm.formUpdate}, [
            modules.message(ctrl, 'profile'), 
            m("div", {class:"row"}, [
              m("div", {class:"large-12 columns"}, [
                m("label", ["Username", 
                  m("input", {type:"text", name:"username", value:ctrl.vm.user.username || '...'})
                ])
              ]), 
              m("div", {class:"large-12 columns"}, [
                m("label", ["Email", m("span", {class:"profile-meta"}, ["(requires confirmation)"]), 
                  m("input", {type:"text", name:"email", value:ctrl.vm.user.email || '...'})
                ])
              ]), 
              m("div", {class:"large-12 columns"}, [
                m("label", ["Name", m("span", {class:"profile-meta"}, ["(display name)"]), 
                  m("input", {type:"text", name:"name", value:ctrl.vm.user.name || ''})
                ])
              ]), 
              m("div", {class:"large-12 columns", style:{display: ctrl.vm.user.change_password ? 'block' : 'none'}}, [
                m("label", ["Current Password", m("span", {class:"profile-meta"}, ["(to change password)"]), 
                  m("input", {type:"password", name:"current_password", value:""})
                ])
              ]), 
              m("div", {class:"large-12 columns", style:{display: ctrl.vm.user.change_password ? 'block' : 'none'}}, [
                m("label", ["Password", 
                  m("input", {type:"password", name:"password", value:""})
                ])
              ]), 
              m("div", {class:"large-12 columns", style:{display: ctrl.vm.user.change_password ? 'block' : 'none'}}, [
                m("label", ["Confirm Password", 
                  m("input", {type:"password", name:"confirm_password", value:""})
                ])
              ]), 
              m("div", {class:"small-4 columns", style:{display: ctrl.vm.working ? 'none' : 'block'}}, [
                m("button", {class:"login-button button secondary small", onclick:ctrl.vm.submit}, ["Save"])
              ]), 
              m("div", {class:"large-12 columns", style:{display: ctrl.vm.working ? 'block' : 'none'}}, [
                m("div", {class:"spinner spinner--large"}, [
                  m("div", {class:"bounce1"}), 
                  m("div", {class:"bounce2"}), 
                  m("div", {class:"bounce3"})
                ])
              ]), 
              m("div", {class:"large-12 columns", style:{display: ctrl.vm.user.change_password ? 'none' : 'block'}}, [
                m("p", {class:"profile-disclaimer"}, ["This account was created through google and has no password." + ' ' +
                  "To configure a password, use ", m("a", {href:"/login/forgot", config:helper.link}, ["password reset"]), "."
                ])
              ])
            ])
          ])
        ]);
};
