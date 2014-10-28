hangover
========

HapiJS + Mongoose + AngularJS template

##Installation

** From NPM **
```
npm install hangover -g
```

** From git **
```
git clone git@github.com:paulrad/hangover.git ./hangover
./hangover/bin/hangover example-project
cd ./example-project
npm install
node server.js
```

## Start


### Binary client

#### Create a new project

At this moment, hangover supports only one command (with --version and usages), the basic project creation command:
```
hangover [projectpath]
```
Where [projectpath] must be an unexisting directory or an empty directory.

Hangover will copy all defaults files in the [projectpath], so, when the command is complete, go to the [projectpath] and run a `npm install` to fetch dependencies.
When everything will be ok, you can start the server by `node server.js`.

### Default configuration file

You must create a configuration file in `api/configuration/config.js`

```
module.exports = {

    // Hangover
    // nothing... but one day, some cool options here
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

            // we replace defaults swig {{}} for AngularJS
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


### Models

@todo


### Views

@todo


### Tasks

@todo

