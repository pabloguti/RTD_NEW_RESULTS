exports = module.exports = function(app, mongoose) {

    var userSchema = new mongoose.Schema({
        name: {type: String},
        email: {type: String},
        technical: {type: String}
    }, {collection: 'users'});

    mongoose.model('Users', userSchema);
};