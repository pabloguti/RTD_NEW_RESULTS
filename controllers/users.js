//File: controllers/users.js
var mongoose = require('mongoose');
var Users = mongoose.model('Users');

//POST Adding users in the database
exports.addUser = function(req, res) {
    console.log('POST');
    console.log(req.body);

    var user = new Users({
        name:    req.body.name,
        email:     req.body.email,
        technical:   req.body.technical
    });

    user.save(function(err, user) {
        if(err) return res.status(500).send(err.message);
        res.status(200).jsonp(user);
    });
};