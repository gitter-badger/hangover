var Controller = {

    /**
     * GET
     * api/videos
     * return video informations
     */
    get: function(request, reply) {

        // that's an example dude...
        reply({
            id: request.params.id,
            poster: 'http://paulrad.com/hangover-example-bugsbunny.jpeg',
            title: 'my beautiful video',
            duration: 68
        });

    }

};

module.exports = Controller;
