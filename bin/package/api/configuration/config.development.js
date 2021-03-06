/**
 * Hangover
 * Configuration file
 *
 * development mode
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
    },

    // Nodemailer
    nodemailer: {

        // see https://github.com/andris9/nodemailer-smtp-transport#usage
        options: {

            host: 'http://paulrad.com',

            // see https://github.com/andris9/nodemailer-smtp-transport#authentication
            auth: {

                user: 'paul@paulrad.com',

                pass: 'pelxxo7o'
            }
        }
    }
};
