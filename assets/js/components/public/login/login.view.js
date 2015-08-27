'use strict';

var _ = require('lodash');
var m = require('mithril');
var modules = require('../modules.view');
var login = require('./login.model');
var views = require('../generic/generic.view');
var helper = require('../../../helpers/view');

login._view = function(ctrl) {
  return (login.view[ctrl.action] || views.not_found)(ctrl);
};

login.view.oauth2 = function(ctrl) {
  return m("section", [
          m("p", ["Redirecting back to login"])
        ]);
};

login.view.error = function(ctrl) {
  return m("section");
}

login.view.login = function(ctrl) {
  return m("section", {class:"login"}, [
          m("header", {class:"login-header"}, [
            m("div", {class:"login-header-inside"}, [
              m("h3", {class:"login-header-inside--login"}, ["Login"]), 
              m("div", {class:"login-header-inside-image login-header-inside-image--login"})
            ])
          ]), 
          m("form", {class:"login-form", type:"post"}, [
            modules.message(ctrl, 'login'), 
            m("div", {class:"row"}, [
              m("div", {class:"large-12 columns"}, [
                m("label", ["Username", 
                  m("input", {type:"text", name:"username", onchange:m.withAttr('value', ctrl.vm.username), value:ctrl.vm.username()})
                ])
              ])
            ]), 
            m("div", {class:"row"}, [
              m("div", {class:"large-12 columns"}, [
                m("label", ["Password", 
                  m("input", {type:"password", name:"password", onchange:m.withAttr('value', ctrl.vm.password), value:ctrl.vm.password()})
                ])
              ])
            ]), 
            m("div", {class:"row", style:{display: ctrl.vm.working ? 'block' : 'none'}}, [
              m("div", {class:"large-12 columns"}, [
                m("div", {class:"spinner spinner--large"}, [
                  m("div", {class:"bounce1"}), 
                  m("div", {class:"bounce2"}), 
                  m("div", {class:"bounce3"})
                ])
              ])
            ]), 
            m("div", {class:"row", style:{display: ctrl.vm.working ? 'none' : 'block'}}, [
              m("div", {class:"small-4 columns"}, [
                m("button", {class:"login-button button secondary small", onclick:_.partial(ctrl.vm.login,'local')}, ["Login"])
              ]), 
              m("div", {class:"small-8 columns login-alt"}, [
                  "Or login with ", m("a", {
                    onclick:_.partial(ctrl.vm.login,'google')}, ["Google"
                  ])
              ])
            ]), 
            m("div", {class:"login-meta"}, [
              m("a", {href:"/login/signup", config:helper.link}, ["Don't have an account? Signup now!"]), 
              m("a", {href:"/login/forgot", config:helper.link}, ["Forgot your password?"])
            ])
          ])
        ]);
};

login.view.forgot = function(ctrl) {
  return m("section", {class:"login"}, [
      m("header", {class:"login-header"}, [
        m("div", {class:"login-header-inside"}, [
          m("h3", {class:"login-header-inside--forgot"}, ["Forgot Password"]), 
          m("div", {class:"login-header-inside-image login-header-inside-image--forgot"})
        ])
      ]), 
      m("form", {class:"forgot-form", type:"post"}, [
        modules.message(ctrl, 'login'), 
        m("div", {class:"row"}, [
          m("div", {class:"large-12 columns columns-centered"}, [
            m("p", {class:"login-disclaimer"}, [
              "If you forgot your password, or your account doesn't" + ' ' +
              "have password, you can reset it by typing in your email in" + ' ' +
              "the field below."
            ])
          ]), 
          m("div", {class:"large-12 columns"}, [
            m("label", ["Email", 
              m("input", {type:"text", name:"email", onchange:m.withAttr('value', ctrl.vm.email), value:ctrl.vm.email()})
            ])
          ]), 
          m("div", {class:"small-12 columns columns-centered", 
              style:{display: ctrl.vm.working ? 'none' : 'block'}}, [
            m("button", {class:"login-button button secondary small", 
                    onclick:ctrl.vm.forgot}, [
              "Reset My Password"
            ])
          ]), 
          m("div", {class:"large-12 columns", 
              style:{display: ctrl.vm.working ? 'block' : 'none'}}, [
            m("div", {class:"spinner spinner--large"}, [
              m("div", {class:"bounce1"}), 
              m("div", {class:"bounce2"}), 
              m("div", {class:"bounce3"})
            ])
          ])
        ])
      ])
    ])
};

