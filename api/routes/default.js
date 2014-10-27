
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