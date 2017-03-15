
var express = require('express'),
  config = require('./config/config'),
  mongoose = require('mongoose'),
  bodyParser  = require("body-parser"),
  methodOverride = require("method-override"),
  http     = require("http");

var app = express();

mongoose.connect('mongodb://rtdmongo:PwrUxQR1EKZzNZRogbhBPFrQODCyv2pqBWqLds6ErtgfyOR3LkqW2NrrDPpbM2nSJ6iNnwGj4FCrM24ZLowQ2A==@rtdmongo.documents.azure.com:10250/users?ssl=true', function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  }
  else
  {
    console.log('Connected to database');
  }
});

//MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

var models    = require('./models/users')(app, mongoose);
var UsersCtrl = require('./controllers/users');

// API routes
var usersRoute = express.Router();
usersRoute.route('/users')
  .post(UsersCtrl.addUser);

app.use('/api', usersRoute);

module.exports = require('./config/express')(app, config);

app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});

