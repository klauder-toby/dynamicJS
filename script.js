//get the canvas and set it to be 2 dimensional 
let canvas = document.getElementById("myCanvas");
console.log(canvas); 
let ctx = canvas.getContext("2d");

//starting position of the ball is the mid point on the x-axis, and down 30 px from the top on the y-axis
var x = canvas.width / 2; 
var y = canvas.height - 30; 

//change in x is 2, change in y is -2 
var dx = 2; 
var dy = -2; 

//ball variables 
var ballRadius = 10; 

//paddle variables 
var paddleHeight = 10; 
var paddleWidth = 75; 
var paddleX = (canvas.width - paddleWidth) / 2;

//control variables 
var rightPressed = false; 
var leftPressed = false; 

//brick variables 
var brick_width = 75; 
var brick_height = 20; 
var brick_padding = 10; 
var brick_offset_y = 30; 
var brick_offset_x = 30; 
var row_cnt = 3; 
var col_cnt = 5; 

//create and instantiate bricks 
var bricks = [];
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
        for(var j = 0; j < row_count; j++) {
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
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD"; 
    ctx.fill(); 
    ctx.closePath(); 
}

function collisionDetection() {
    for(var i = 0; i < col_cnt; i++) {
        for(var j = 0; j < row_cnt; j++) {
            var curr = bricks[i][j]; 
            if(x > curr.x && x < curr.x + brick_width && y > curr.y &&  y < curr.y + brick_height) {
                dy = -dy; 
                curr.hit = 1; 
                score++; 
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    drawBall(); 
    drawPaddle(); 
    collisionDetection();
    drawBricks(); 
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx; 
    }

    if(y + dy < ballRadius) {
        dy = -dy; 
    } else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleWidth && x < paddleWidth + paddleX) {
            dy = -dy; 
        } else {
            alert("Game Over."); 
            document.location.reload(); 
            clearInterval(interval); 
        }
    }

    if(rightPressed) {
        paddleX += 7; 
        if(paddleX + paddleWidth > canvas.width) {
            paddleX = canvas.width - paddleWidth; 
        }
    } else if (leftPressed) {
        paddleX -= 7; 
        if(paddleX < 0) {
            paddleX = 0;
        }
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