nfp_www
=======
This is a mithril MVC frontend for nfp_api for a private website.

The objective of this was not to rewrite nfp.is site but mostly to test mithril and get a feel for it.

Installation & Run
------------------

```bash
npm install
npm run build
npm start
```

Run with Docker
---------------

```bash
./bin/dockerize
./bin/run-docker
```

You should be inside the docker container. Run the npm commands as described in the Install section.

Build options
-------------

`npm run build` Builds all resources and collects them into `/dist`.

`npm run build:watch` Runs continus build by watching any of the resources.

License
-------
NFP API code and all code within this project is licensed under the terms of the WTFPL, see the included LICENSE file.
