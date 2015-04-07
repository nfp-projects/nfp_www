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
  dragging: null,
  original: null,

  init: function(ctrl) {
    settings.vm.dragdrop = new DragDrop({
      parent: 3,
      dropped: settings.vm.categoryMoved,
      pos_x: 10,
      pos_y: 20,
      data: 'id'
    });
    if (ctrl.action === 'categories') {
      this.loadCategories();
    }
  },

  updateCategory: function(id, e) {
    settings.vm.working = true;
    settings.vm.getCategory(parseInt(id))[e.target.name] = e.target.value;
    var body = {}
    body[e.target.name] = e.target.value;
    api.put('/categories/' + id, body)
      .then(null, function(error) {
        settings.vm.error('Error while updating: ' + error.message);
      }).then(function() {
        settings.vm.working = false;
      });
  },

  getCategory: function(id) {
    for (var i = 0; i < this.categories.length; i++) {
      if (this.categories[i].id === id) {
        return this.categories[i];
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
    Promise.all([api.put('/categories/' + settings.vm.categories[s].id, { sort: settings.vm.categories[s].sort }),
                 api.put('/categories/' + settings.vm.categories[t].id, { sort: settings.vm.categories[t].sort })])
      .catch(function(error) {
        settings.vm.error('Error while updating: ' + error.message);
      }).then(function() {
        settings.vm.working = false;
        m.redraw();
      });

    m.redraw();
  },

  loadCategories: function() {
    this.working = true;
    api.get('/categories', {background: true}).then(function(data) {
      settings.vm.categories = data;
    }, function(error) {
      settings.vm.error('Error while retrieving categories: ' + error.message);
    }).then(function() {
      settings.vm.working = false;
      m.startComputation();
      m.endComputation();
    });
  }
}

module.exports = settings;
