/**
 * Hangover
 * Configuration file
 *
 *
 *
 */

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
        uri: 'mongodb://localhost:27017'
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