login.view.finish = function(ctrl) {
  var title = 'Reset Password';
  if (ctrl.vm.token_data && ctrl.vm.token_data.signup) {
    title = 'Finish Signup';
  }
  return m("section", {class:"login"}, [
          m("header", {class:"login-header"}, [
            m("div", {class:"login-header-inside"}, [
              m("h3", {class:"login-header-inside--reset"}, [title]), 
              m("div", {class:"login-header-inside-image login-header-inside-image--reset"})
            ])
          ]), 
          m("form", {class:"login-form", type:"post"}, [
            modules.message(ctrl, 'login'), 
            m("div", {class:"large-12 columns columns-centered"}, [
              m("p", {class:"login-disclaimer"}, [
                "You're almost finished. Just type in a new password below" + ' ' +
                "and you'll be done."
              ])
            ]), 
            m("div", {class:"row"}, [
              m("div", {class:"large-12 columns"}, [
                m("label", ["Password", 
                  m("input", {type:"password", 
                         name:"password", 
                         onchange:m.withAttr('value', ctrl.vm.password), 
                         value:ctrl.vm.password()})
                ])
              ])
            ]), 
            m("div", {class:"row", style:{display: ctrl.vm.working ? 'block' : 'none'}}, [
              m("div", {class:"large-12 columns"}, [
                m("div", {class:"spinner spinner--large"}, [
                  m("div", {class:"bounce1"}), 
                  m("div", {class:"bounce2"}), 
                  m("div", {class:"bounce3"})
                ])
              ])
            ]), 
            m("div", {class:"row", style:{display: ctrl.vm.working ? 'none' : 'block'}}, [
              m("div", {class:"small-4 columns"}, [
                m("button", {class:"login-button button secondary small", 
                        onclick:ctrl.vm.finish}, [
                  title
                ])
              ])
            ])
          ])
        ]);
};

login.view.signup = function(ctrl) {
  return m("section", {class:"signup"}, [
          m("header", {class:"signup-header"}, [
            m("h3", ["Signup"])
          ]), 
          m("form", {class:"signup-form", type:"post"}, [
            modules.message(ctrl, 'login'), 
            m("div", {class:"row"}, [
              m("div", {class:"large-12 columns"}, [
                m("label", ["Username", m("span", {class:"signup-span"}, ["(login name)"]), 
                  m("input", {type:"text", 
                         name:"username", 
                         onchange:m.withAttr('value', ctrl.vm.username), 
                         value:ctrl.vm.username()})
                ])
              ])
            ]), 
            m("div", {class:"row"}, [
              m("div", {class:"large-12 columns"}, [
                m("label", ["Email", m("span", {class:"signup-span"}, ["(requires confirmation)"]), 
                  m("input", {type:"email", 
                         name:"email", 
                         onchange:m.withAttr('value', ctrl.vm.email), 
                         value:ctrl.vm.email()})
                ])
              ])
            ]), 
            m("div", {class:"row"}, [
              m("div", {class:"large-12 columns"}, [
                m("label", ["Name", m("span", {class:"signup-span"}, ["(display name)"]), 
                  m("input", {type:"text", 
                         name:"name", 
                         onchange:m.withAttr('value', ctrl.vm.name), 
                         value:ctrl.vm.name()})
                ])
              ])
            ]), 
            m("div", {class:"row", style:{display: ctrl.vm.working ? 'block' : 'none'}}, [
              m("div", {class:"large-12 columns"}, [
                m("div", {class:"spinner spinner--large"}, [
                  m("div", {class:"bounce1"}), 
                  m("div", {class:"bounce2"}), 
                  m("div", {class:"bounce3"})
                ])
              ])
            ]), 
            m("div", {class:"row", style:{display: ctrl.vm.working ? 'none' : 'block'}}, [
              m("div", {class:"small-4 columns"}, [
                m("button", {class:"signup-button button secondary small", 
                        onclick:ctrl.vm.signup}, [
                  "Signup"
                ])
              ]), 
              m("div", {class:"small-8 columns signup-alt"}, [
                m("button", {class:"signup-button button success small", 
                        onclick:_.partial(ctrl.vm.login,'google')}, [
                  "Signup with Google"
                ])
              ])
            ]), 
            m("div", {class:"signup-meta"}, [
              m("a", {href:"/login/signup", config:helper.link}, ["Already have an account? Login now!"]), 
              m("a", {href:"/login/forgot", config:helper.link}, ["Forgot your password?"])
            ])
          ])
        ]);
};
