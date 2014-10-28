var Controller = {

    /**
     * Example file
     * Add an invitation
     */
    add: function(request, reply) {

        Ho.model('invitations', function(Invitation) {
            Invitation.email = request.payload.email;

            reply.set({
                success: function(doc) {
                    return {
                        id: doc._id,
                        created_at: doc.created_at
                    };
                }
            });

            Invitation.save(reply.response);
        });

    }

};

module.exports = Controller;
