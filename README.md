nfp_www
=======
This is a mithril MVVM frontend for nfp_api for a private website.

The objective of this was not to rewrite nfp.is site but mostly to test mithril and get a feel for it.

Installation & Run
------------------

```bash
npm install
npm run build
nodemon --harmony index.js

### Alts for running in production mode
# node --harmoney index.js --production
# NODE_ENV=production node --harmony index.js
```

Config
------

Every time nfp_www is run, it will generate a copy of the whole current runtime configuration into `config/config.json.current`. Any of these values can be overridden by creating a `config/config.json` and adding values you want to override.

Build options
-------------

`npm run build` Builds all resources and collects them into `/dist`.

`npm run build:watch` Runs continus build by watching any of the resources.

Runtime Arguments
-----------------

NFP api supports number of handy command arguments:

`--production` Runs nfp_api in production mode. This disables database integrity scan as well as enables other optimisations.

`--config` Generates current runtime config. Displays it and saves it into `config/config.json.current` before exiting.

License
-------
NFP API code and all code within this project is licensed under the terms of the WTFPL, see the included LICENSE file.
