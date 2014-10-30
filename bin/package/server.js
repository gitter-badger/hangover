/**
 * Default kickstart program
 */

;(function  Kickstart(undefined) {

    'use strict';

    // init hangover system class
    require('hangover-sysclass');

    // Ho is now defined

    // Ho.run(object: callbacks?)
    // @param  
    // `callbacks` an optional object
    Ho.run({
        before: function() {
            Ho.out("Welcome to Hangover... burp :s");
        },
        after: function() {
            Ho.out("Hangover is successfully installed");
        },
        error: function(e) {
            Ho.out("Oh noo.. i receive an exception");
            console.error(e);
        }
    });

})();