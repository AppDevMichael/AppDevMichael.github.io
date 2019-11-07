let counter = 0; 

let img;

function preload() {
  img = loadImage('https://image.shutterstock.com/image-vector/green-tree-cartoon-260nw-317936303.jpg');
}

function setup() {
  createCanvas(600, 400);
  imageMode(CENTER);
  image(img, width/4, height/2);
  
}


function draw() {
  background(220);
  image(img, width/4, height/2);
  text("Your trees: " + counter, (width/2) + 20 ,40);
  line((width/2),0,(width/2),height);
}

function mousePressed() {
  if (mouseX < (width/2)) {
    counter++;
  }
}