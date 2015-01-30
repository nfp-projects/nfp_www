'use strict';

var fs = require('fs');

var config = require('./lib/config');


//Save the current configuration into config folder for debug purposes.
fs.writeFileAsync('./config/config.json.current', JSON.stringify(config.get(), null, '  '))
.catch(function(e) {
  require('./log').warn(e, 'Unable to save current configuration');
});


//Added ability to get/generate current config and both save and print it.
if (config.get('config')) {
  console.log('Current configuration settings (also stored in config/config.json.current)\n');
  console.log(JSON.stringify(config.get(), null, '  '));
  return;
}

require('./app');
