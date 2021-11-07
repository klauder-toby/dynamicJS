var can = document.getElementById("myCanvas"); 
var ctx = can.getContext("2d");
ctx.fillStyle = "#CCCCCC"; 
can.addEventListener("click", canvasClicked);

class Location {
  constructor(x, y) {
    this.x = x; 
    this.y = y; 
  }
}

class Canvas {
  constructor(squares) {
    this.squares = squares; 

    for(var i in squares) {
      console.log(i);
      squares[i].draw(); 
    }

    ctx.beginPath();
    ctx.moveTo(100, 0); 
    ctx.lineTo(100, 300);
    ctx.closePath(); 
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.stroke(); 

    ctx.beginPath();
    ctx.moveTo(200, 0); 
    ctx.lineTo(200, 300);
    ctx.closePath(); 
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.stroke(); 

    ctx.beginPath();
    ctx.moveTo(0, 100); 
    ctx.lineTo(300, 100);
    ctx.closePath(); 
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.stroke(); 

    ctx.beginPath();
    ctx.moveTo(0, 200); 
    ctx.lineTo(300,200);
    ctx.closePath(); 
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.stroke(); 
  }
}


function canvasClicked(e) {
   // Get the canvas and bounding client rectangle
   const canvas = e.target;
   const rect = canvas.getBoundingClientRect();
   
   // Compute click coordinates, relative to the canvas
   const x = e.clientX - rect.left;
   const y = e.clientY - rect.top;
   
   // Convert from pixel coordinates to row, column
   const row = Math.floor(y * 3 / canvas.height);
   const column = Math.floor(x * 3 / canvas.width);
   
   // Call clickLight
   clickSquare(row, column);
}


class Square {
  constructor(status, location) {
    this.status = status; 
    this.location = location; 
  }
  
   draw() {
       ctx.fillRect(this.location.x * 100, this.location.y * 100, 100, 100);
   }
}

let square0 = new Square("blank", new Location(0, 0));
let square1 = new Square("blank", new Location(0, 1));
let square2 = new Square("blank", new Location(0, 2));
let square3 = new Square("blank", new Location(1, 0));
let square4 = new Square("blank", new Location(1, 1));
let square5 = new Square("blank", new Location(1, 2));
let square6 = new Square("blank", new Location(2, 0));
let square7 = new Square("blank", new Location(2, 1));
let square8 = new Square("blank", new Location(2, 2));
let squares = [square0, square1, square2, square3, square4, square5, square6, square7, square8];
let c = new Canvas(squares);

function clickSquare(r, c) {
 for(var i in squares) {
   if(squares[i].location.x == r && squares[i].location.y == c) {
     squares[i].fillRect("#DDDDDD"); 
   }
 } 
}