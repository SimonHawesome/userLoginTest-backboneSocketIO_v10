//Instantiate gameUI
var gameUI = new app.gameModel({
  playerControlPos: "player1Control"
});

var appendGame = new app.gameView({
  model: gameUI
});

//Instantiate qrCodes
var qrCode1 = new app.qrCodeModel({
  playerPos: "player1Login",
  text: "Player 1: Scan QR code",
  containerClass: "gameContain"
});

var qrCode2 = new app.qrCodeModel({
  playerPos: "player2Login",
  text: "Player 2: Scan QR code",
  containerClass: "gameContain"
});

var qrCodeGen1 = new app.qrCodeView({
  model: qrCode1
});

var qrCodeGen2 = new app.qrCodeView({
  model: qrCode2
});

//Instantiate controllers
var controlModel1 = new app.control({
  playerControlPos: "player1Control"
});

var controlModel2 = new app.control({
  playerControlPos: "player2Control"
});

var controlGen1 = new app.controllerView({
  model: controlModel1
});

var controlGen2 = new app.controllerView({
  model: controlModel2
});
