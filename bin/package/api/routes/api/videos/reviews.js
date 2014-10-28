/**
 * Hangover
 *
 * example api route file
 */

module.exports = [

    {
        method: 'GET',
        // will be replaced by `api/videos`

        // see http://hapijs.com/tutorials/routing
        path: '/api/videos/{id}/reviews',

        // in this example, handler is undefined
        // hangover will automatically set
        // handler: Ho.controller('api/videos.get')

        config: {
            // see http://hapijs.com/tutorials/validation
            validate: {
                params: {
                    // {id} is a required uri parameter and must be an alpha-numerical string
                    id: Ho.joi.string().required().alphanum()
                }
            }
        }
    }

];
