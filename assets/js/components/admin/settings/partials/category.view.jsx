'use strict';

var m = require('mithril');
var modules = require('../../../public/modules.view');
var fileUploader = require('../../../../helpers/fileuploader');

var types = ['video', 'image', 'pages'];

exports.category = function(ctrl) {
  return <section class="settings">
          {modules.message(ctrl, 'settings')}
          <h3 class="settings-header">
            {ctrl.vm.category.title && (ctrl.vm.category.title + ' - ') || 'New '}Category
            <a class="settings-categories-delete" onclick={ctrl.vm.deleteCategory} href="#" style={{display: ctrl.vm.category.id && 'inline-block' || 'none'}} config={m.route}>
              <i class="fa fa-trash"></i>
            </a>
          </h3>
          {modules.loadingIcon(ctrl, 'settings')}
          <form onchange={ctrl.vm.updateCategory.bind(null, null)}>
            <div class="row">
              <div class="large-12 columns">
                <label>Title
                  <input type="text" name="title" placeholder="Title" value={ctrl.vm.category.title || ''} />
                </label>
              </div>
            </div>
            <div class="row">
              <div class="large-12 columns">
                <label>Slug
                  <input type="text" name="slug" placeholder="Slug" value={ctrl.vm.category.slug || ''} />
                </label>
              </div>
            </div>
            <div class="row">
              <div class="large-4 columns">
                <label>Sort (optional)
                  <input type="text" name="sort" placeholder="Sort" value={ctrl.vm.category.sort || ''} />
                </label>
              </div>
              <div class="large-6 columns">
                <label>Type
                  <select name="type">
                    {types.map(function(item) {
                      return <option value={item} selected={ctrl.vm.category.type === item && 'true' || 'false'}>
                        {item}
                      </option>
                    })}
                  </select>
                </label>
              </div>
              <div class="large-12 columns">
                <label>Image</label>
                <a class="th settings-categories-upload" config={fileUploader.bind(null, {upload: ctrl.vm.uploadImage.bind(null, 'category')})} href={(ctrl.vm.category.media && ctrl.vm.category.media.cover) && ctrl.vm.category.media.cover || '#'}>
                  <input type="file" multiple style={{display: 'none'}} />
                  <img src="data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACwAAAAAAQABAAACAkQBADs=" width="120" heigh="120" />
                  <i class="fa fa-lg fa-upload settings-categories-upload-icon"></i>
                </a>
              </div>
            </div>
            <div class="row settings-categories-buttonrow">
              <div class="small-12 columns">
                <a href="/admin/settings/categories" config={m.route} class="settings-category-back button small info">Back</a>
                <a href="#" onclick={ctrl.vm.saveCategory} class="settings-category-save button small success">Save</a>
              </div>
            </div>
          </form>
        </section>;
};

exports.categories = function(ctrl) {
  return <section class="settings">
          {modules.message(ctrl, 'settings')}
          <h3 class="settings-header">
            Categories
            <a class="settings-categories-add" href="/admin/settings/categories/new" config={m.route}>
              <i class="fa fa-plus-square"></i>
            </a>
          </h3>
          {modules.loadingIcon(ctrl, 'settings')}
          <div class="row settings-categories-item">
            <div class="small-1 columns columns--small columns--nopadding">
              &nbsp;
            </div>
            <div class="small-5 columns">
              <label>Name</label>
            </div>
            <div class="small-5 columns end">
              <label>Slug</label>
            </div>
          </div>
          {ctrl.vm.categories.map(function(item) {
            return <div class="row settings-categories-item" key={item.id} data-id={item.id} config={ctrl.vm.dragdrop.config.bind(ctrl.vm.dragdrop)}>
                    <form onchange={ctrl.vm.updateCategory.bind(null, item.id)}>
                      <div class="small-1 columns columns--small columns--nopadding">
                        <div>
                          <i class="fa fa-lg fa-bars settings-categories-item-move" config={ctrl.vm.dragdrop.allowDrag.bind(ctrl.vm.dragdrop)}></i>
                        </div>
                      </div>
                      <div class="small-5 columns">
                        <input type="text" name="title" value={item.title} />
                      </div>
                      <div class="small-5 columns">
                        <input type="text" name="slug" value={item.slug} />
                      </div>
                      <div class="small-1 columns columns--nopadding end">
                        <a class="settings-categories-item-edit" config={m.route} href={'/admin/settings/categories/' + item.id}>
                          <i class="fa  fa-edit"></i>
                        </a>
                      </div>
                    </form>
                  </div>
          })}
        </section>;
};
