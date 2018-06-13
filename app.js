var GameCore = require('./HS/game-core');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var UUID = require('node-uuid');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var Player = require("./player")
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var playersList = [];
var matchList = [];

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

server.listen(3001);

io.sockets.on('connection', function (client) {
  client.id = UUID();
  playersList.push(client);

  client.on('match',function(data){
    if(matchList.length){
      let opponent=matchList.splice(0,1);
      let game = new GameCore(new Player(client,data.hero,data.deck),opponent);
      game.start();
    }
    else{
      matchList.push(new Player(client,data.hero,data.deck));
    }
    
  })
  /*socket.on('my other event', function (data) {
	  console.log(data);
    var core = new GameCore(socket , socket);
    core.Start();
  });*/
});
