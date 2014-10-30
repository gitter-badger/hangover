/**
 * Hangover
 * Configuration file
 *
 * production mode
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
        uri: 'mongodb://master:27017/hangover'
    },


    // Server
    server: {

        host: '0.0.0.0',

        port: 3012,

        /**
         * HapiJS server options
         * @see for references
         * http://hapijs.com/api#server-options
         */
        options: {

            cors: false,

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

            cache: true,

            varControls: ['<?', '?>']

        }
    }
};
