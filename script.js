//get the canvas and set it to be 2 dimensional 
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
//modal popup
let modal = document.getElementById("modalBox");

var span = document.getElementsByClassName("close")[0];

let interval; 
let row_cnt;
let bricks = [];
let x; 
let y; 
let paddleX;
let paddleY;
let enableEnter = false;

//show the modal display - when the X (close button) is clicked, call the hide function onModalClose()
modal.style.display = "block";

function onModalClose() {
  
  //get the values for both range input elements and assign them to the appropriate value 
  row_cnt = document.getElementById("bricks").value;
  col_cnt = document.getElementById("brickscol").value; 

  //calculate the appropriate width based on the number of blocks (their width) plus padding 
  canvas.width = (brick_width * col_cnt) + 2*(brick_offset_x) + brick_padding * (col_cnt - 1); 

  x = canvas.width / 2; 
  y = canvas.height - 30; 

  //calculate the starting location of the paddle based on the previous values 
  paddleX = ((brick_width * col_cnt) + 2*(brick_offset_x) + brick_padding * (col_cnt - 1) - paddleWidth) / 2;
  paddleY = (canvas.height - 20); 

  //populate the bricks array to fill the rows and columns specified by user via range elements
  for(var i = 0; i < col_cnt; i++) {
      bricks[i] = [];
      for(var j = 0; j < row_cnt; j++) {
          bricks[i][j] = { x: 0, y: 0, hit: 0};
      }
  }

  //hide the modal 
  modal.style.display = "none";

  //start the animations
  interval = setInterval(draw, 10); 
}



//change in x is 2, change in y is -2 
let dx = 2; 
let dy = -2; 

//ball variables 
let ballRadius = 11; 

//paddle variables 
let paddleHeight = 10; 
let paddleWidth = 75; 


//control variables 
let rightPressed = false; 
let leftPressed = false; 
let powertext = document.getElementById("powerup");
let paddlePower = false; 
let ballSlowPower = false; 

//brick variables 
let brick_width = 75; 
let brick_height = 20; 
let brick_padding = 10; 
let brick_offset_y = 30; 
let brick_offset_x = 30; 
let col_cnt = 5; 
var random; 

//function that draws the bricks on the screen 
function drawBricks() {
    //for each column
    for(var i = 0; i < col_cnt; i++) {
        //for each row 
        for(var j = 0; j < row_cnt; j++) {
            //if the individual brick has not yet been hit 
            if(bricks[i][j].hit == 0) {
                //calculate the location where the brick should be drawn 
                var x = (i * (brick_width + brick_padding)) + brick_offset_x; 
                var y = (j * (brick_height + brick_padding)) + brick_offset_y; 
                
                //set the x and y coordinates of the individual brick 
                bricks[i][j].x = x; 
                bricks[i][j].y = y; 

                //draw the individual brick at the provided location
                ctx.beginPath(); 
                ctx.rect(x, y, brick_width, brick_height);
                ctx.fillStyle = "#0095DD"; 
                ctx.fill(); 
                ctx.closePath(); 
        }
    }
    }
}

//function that draws the ball at the provided location (x,y) 
function drawBall() {
    ctx.beginPath(); 
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2); 
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath(); 
}

//function that draws the paddle at the provided location (paddleX, paddleY)
function drawPaddle() {
    ctx.beginPath(); 
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD"; 
    ctx.fill(); 
    ctx.closePath(); 
}

//function returns a random number 
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

//bread and butter of this game, collision detection 
function collisionDetection() {
    //for each column 
    for(var i = 0; i < col_cnt; i++) {
        //for each row 
        for(var j = 0; j < row_cnt; j++) {
            //get the current brick 
            var curr = bricks[i][j]; 
            //check to see if the current location is within the range of the bricks width and height 
            if(x > curr.x && x < curr.x + brick_width && y > curr.y &&  y < curr.y + brick_height) {

                //we want to increase the speed of the ball when a brick is hit - if it's negative make it more negative, if it's positive make it more positive. 
                if(dy < 0) {
                    dy = dy - 0.5; 
                } else if (dy > 0) {
                    dy = dy + 0.5; 
                } else if (dx < 0) {
                    dx = dx - 0.5; 
                } else if (dx > 0) {
                    dx = dx + 0.5; 
                }
                dy = -dy; 
                curr.hit = 1; 
                bricks[i][j].x = 0; 
                bricks[i][j].y = 0; 
                
                if(random == 2) {
                    powerup.innerHTML = "POWER UP: Paddle Expansion";
                    paddleWidth = 125; 
                    setTimeout(handlePaddlePower, 3000);
                } 
                if(random == 3) {
                    powerup.innerHTML = "POWER UP: Ball Slow"; 
                    if(dy < 0) {
                        dy = -2; 
                    } else if (dy > 0) {
                        dy = 2; 
                    } else if (dx < 0) {
                        dx = -2; 
                    } else if (dx > 0) {
                        dx = 2; 
                    }
                    setTimeout(handleBallSlow, 3000); 
                }
            }
        }
    }
}

function handleBallSlow() {
    powerup.innerHTML = "POWER UP: ";
}

function handlePaddlePower() {
    paddleWidth = 75; 
    powerup.innerHTML = "POWER UP: ";
}

function winDetection() {
  for(var i = 0; i < col_cnt; i++) {
    for (var j = 0; j < row_cnt; j++) {
      if(bricks[i][j].hit == 0) {
        return; 
      } 
    }
  }
  alert("You won! - Hit enter to play again."); 
  document.location.reload(); 
  clearInterval(interval)
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    random = getRandomInt(8); 
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
        if(x > paddleX && x < paddleX + paddleWidth + 5) {
            dy = -dy;
        }
        else {
            alert("Game over - Hit enter to play again. ");
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
    if (e.key == "Enter" && !enableEnter) {
        onModalClose(); 
        enableEnter = true; 
      }
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false; 
    }
}