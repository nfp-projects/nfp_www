'use strict';

var fs = require('fs');
var _ = require('lodash');
var nconf = require('nconf');
var bluebird = require('bluebird');

//Promisify fs
bluebird.promisifyAll(fs);


//Load arguments as highest priority
nconf.argv();


//Load package.json for name and such
var pckg = require('../package.json');
var pckg = _.pick(pckg, ['name','version','description','author','license','homepage']);

//Simple override to support --production in command line
if (nconf.get('production')) {
  pckg.NODE_ENV = 'production';
}

//Load overrides as second priority
nconf.overrides(pckg);


//Load enviroment variables as third priority
//nconf.env(); //2015-01-30: Remove for now - Jonatan


//Load any overrides from the config.json if it exists.
nconf.file('./config/config.json');


//Default variables for required database and other settings.
nconf.defaults({
  NODE_ENV: 'development',
  server: {
    port: 3001
  },
  bunyan: {
    name: pckg.name,
    streams: [{
        stream: 'process.stdout',
        level: 'debug'
      }
    ]
  },
  api: 'http://localhost:3000'
});

module.exports = nconf;
