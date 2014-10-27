/**
 * HangOver
 * Hapi Angular (worst pun)
 * Structured based app
 *
 * @ sys/hangover.js
 * api references
 */

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