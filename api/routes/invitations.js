/**
 * Hangover
 *
 * example invitation file
 */

module.exports = [

    // Invitations (request)
    {
        method: 'POST',
        path: '/invitations',
        handler: Ho.controller('invitations.add'),
        config: {
            validate: {
                payload: {
                    email: Ho.joi.string().required().email()
                }
            }
        }
    }

];
