
module.exports = {
    
    collection: 'invitations',

    schema: {
        email: {
            type: String,
            required: true,
            index: true
        },

        created_at: {
            type: Date,
            default: Date.now()
        }
    },

    pre: {

        // ensure email insertion is unique
        save: function(next, done) {
            var self = this;

            Ho.model('invitations').findOne({
                email: this.email
            }, function(err, document) {
                if (err) {
                    done(err);
                } else if (document) {
                    done(Ho.boom.badRequest("Existing email"));
                } else {
                    done();
                    next();
                }
            });
        }
    }

};