'use strict';

var fs = require('fs');
var _ = require('lodash');
var appRoot = require('app-root-path');

var log = require('../log');
var config = require('../config');


//
// Following part will generate a full list of all javacsript resources
// in our current application. This will be used so we can dynamically
// add more modules or code without having to modify the template.
//
var js = [];

//Get all files in the javascript folder. This will give us all
//application code files.
fs.readdirAsync(appRoot.resolve('/dist/js')).then(function(files) {
  //Get all libraries in the javascript lib folder.
  return fs.readdirAsync(appRoot.resolve('/dist/js/lib')).then(function(libs) {
    //Prepend the 'lib/' to each file found in libs folder for
    //relative pathing
    libs = _.map(libs, function(item) { return 'lib/' + item; });

    //Filter out all the files and only grab those that end with .js
    //Very neat and brutal way of abusing lodash though I gotta say.
    return _.filter(
      //Merge together lib files and application files.
      _.flatten([libs, files]),
      //Create a function that only returns true if files
      //end with '.js'.
      _.ary(_.partial(_.endsWith, _, '.js'), 1));
  });
}).then(function(files) {
  //Check our enviroment. If we're running in production mode, we only 
  //want to use the minified files. If we're running in dev mode, we
  //want to use the whole files.
  if (config.get('NODE_ENV') === 'production') {
    //Only use files that end with '.min.js'.
    js = _.filter(files, _.ary(_.partial(_.endsWith, _, '.min.js'), 1));
  } else {
    //Only use files that do NOT end with '.min.js'.
    js = _.reject(files, _.ary(_.partial(_.endsWith, _, '.min.js'), 1));
  }
  log.info(js, 'javascript files in', config.get('NODE_ENV'), 'mode');
});


//
// This is our main application that will resolve for all paths
//
exports.index = function *() {
  //We expose a variable called routes that each module can add
  //their routes into pragmatically.
  var output  = '<!doctype html>\n';
  output     += '<title>' + config.get('name') + '</title>\n';
  output     += '<body>\n';
  for (var i = 0; i < js.length; i++) {
    output   += '  <script src="/js/' + js[i] + '"></script>\n';
  }
  output     += '</body>';
  this.body = output;
};