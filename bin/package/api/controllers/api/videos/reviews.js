var Controller = {

    /**
     * GET
     * api/videos/{id}/reviews
     *
     * return a list of reviews for the {id} video
     */
    get: function(request, reply) {

        reply([
            {
                author: "Paul Rad",
                comment: "i'm a fucking good comment",
                review: 5
            },
            {
                author: "Loana X",
                comment: "i dont like this video",
                review: 1
            }
        ]);

    }

};

module.exports = Controller;
