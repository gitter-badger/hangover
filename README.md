hangover
========

HapiJS + Mongoose + AngularJS template

##Installation

** From git **
```
git clone git@github.com:paulrad/hangover.git ./my-project
cd my-project && npm install`
node index.js
```

## Start

### Default index.js

This file is required to create your server and load differents controllers / models.

```
;(function  HangOver(root, undefined) {

    'use strict';

    var Ho;

    root.Ho = Ho = require('./sys/hangover.js');

    // Hello message
    Ho.out("Welcome to HangOver... burp :s");

    // Loading requireds components
    Ho.require(['mongoose', 'hapi', 'swig']);

    // Mongoose initialisation
    Ho.module('mongoose').connect(Ho.config('mongoose.uri'), Ho.config('mongoose.options'));

        Ho.module('mongoose').connection.on('open', function() {
            Ho.out("HangOver is connected on your Mongo Database over Mongoose.");
            Ho.models();
        });
        Ho.module('mongoose').connection.on('error', Ho.err.bind(console));

    // Hapi initialisation
    Ho.module('hapi.server', function(Hapi) {
        var server = new Hapi.Server(Ho.config('server.host'), Ho.config('server.port'), Ho.config('server.options'));

        server.start(function() {
            Ho.out("Server started at: " + server.info.uri);
        });

        // Set routes
        server.route(Ho.routes());

        // Set views engine system
        Ho.module('swig').setDefaults(Ho.config('swig.options'));
        server.views({
            engines: {
                html: Ho.module('swig')
            },
            path: Ho.path('views')
        })

        return server;
    });
 
})(global);
```

### Default configuration file

You must create a configuration file in `api/configuration/config.js`

```
module.exports = {

    // Hangover
    hangover: {

    },

    // Mongoose
    mongoose: {
        /**
         * MongoDB standard connection uri
         * @see for references
         * http://docs.mongodb.org/manual/reference/connection-string/
         */
        uri: 'mongodb://localhost:27017/hangover'
    },


    // Server
    server: {

        host: 'localhost',

        port: 3012,

        /**
         * HapiJS server options
         * @see for references
         * http://hapijs.com/api#server-options
         */
        options: {

            cors: true,

            validation: {

                abortEarly: false,

            },

            router: {

                isCaseSensitive: false,

                stripTrailingSlash: true

            }

        }

    },

    // Swig
    swig: {
        
        options: {

            cache: false,

            varControls: ['<?', '?>']

        }
    }
};
```

## How it works ?

### Routes

Routes must be located in the `api/routes/` directory.
Hangover will load every files presents in this directory (you can create a routing file in a child directory), and will load the directive.

See http://hapijs.com/tutorials/routing for more informations.

A route configuration looks like :

```
module.exports = [

    // Default
    {
        method: 'GET',
        path: '/',
        handler: Ho.controller('default')
    },

    // Assets (static files)
    {
        method: 'GET',
        path: '/assets/{param*}',
        handler: {
            directory: {
                path: require('path').join(__dirname, '../../assets/')
            }
        }
    }

];
```

In this example, when a client call the `/` uri, your `default.index` controller is called.
If you need to call another method (for example a method called `informations` in a controller called `general`) you need to replace the line `Ho.controller('default')` by `Ho.controller('general.informations')`.

### Controllers

Controllers must be located in the `api/controllers/` directory.

Hangover will load every files presents in this directory (you can could structure yours controllers in child directories if you want).

