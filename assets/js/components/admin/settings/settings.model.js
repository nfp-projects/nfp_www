'use strict';

var m = require('mithril');
var _ = require('lodash');
var api = require('../../../helpers/api');
var Module = require('../../../helpers/module');
var DragDrop = require('../../../helpers/dragdrop');

var settings = new Module();

settings.vm = {
  addMessage: true,
  categories: [],
  users: [],
  user: {},
  category: {media:{}},
  dragging: null,
  original: null,

  init: function(ctrl) {
    settings.vm.dragdrop = new DragDrop({
      parent: 4,
      dropped: settings.vm.categoryMoved,
      pos_x: 10,
      pos_y: 20,
      opacity: 0.5,
      data: 'id'
    });
    if (!ctrl.action || ctrl.action === 'categories') {
      this.loadCategories();
    }
    if (ctrl.action === 'users') {
      this.loadUsers();
    }
    if (ctrl.action === 'category') {
      settings.vm.category = {};
      if (ctrl.id !== 'new') {
        this.loadCategory(ctrl.id);
      }
    }
  },

  loadUsers: function() {
    this.working = true;
    settings.vm.defaultAction(api.get('/users', {background: true}).then(function(data) {
      settings.vm.users = data;
    }), 'Error while retrieving users: ');
  },

  updateUser: function(id, e) {
    if (!id) {
      e.preventDefault();
      settings.vm.user[e.target.name] = e.target.value;
      return m.redraw.strategy('none');
    }
    settings.vm.working = true;
    settings.vm.getById(settings.vm.users, parseInt(id))[e.target.name] = e.target.value;
    var body = {}
    body[e.target.name] = e.target.value;
    settings.vm.defaultAction(api.put('/users/' + id, body, {background: true}), 'Error while updating: ');
  },

  loadCategory: function(id) {
    this.working = true;
    settings.vm.defaultAction(api.get('/categories/' + id, {background: true}).then(function(data) {
      settings.vm.category = data;
    }, function(error) {
      if (error && error.status === 404) {
        return m.route('/admin/settings/categories');
      }
      settings.vm.error('Error while retrieving category: ' + error.message);
    }), 'Error while retrieving category: ');
  },

  uploadImage: function(item, files) {
    console.log(settings.vm[item]);
    console.log(files);

    settings.vm.defaultAction(settings.vm.uploadMedia(files).then(function(data) {
      console.log(data);
    }), 'Error while uploading image: ');
  },

  uploadMedia: function(files) {
    settings.vm.working = true;
    var formData = new FormData;
    for (var i = 0; i < files.length; i++) {
        formData.append("file" + i, files[i]);
    }

    return api.post('/media', formData, {
      background: true,
      serialize: function(value) {return value}
    });
  },

  deleteCategory: function(e) {
    e.preventDefault();
    settings.vm.working = true;
    settings.vm.defaultAction(api.del('/categories/' + settings.vm.category.id, {background: true}).then(function() {
      m.route('/admin/settings/categories');
    }), 'Error while deleting: ');
  },

  saveCategory: function(e) {
    e.preventDefault();
    settings.vm.working = true;
    var request;
    var body = settings.vm.category;
    if (body.id) {
      request = api.put('/categories/' + body.id, body, {background: true});
    } else {
      request = api.post('/categories', body, {background: true});
    }
    settings.vm.defaultAction(request.then(function() {
      m.route('/admin/settings/categories');
    }), 'Error while saving: ');
  },

  updateCategory: function(id, e) {
    if (!id) {
      e.preventDefault();
      settings.vm.category[e.target.name] = e.target.value;
      return m.redraw.strategy('none');
    }
    settings.vm.working = true;
    settings.vm.getById(settings.vm.categories, parseInt(id))[e.target.name] = e.target.value;
    var body = {}
    body[e.target.name] = e.target.value;
    settings.vm.defaultAction(api.put('/categories/' + id, body, {background: true}), 'Error while updating: ');
  },

  getById: function(collection, id) {
    for (var i = 0; i < collection.length; i++) {
      if (collection[i].id === id) {
        return collection[i];
      }
    }
  },

  categoryMoved: function(source, target) {
    if (source === target) return;

    source = parseInt(source);
    target = parseInt(target);

    var s = -1;
    var t = -1;

    for (var i = 0; i < settings.vm.categories.length && (s === -1 || t === -1); i++) {
      if (settings.vm.categories[i].id === source) {
        s = i;
      }
      if (settings.vm.categories[i].id === target) {
        t = i;
      }
    }

    //Swap sort value
    var old = settings.vm.categories[s].sort;
    settings.vm.categories[s].sort = settings.vm.categories[t].sort;
    settings.vm.categories[t].sort = old;

    //Swap actual elements
    var b = settings.vm.categories[s];
    settings.vm.categories[s] = settings.vm.categories[t];
    settings.vm.categories[t] = b;

    settings.vm.working = true;
    Promise.all([api.put('/categories/' + settings.vm.categories[s].id, { sort: settings.vm.categories[s].sort }, {background: true}),
                 api.put('/categories/' + settings.vm.categories[t].id, { sort: settings.vm.categories[t].sort }, {background: true})])
      .catch(function(error) {
        settings.vm.error('Error while updating: ' + error.message);
      }).then(function() {
        settings.vm.working = false;
        m.redraw();
      });
  },

  loadCategories: function() {
    this.working = true;
    settings.vm.defaultAction(api.get('/categories', {background: true}).then(function(data) {
      settings.vm.categories = data;
    }), 'Error while retrieving categories: ');
  },

  defaultAction: function(req, text) {
    req.then(null, function(error) {
      settings.vm.error(text + error.message);
    }).then(function() {
      settings.vm.working = false;
      m.startComputation();
      m.endComputation();
    });
  }
}

module.exports = settings;
