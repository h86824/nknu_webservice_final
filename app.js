var GameCore = require('./HS/game-core');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var UUID = require('uuid/v4');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var Player = require("./HS/player");
var creatCard = require("./HS/creatCard");
var setting =require("./HS/action/action.setting");

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var playersList = [];
var matchList = [];
var card = new creatCard();



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

server.listen(3000);

io.sockets.on('connection', function (client) {
  client.id = UUID();
  playersList.push(client);
  console.log(client.id+" has connected!");
  client.on('dual',function(data){
    console.log("get dual msg");
    if(matchList.length){
      let opponent=matchList.splice(0,1)[0];
      if(opponent.socket===client){
        console.log("同人");
        matchList.push(opponent);
      }
      else{
        console.log("不同人");
        
        console.log(opponent.socket.id+" VS "+client.id+" start");
        client.emit("dual",new setting(0.1,client));
        opponent.socket.emit("dual",new setting(0.1,opponent.socket));
        let game = new GameCore(new Player(client,card.creat(data.obj.hero),card.creatDeck(data.obj.deckID)),opponent);
        game.start();
      }
    }
    else{
      matchList.push(new Player(client,card.creat(data.obj.hero),card.creatDeck(data.obj.deckID)));
      console.log(client.id+" start waiting(new instance)");
    }
    
  });
  client.on('disconnect', function () {
    let tempindex =playersList.indexOf(client);
    for(let u =0 ;u<matchList.length;u++){
      if(matchList[u].socket == client){
        matchList.splice(u,1);
      }
    }
    playersList.splice(tempindex,1);
    console.log(client.id+" has disconnected!");
  });
});
