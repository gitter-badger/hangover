/**
 * Hangover
 * Configuration file
 */

module.exports = {

    // what is the current environment
    environment: process.env.ENVIRONMENT,

    // list of directives
    directives: {

        // when environment is undefined or different than others directives
        default: 'config.development.js',

        // if environment === 'production'
        production: 'config.production.js'

    }

};