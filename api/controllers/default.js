var Controller = {

    index: function(request, reply) {

        reply.view('index.html', {
            meta: {
                title: "Hello, i'm Hangover !"
            },
            title: "Hangover",
            description: "Welcome on Hangover dude ! You can edit this content in the controller index"
        });
    }

};

module.exports = Controller;
