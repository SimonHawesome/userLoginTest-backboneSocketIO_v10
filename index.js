var express = require('express'),
	http = require('http'),
	fs = require('fs'),
	path = require('path'),
	app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'public')));

var server = http.createServer(app);

server.listen(app.get('port'), function () {
  console.log("Express server listening on port " + app.get('port'));
});


var io = require('socket.io')(server);

var initializedUI = "locked";

var player1Connected = "null";

var player2Connected = "null";

var gameStarted = "null";

app.get('/', function(req, res){
	res.sendFile('/public/index.html');
});


io.on('connection', function(socket){

	io.emit('connected');

	socket.on('uiInitialized', function(socket){

		initializedUI = "loaded";
		player1Connected = "locked";
		
	});

	socket.on('player1Connected', function(socket){
		
		player1Connected = "loaded";
		player2Connected = "locked";

	});

	socket.on('player2Connected', function(socket){
		
		player2Connected = "loaded";
		
	});


	if(initializedUI === "locked"){

		io.emit('initialize');
		//console.log("initialize");

	}else if(player1Connected === "locked"){

		io.emit('connectPlayer1');
		//console.log("connectPlayer1");

	}else if(player2Connected === "locked"){

		// console.log("connectPlayer2");
		io.emit('connectPlayer2');

	}

	//Socket Communication

	socket.on('paddle1Up', function(socket){
		io.emit('paddle1Up');
	});

	socket.on('paddle1Down', function(socket){
		io.emit('paddle1Down');
	});

	socket.on('paddle2Up', function(socket){
		io.emit('paddle2Up');
	});

	socket.on('paddle2Down', function(socket){
		io.emit('paddle2Down');
	});


	//restartGame
	socket.on("resetAll", function(socket){
		initializedUI = "locked";

		player1Connected = "null";

		player2Connected = "null";

		gameStarted = "null";

		io.emit('connected');
		io.emit('restart');
	

		app.get('/', function(req, res){
			res.sendFile('/public/index.html');
		});

	});

	//move ball
	socket.on("moveBall", function(socket){
		io.emit("moveBall");
	})
	
});




