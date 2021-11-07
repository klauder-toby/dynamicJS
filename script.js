//get the canvas and set it to be 2 dimensional 
let canvas = document.getElementById("myCanvas");
console.log(canvas); 
let ctx = canvas.getContext("2d");

//starting position of the ball is the mid point on the x-axis, and down 30 px from the top on the y-axis
let x = canvas.width / 2; 
let y = canvas.height - 30; 

//change in x is 2, change in y is -2 
let dx = 2; 
let dy = -2; 

//ball variables 
let ballRadius = 10; 

//paddle variables 
let paddleHeight = 10; 
let paddleWidth = 75; 
let paddleX = (canvas.width - paddleWidth) / 2;
let paddleY = (canvas.height - 20); 

//control variables 
let rightPressed = false; 
let leftPressed = false; 
let powertext = document.getElementById("powerup");

//brick variables 
let brick_width = 75; 
let brick_height = 20; 
let brick_padding = 10; 
let brick_offset_y = 30; 
let brick_offset_x = 30; 
let row_cnt = 3; 
let col_cnt = 5; 

//create and instantiate bricks 
let bricks = [];
for(var i = 0; i < col_cnt; i++) {
    bricks[i] = [];
    for(var j = 0; j < row_cnt; j++) {
        bricks[i][j] = { x: 0, y: 0, hit: 0};
    }
}

//score variables 
var score = 0; 

function drawBricks() {
    for(var i = 0; i < col_cnt; i++) {
        for(var j = 0; j < row_cnt; j++) {
            if(bricks[i][j].hit == 0) {
                var x = (i * (brick_width + brick_padding)) + brick_offset_x; 
                var y = (j * (brick_height + brick_padding)) + brick_offset_y; 
                
                bricks[i][j].x = x; 
                bricks[i][j].y = y; 

                ctx.beginPath(); 
                ctx.rect(x, y, brick_width, brick_height);
                ctx.fillStyle = "#0095DD"; 
                ctx.fill(); 
                ctx.closePath(); 
        }
    }
    }
}

function drawBall() {
    ctx.beginPath(); 
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2); 
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath(); 
}

function drawPaddle() {
    ctx.beginPath(); 
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD"; 
    ctx.fill(); 
    ctx.closePath(); 
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function collisionDetection() {
    for(var i = 0; i < col_cnt; i++) {
        for(var j = 0; j < row_cnt; j++) {
            var curr = bricks[i][j]; 
            if(x > curr.x && x < curr.x + brick_width && y > curr.y &&  y < curr.y + brick_height) {
                dy = -dy; 
                curr.hit = 1; 
                score++; 
                bricks[i][j].x = 0; 
                bricks[i][j].y = 0; 
                console.log(getRandomInt(4) + "");
                if(getRandomInt(4) == 2) {
                    powerup.innerHTML = "POWER UP: Paddle Expansion";
                }

            }
        }
    }
}

function winDetection() {
  for(var i = 0; i < col_cnt; i++) {
    for (var j = 0; j < row_cnt; j++) {
      if(bricks[i][j].hit == 0) {
        return; 
      } 
    }
  }
  alert("Game Over - You Win!"); 
  document.location.reload(); 
  clearInterval(interval); 
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks(); 
    collisionDetection(); 
    winDetection(); 
    
    //side wall checks 
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    } //ball bounce off paddle check 
    else if(y + dy > canvas.height-ballRadius - paddleHeight) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval); 
        }
    }
    
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    
    x += dx;
    y += dy;
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false); 

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true; 
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false; 
    }
}

var interval = setInterval(draw, 10); 