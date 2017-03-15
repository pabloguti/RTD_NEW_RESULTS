
var express = require('express'),
  config = require('./config/config'),
  mongoose = require('mongoose'),
  http     = require("http");


var app = express();

var io = require('socket.io').listen(80);

module.exports = require('./config/express')(app, config);

app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});

//ENDPOINT WEBSOCKETS
io.on('connection', function(socket){
  io.set('transports', ['websocket']);
  socket.on('question', function(question){
    console.log('Question selected: ' + question.selection);
    io.sockets.emit('qGraph', question);
  });
  socket.on('technologies', function(technologies){
    console.log('Technologies selected: ' + technologies);
  });
  socket.on('messages', function(messages){
    console.log('The user ' + messages.user + ' says: ' + messages.message);
    io.sockets.emit('ServerMessages', messages);
  });
});


