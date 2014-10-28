/**
 * HangOver
 * Hapi Angular (worst pun)
 *
 *
 * HangOver Sys Class
 *
 */

;(function  HangOver(undefined) {

    'use strict';

    try {
        // util module
        var $$util = require('util');

        // fs module
        var $$fs = require('fs');

        // file module
        var $$file = require('file');

        // path module
        var $$path = require('path');

        // boom module
        var $$boom = require('boom');

        // joi module
        var $$joi = require('joi');

        // underscore module
        var $$underscore = require('underscore');

        // cron module
        var $$cron = require('cron').CronJob;
    } catch (e) {
        console.error("Undefined module - please try a npm install and restart hangover");
        console.error(e);
        process.exit(0);
    }

    // differents paths
    var $$paths = {
        configuration: $$path.join(__dirname, '../api/configuration/'),
        controllers: $$path.join(__dirname, '../api/controllers/'),
        helpers: $$path.join(__dirname, '../api/helpers/'),
        models: $$path.join(__dirname, '../api/models/'),
        logs: $$path.join(__dirname, '../logs/'),
        routes: $$path.join(__dirname, '../api/routes/'),
        tasks: $$path.join(__dirname, '../api/tasks/'),
        views: $$path.join(__dirname, '../api/views/')
    };

    // loaded modules
    var $$modules = {};

    // list of loaded class
    var $$singletons = {};

    // controllers list
    var $$controllers = null;

    // routes list
    var $$routes = null;

    // schemas
    var $$schemas = {};

    // models
    var $$models = {};

    // tasks
    var $$tasks = null;

    // current model
    var $$currentModel = null;

    /**
     * Return HangOver instance
     */
    module.exports = new (function() {

        var $self = this;

        /**
         * $file(string: path, string: filename?)
         * @type private
         * @description
         * Return a file path
         */
        var $file = (function(path, file) {
            return $$paths[path] + (file ? file : '');
        });

        /**
         * $get(string: apiPath)
         * @type private
         * @description
         * Return the content of each file in the <path> directory
         */
        var $get = (function(apiPath) {
            var contents = {};
            $$file.walkSync($file(apiPath), function(path, dirs, files) {
                files.forEach(function(file, i) {
                    var filePath = $$path.join(path, file);
                    contents[filePath] = require(filePath);
                });
            });
            return contents;
        });

        /**
         * $module(string: module, function: inclusionFn?)
         * @type private
         * @description
         * Return a module instance or execute `inclusionFn` callback under Ho instance
         * (with the module instance passed in first parameter)
         */
        var $module = (function(module, inclusionFn) {
            if (module.indexOf('.') >= 0) {
                var component = module.split('.');
                var _module = component[0];
            } else {
                var _module = module;
            }

            if (! $$modules[_module]) {
                throw new Error("Undefined module " + _module);
                return null;
            }

            if (inclusionFn && typeof inclusionFn === 'function') {
                $$singletons[module] = inclusionFn.call(this, $$modules[_module]);
            }
            return $$modules[_module];
        });

        /**
         * $treeKeys(object: source, string: selector)
         * @type private
         * @description
         * Return an element (mixed) present in the <source> object, based on the <selector> prototype.
         * @usage
         ``
         $treeKeys({a: {b: {c: 'hello world'}}}, 'a.b.c');
         >> 'hello world'
         */
        var $treeKeys = (function(source, selector) {
            var keymap = selector.split('.'),
                tree = source;

            if (! tree) return null;

            for (var key in keymap) {
                if (tree[keymap[key]]) {
                    tree = tree[keymap[key]];
                } else {
                    return null;
                }
            }
            return tree;
        });


        /**
         * $overrideReply(object: hapiReply)
         * Override the hangover reply object
         */
        var $overrideReply = (function(reply) {
            // local copy for reply.view
            var __view = reply.view;

            // default response callbacks (when reply.response is called)
            var __config = {
                error: function(error) {
                    return (error);
                },
                success: function(doc) {
                    return {success: true};
                }
            };

            /**
             * reply.set(object: config)
             * where `config` is an object like :
             * {
             *    error: function(error) {
             *      return error;
             *    },
             *    success: function(document) {
             *      return { data: { message: 'hello world' } };
             *    }
             * }
             * will override the defaults `reply.response` with the given callbacks
             * you must call `reply.response` after theses assignments
             */
            reply.set = function(config) {
                if (config.success && typeof config.success === 'function') {
                    __config.success = config.success
                }
                if (config.error && typeof config.error === 'function') {
                    __config.error = config.error;
                }
            }

            /**
             * reply.response(object: error?, object: document?)
             * must be called in a `Ho.model(modelname)` callback instance
             */
            reply.response = function(error, doc) {
                if (error) {
                    return reply.call(this, __config.error(error));
                }
                if (doc) {
                    return reply.call(this, __config.success(doc));
                }
                // nothing to do... i'm waiting the mongo response
            };

            /**
             * reply.success(mixed: extra?)
             * return a success response
             * equivalent to
             * {success: true}
             ``
                reply.success();
                => {success: true};
                reply.success({name: 'Paul'});
                => {success: true, meta: {name: 'Paul'}}
             */
            reply.success = function(extra) {
                var output = { success: true };
                if (extra && typeof extra === 'object') {
                    output = $$underscore.extend(output, extra);
                }
                reply(output);
                return reply;
            };

            /**
             * reply.view(string: file, object: vars?)
             * adding some functions to the view
             */
            reply.view = function(view, vars) {
                return __view(view, vars);
            };
            return reply;
        });

        /**
         * Return hangover public properties and methods
         */
        return {

            /**
             * @type public
             *
             * $request
             * will be setted via config.pre Hapi handler
             */
            $request: null,

            /**
             * @type public
             *
             * $reply
             * will be setted via config.pre Hapi handler
             */
            $reply: null,


            /**
             * HangOver.boom
             * Simple `boom` module accessor
             */
            boom: $$boom,


            /**
             * HangOver.db
             * Simple `mongoose` module accessor
             */
            db: function() {
                return $module('mongoose').bind(this);
            },


            /**
             * HangOver.joi
             * Simple `joi` module accessor
             */
            joi: $$joi,


            /**
             * HangOver.config(string: attribute?)
             * Return a configuration object or NULL if asked element doesn't exists
             ``
             Ho.config(); // return the entire configuration object
             Ho.config('mongoose.port'); // return the configured port from the configuration file
             */
            config: function(attribute) {
                if (! $$modules['$$configuration']) {
                    this.require($file('configuration', 'config.js'), '$$configuration', function() {
                        this.err(["Unable to find the configuration file.", "Please, add a config.js file in /api/configuration/ directory."]);
                        process.exit();
                    });
                }

                if (! attribute) {
                    return $$modules['$$configuration'];
                }

                return $treeKeys(this.config(), attribute);
            },

            /**
             * HangOver.controller(string: controllerName)
             * @description
             *
             * Return a controller function from a specified controller file
             *
             * @usage
             ``
             // Accessor for `index` function property in your controllers/myController.js file
             Ho.controller('myController');
             // Accessof for `article` function property in your controllers/myController.js file 
             Ho.controller('myController.article');
             */
            controller: function(controllerName) {
                if (! $$controllers)
                    $$controllers = $get('controllers');

                var controller = controllerName.split('.');
                var controllerFile = controller[0] + '.js',
                    keyIndex = $file('controllers', controllerFile);

                if (! $$controllers[keyIndex]) {
                    throw new Error("Undefined controller action " + keyIndex);
                }
                controller.shift();
                if (controller.length == 0) {
                    controller = 'index';
                } else {
                    controller = controller.join('.');
                }

                var controllerFn = $treeKeys($$controllers[keyIndex], controller);
                if (! controllerFn) {
                    throw new Error("Undefined controller metod " + controller);
                    return false;
                }
                return function(request, reply) {
                    reply = $overrideReply(reply);
                    controllerFn(request, reply);
                };
            },


            /**
             * HangOver.out(string: message)
             * Return message on stdout
             */
            err: function(message) {
                var self = this;

                if ($$util.isArray(message)) {
                    message.forEach(function(item, i) {
                        self.err(item);
                    });
                    return this;
                }
                return $$util.error(' /!\\ ' + message);
            },

            /**
             * HangOver.leton(string: classname, function: inclusionFn?)
             * Return a class instance
             * If `inclusionFn` is passed, your function will be called
             * in the HangOver instance (with the Singleton instance in the 1st parameter)
             */
            leton: function(className, inclusionFn) {
                if (! $$singletons[className]) {
                    throw new Error("Undefined instance " + className);
                    return null;
                }
                if (inclusionFn && typeof inclusionFn === 'function') {
                    inclusionFn.call(this, $$singletons[className]);
                }
                return $$singletons[className];
            },


            /**
             * HangOver.models()
             * @description
             * Load models directives
             */
            models: function() {
                var models = $get('models');
                for (var k in models) {
                    var model = models[k];
                    if (! model.schema) {
                        throw new Error("Undefined schema for model " + k);
                        break;
                    }
                    if (! model.collection) {
                        throw new Error("You must set a collection name for " + k);
                        break;
                    }

                    $module('mongoose', function(mongoose) {
                        var Schema = new mongoose.Schema(model.schema, {collection: model.collection});
                        if (model.pre) {
                            for (var pre in model.pre) {
                                Schema.pre(pre, model.pre[pre]);
                            }
                        }
                        $$schemas[model.collection] = Schema;
                        $$models[model.collection] = mongoose.model(model.collection, Schema);
                    });
                }
            },


            /**
             * HangOver.model(string: model, function: callback?)
             * @description
             * return model instance
             * if `callback` is setted, the callback instance will be invoked with
             * `model` instance in parameter.
             * the $$currentModel variable will be setted with the `model` parameter
             */
            model: function(model, callback) {
                if (!$$models[model]) {
                    throw new Error("undefined model " + model);
                    return null;
                }
                if (callback && typeof callback === 'function') {
                    $$currentModel = model;
                    callback.call(this, new ($$models[model]));
                }
                return $$models[model];
            },


            /**
             * HangOver.module(string: module, function: inclusionFn?)
             * Return a module instance
             * If `inclusionFn` is passed, your function will be called
             * in the HangOver instance (with asked module in 1st parameter of your callback)
             */
            module: function(module, inclusionFn) {
                return $module(module, inclusionFn);
            },


            /**
             * HangOver.path(string: path, string: filename?)
             * @alias to $file private method
             */
            path: $file.bind(this),



            /**
             * HangOver.require(string: module, string: modulename?, function: errorCallback?)
             * Try to load a `module` (require).
             * Will throw an exception if the module can't be loaded.
             * The module, once loaded, will be available by `HangOver.module` method
             * @return nothing
             */
            require: function(module, modulename, errorcallback) {
                var self = this;

                if ($$util.isArray(module)) {
                    module.forEach(function(item, i) {
                        self.require(item);
                    });
                } else {
                    this.out("Fetching module: " + module);
                    try {
                        if (! modulename) modulename = module;
                        $$modules[modulename] = require(module);
                    } catch (e) {
                        if (! errorcallback && typeof errorcallback !== 'function') {
                            this.err(["Failed to load the required module " + module, "Need a npm install ?"]);
                        } else {
                            errorcallback.call(this, e);
                        }
                    }
                }
            },


            /**
             * HangOver.routes()
             * @description
             * Return the entire list of routes directives
             */
            routes: function() {
                if (! $$routes)
                    $$routes = $get('routes');

                var _routes = [];

                // Anonyme function
                // @description
                var overflow = function(route) {
                    // @todo
                    return route;
                };

                for (var key in $$routes) {
                    for (var dir in $$routes[key]) {
                        var route = overflow($$routes[key][dir]);
                        _routes.push(route);
                    }
                }
                return _routes;
            },


            /**
             * HangOver.tasks()
             * @description
             * Load tasks rules and store them to the `$$tasks` private var
             */
            tasks: function() {
                if (! $$tasks)
                    $$tasks = $get('tasks');

                /**
                 * setupTask(object: task)
                 * installing a new scheduled task
                 * `task` is an object
                 *   name: string
                 *   at: string 
                 *   task: function
                 */
                var setupTask = function(file, element) {

                    /**
                     * job
                     * class passed in parameter to your task
                     */
                    $$tasks[file][element].$job = new (function() {
                        var self = this;

                        return {

                            $$count: 0,

                            $$logfile: null,

                            $$logfd: null,

                            $$state: false,

                            $$time: null,

                            // count()
                            // return number of task iterations
                            count: function() {
                                return this.$$count;
                            },

                            // getAttribute(string: attribute)
                            // return an attribute
                            getAttribute: function(attribute) {
                                return this[attribute];
                            },

                            // log(string: message)
                            // throw a `message` on `logfile` fd
                            log: function(message) {
                                if (this.$$logfile === null) {
                                    return Ho.out(message);
                                }
                                if (this.$$logfd === null) {
                                    this.$$logfd = $$fs.openSync($file('logs', this.$$logfile), 'w+');
                                }
                                message = $$util.format('%s ' + message + "\r\n", new Date());
                                $$fs.write(this.$$logfd, message);
                                return this;
                            },

                            // job.run(boolean: state?)
                            // setter / getter
                            // if `state` is not given, `job.run` will
                            // return the previous state
                            // will be set on `false` by default on the first execution
                            run: function(state) {
                                if (typeof state === 'undefined') return this.$$state;
                                this.$$state = state;
                            },

                            // setAttribute(string: attribute, mixed: value)
                            // set an attribute
                            // some `attribute` names are reserved words
                            // banned attributes name are
                            // - vars beginning by `$$`
                            // - count
                            // - getAttribute
                            // - log
                            // - setAttribute
                            // - run
                            // - time
                            setAttribute: function(attribute, value) {
                                if (attribute.length == 0) {
                                    throw new Error("You must enter an attribute name");
                                    return this;
                                }
                                if (attribute.substr(0, 2) == '$$') {
                                    throw new Error("An attribute cant start with $$");
                                    return this;
                                }
                                var bannedWords = ['count', 'getAttribute', 'log', 'setAttribute',
                                    'run', 'time'];
                                if ($$underscore.indexOf(bannedWords, attribute) == -1) {
                                    throw new Error(attribute + " is a reserved word");
                                    return this;
                                }
                                if (typeof value === 'undefined') {
                                    throw new Error("You must set a value");
                                    return this;
                                }
                                this[attribute] = value;
                                return this;
                            },

                            // time()
                            // return last runned Date
                            time: function() {
                                return $$time;
                            }
                        }
                    });

                    if (typeof $$tasks[file][element].logfile !== 'undefined') {
                        $$tasks[file][element].$job.$$logfile = $$tasks[file][element].logfile;
                    }

                    // install task in scheduleJob
                    $$tasks[file][element].$cron = new $$cron({

                        cronTime: $$tasks[file][element].at,

                        onTick: function() {
                            var job = $$tasks[file][element].$job;

                            if (job.$$count == 0) {
                                job.run(false);
                            }
                            $$tasks[file][element].task.call(Ho, job);
                            job.$$count += 1;
                        },

                        start: true

                    });
                };

                for (var k in $$tasks) {
                    for (var o in $$tasks[k]) {
                        setupTask(k, o);
                    }
                }
            },



            /**
             * HangOver.out(string: message)
             * Return message on stdout
             */
            out: function(message) {
                var self = this;

                if ($$util.isArray(message)) {
                    message.forEach(function(item, i) {
                        self.err(item);
                    });
                    return this;
                }
                return $$util.log(message);
            }
        };
    });

})();