'use strict';

var m = require('mithril');
var modules = require('../../../public/modules.view');
var fileUploader = require('../../../../helpers/fileuploader');

var types = ['video', 'image', 'pages'];

exports.category = function(ctrl) {
  return m("section", {class:"settings"}, [
          modules.message(ctrl, 'settings'), 
          m("h3", {class:"settings-header"}, [
            ctrl.vm.category.title && (ctrl.vm.category.title + ' - ') || 'New ', "Category", 
            m("a", {class:"settings-categories-delete", onclick:ctrl.vm.deleteCategory, href:"#", style:{display: ctrl.vm.category.id && 'inline-block' || 'none'}, config:m.route}, [
              m("i", {class:"fa fa-trash"})
            ])
          ]), 
          modules.loadingIcon(ctrl, 'settings'), 
          m("form", {onchange:ctrl.vm.updateCategory.bind(null, null)}, [
            m("div", {class:"row"}, [
              m("div", {class:"large-12 columns"}, [
                m("label", ["Title", 
                  m("input", {type:"text", name:"title", placeholder:"Title", value:ctrl.vm.category.title || ''})
                ])
              ])
            ]), 
            m("div", {class:"row"}, [
              m("div", {class:"large-12 columns"}, [
                m("label", ["Slug", 
                  m("input", {type:"text", name:"slug", placeholder:"Slug", value:ctrl.vm.category.slug || ''})
                ])
              ])
            ]), 
            m("div", {class:"row"}, [
              m("div", {class:"large-4 columns"}, [
                m("label", ["Sort (optional)", 
                  m("input", {type:"text", name:"sort", placeholder:"Sort", value:ctrl.vm.category.sort || ''})
                ])
              ]), 
              m("div", {class:"large-6 columns"}, [
                m("label", ["Type", 
                  m("select", {name:"type"}, [
                    types.map(function(item) {
                      return m("option", {value:item, selected:ctrl.vm.category.type === item && 'true' || 'false'}, [
                        item
                      ])
                    })
                  ])
                ])
              ]), 
              m("div", {class:"large-12 columns"}, [
                m("label", ["Image"]), 
                m("a", {class:"th settings-categories-upload", config:fileUploader.bind(null, {upload: ctrl.vm.uploadImage.bind(null, 'category')}), href:(ctrl.vm.category.media && ctrl.vm.category.media.cover) && ctrl.vm.category.media.cover || '#'}, [
                  m("input", {type:"file", multiple:true,style:{display: 'none'}}), 
                  m("img", {src:"data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACwAAAAAAQABAAACAkQBADs=", width:"120", heigh:"120"}), 
                  m("i", {class:"fa fa-lg fa-upload settings-categories-upload-icon"})
                ])
              ])
            ]), 
            m("div", {class:"row settings-categories-buttonrow"}, [
              m("div", {class:"small-12 columns"}, [
                m("a", {href:"/admin/settings/categories", config:m.route, class:"settings-category-back button small info"}, ["Back"]), 
                m("a", {href:"#", onclick:ctrl.vm.saveCategory, class:"settings-category-save button small success"}, ["Save"])
              ])
            ])
          ])
        ]);
};

exports.categories = function(ctrl) {
  return m("section", {class:"settings"}, [
          modules.message(ctrl, 'settings'), 
          m("h3", {class:"settings-header"}, [
            "Categories", 
            m("a", {class:"settings-categories-add", href:"/admin/settings/categories/new", config:m.route}, [
              m("i", {class:"fa fa-plus-square"})
            ])
          ]), 
          modules.loadingIcon(ctrl, 'settings'), 
          m("div", {class:"row settings-categories-item"}, [
            m("div", {class:"small-1 columns columns--small columns--nopadding"}, [
              " "
            ]), 
            m("div", {class:"small-5 columns"}, [
              m("label", ["Name"])
            ]), 
            m("div", {class:"small-5 columns end"}, [
              m("label", ["Slug"])
            ])
          ]), 
          ctrl.vm.categories.map(function(item) {
            return m("div", {class:"row settings-categories-item", key:item.id, "data-id":item.id, config:ctrl.vm.dragdrop.config.bind(ctrl.vm.dragdrop)}, [
                    m("form", {onchange:ctrl.vm.updateCategory.bind(null, item.id)}, [
                      m("div", {class:"small-1 columns columns--small columns--nopadding"}, [
                        m("div", [
                          m("i", {class:"fa fa-lg fa-bars settings-categories-item-move", config:ctrl.vm.dragdrop.allowDrag.bind(ctrl.vm.dragdrop)})
                        ])
                      ]), 
                      m("div", {class:"small-5 columns"}, [
                        m("input", {type:"text", name:"title", value:item.title})
                      ]), 
                      m("div", {class:"small-5 columns"}, [
                        m("input", {type:"text", name:"slug", value:item.slug})
                      ]), 
                      m("div", {class:"small-1 columns columns--nopadding end"}, [
                        m("a", {class:"settings-categories-item-edit", config:m.route, href:'/admin/settings/categories/' + item.id}, [
                          m("i", {class:"fa  fa-edit"})
                        ])
                      ])
                    ])
                  ])
          })
        ]);
};
