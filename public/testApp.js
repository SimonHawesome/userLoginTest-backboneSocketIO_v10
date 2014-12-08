$( document ).ready(function() {

  var socket = io();

  var gameStarted = false;


  socket.on('connected', function(){

    //restart game
    $("#restartBtn").click(function(){
      socket.emit("resetAll");
    });

    socket.on("restart", function(){
      location.reload();
    });

    socket.on('initialize', function(){

      // $(".gameContain").html(appendGame.render().el);
      //   appendPong();
      //   gameStarted = true;

      $("#mainContain").html(qrCodeGen1.render().el);
      renderQR();

      socket.emit('uiInitialized');

    });

    socket.on('connectPlayer1', function(){
       if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        
        $("body").html(controlGen1.render().el);

        socket.emit("player1Connected");

        var player1 = "1";

        tapFunctions(player1);

      }else{

        $("#mainContain").html(qrCodeGen2.render().el);
        renderQR2();

      }
    });

    socket.on('connectPlayer2', function(){
       if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && $('#mainContain').is(':empty') ) {
        
        $("body").html(controlGen2.render().el);

        socket.emit("player2Connected");

        var player2 = "2";

        tapFunctions(player2);

      }else if (gameStarted === false){
        // alert("fire");
        $(".gameContain").html(appendGame.render().el);
        appendPong();
        gameStarted = true;
      }
      
    });

  });

  function renderQR2(){
    var qrcode = new QRCode(document.getElementById("player2Login"), {
      width : 300,
      height : 300,
      text: "https://glacial-lowlands-1865.herokuapp.com/"
    });
  }

  function renderQR(){
    var qrcode = new QRCode(document.getElementById("player1Login"), {
      width : 300,
      height : 300,
      text: "https://glacial-lowlands-1865.herokuapp.com/"
    });
  }

  //Interactive Components

  var counter = 0;

  function tapFunctions(player){

    document.ontouchstart = function(e){ 
      e.preventDefault(); 
    }

    Draggable.create("#funStick", {
      type:"y", 
      edgeResistance:0.65, 
      bounds:"#controllerContain",
      onDragEnd:function(e) {

        TweenLite.to($('#funStick'), 0.2, {transform: "translate3d(0px, 0px, 0px);"});

      },
      onDrag:function() { 
        if(this.y < 0){
          socket.emit('paddle' + player + 'Up');
        }else if(this.y > 0){
          socket.emit('paddle' + player + 'Down');
        }
        
      }

    });

  }

  //Pong Elements

  function appendPong(){
    //Set up the canvas element
    var canvas = document.getElementById('canvas'),
           ctx = canvas.getContext("2d");

    //set width and height of canvas
    var W = 800;
        H = 600;

    //Apply to canvas element
    canvas.height = H;
    canvas.width = W;


    //create the ball element
    var ball = {},
        bounceFactor = 0.7;

    //set ball parameters
    ball = {

      x: 300,
      y: 50,

      radius: 20,
      color: "#3498db",

      //Velocity components
      vx: 10,
      vy: 5,

      draw: function(){
        //draw the circle
        //Parameters(x position, y position, radius, start angle, end angle and a boolean for anti-clockwise direction)
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
      }
    };

    //Set paddle parameters
    paddle_p1 = {
      color: "#e74c3c",

      x: 0,
      y: 237,

      draw: function(xPos, yPos){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, 30, 125)
      }
    }

    paddle_p2 = {
      color: "#e74c3c",

      x: 770,
      y: 237,

      draw: function(xPos, yPos){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, 30, 125)
      }
    }

    //function to clear the the canvas everytime it is updated
    function clearCanvas(){
      ctx.clearRect(0, 0, W, H);
    }

    //function that updates and checks the position of the ball
    function update(){
      clearCanvas();
      ball.draw();
      paddle_p1.draw();
      paddle_p2.draw();

      ball.y += ball.vy;
      ball.x -= ball.vx;

      //Make the ball bounce off of surfaces
      //left wall
      if(ball.x + ball.radius < 40){
        ball.x = 20;
        ball.x -= ball.vx;
        ball.vx /= -bounceFactor;
        console.log(ball.vx);

      //right wall
      }else if(ball.x + ball.radius > W + 10){
        ball.x = W - ball.radius;
        ball.x += ball.vx;
        ball.vx *= -bounceFactor;
        console.log(ball.vx);

      //bottom wall
      }else if(ball.y + ball.radius > H + 10){
        ball.y = H - ball.radius;
        ball.y -= ball.vy;
        ball.vy *= -bounceFactor;

      //top wall
      }else if(ball.y + ball.radius < 25){
        ball.y = 25;
        ball.y += ball.vy;
        ball.vy /= -bounceFactor;
      }

      //left paddle
      if(ball.x + ball.radius < paddle_p1.x + 70){

        //check surface of paddle is hit
        //front
        if(ball.y > paddle_p1.y && ball.y < paddle_p1.y + 125 && ball.vx > 0){
          console.log("paddle1");
          ball.x = paddle_p1.x + 60;
          ball.x -= ball.vx;
          ball.vx /= -bounceFactor;
        }


      }
      
      //right paddle
      if(ball.x + ball.radius > paddle_p2.x){

          if(ball.y > paddle_p2.y && ball.y < paddle_p2.y + 125 && ball.vx < 0){
          console.log("paddle2");
          ball.x = paddle_p2.x;
          ball.x += ball.vx;
          ball.vx *= -bounceFactor;
        }
      }

    }

    socket.on('paddle1Up', function(){
      console.log(paddle_p1.y);
      if(paddle_p1.y != -3){
        paddle_p1.y -= 20;
      }

    });

    socket.on('paddle1Down', function(){
      console.log(paddle_p1.y);
      if(paddle_p1.y != 477){
        paddle_p1.y += 20;
      }
    });

    socket.on('paddle2Up', function(){
      if(paddle_p2.y != -3){
        paddle_p2.y -= 20;
      }
    });

    socket.on('paddle2Down', function(){
      if(paddle_p2.y != 477){
        paddle_p2.y += 20;
      }
    });

    setInterval(update, 1000/60);

  }


});







