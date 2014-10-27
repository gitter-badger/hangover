
module.exports = [

    // Default
    {
        method: 'GET',
        path: '/',
        handler: Ho.controller('default')
    },
    
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