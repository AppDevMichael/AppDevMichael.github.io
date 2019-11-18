
var gameData = {
  trees: 0,
  treesPerClick: 1,
  treesPerSec: 0,
  visableGen: 1,
  generators: []
}
var firstGen = {
  tier: 0,
  cost: 10,
  mult: 1,
  amount: 0,
  bought: 0,
  name: "Generator "
}

let img;
let buttons = new Array();



function preload() {
  img = loadImage('https://image.shutterstock.com/image-vector/green-tree-cartoon-260nw-317936303.jpg');
}

function setup() {
  var cnv = createCanvas(1024, 640);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
  imageMode(CENTER);
  image(img, width / 4, height / 2);
  for (var i = 0; i <= gameData.visableGen; i++) {
    gameData.generators[i] = createGenerator(firstGen.name + i, i);
    buttons[i] = new Button((width / 2) + 140, 90 + (54 * i), 240, 48, gameData.generators[i]);
  }
}

setInterval(function () {
  gameData.trees += gameData.treesPerSec;
}, 1000);

function draw() {
  background(220);
  fill(0);
  noStroke();
  image(img, width / 4, height / 2);
  textSize(25);
  text("Your trees: " + Math.round(gameData.trees), (width / 2) + 20, 20);
  textSize(12);
  text("Your trees per second: " + Math.round(gameData.treesPerSec), (width / 2) + 20, 50);
  stroke(0);
  line((width / 2), 0, (width / 2), height);
  for (var i = 0; i <= gameData.visableGen; i++) {
    buttons[i].display(gameData.generators[i]);
  }
}

function mousePressed() {
  if (mouseX < (width / 2)) {
    gameData.trees += gameData.treesPerClick;
  }
  for (var i = 0; i < gameData.visableGen; i++) {
    var clicked = buttons[i].click(mouseX, mouseY);
    if (clicked) {
      console.log("clicked " + i);
    }
  }
}

function mouseReleased() {
  for (var i = 0; i < buttons.length; i++) {
    var clicked = buttons[i].click(mouseX, mouseY);
    buttons[i].on = false;
    if (clicked) {
      console.log("released button " + i);
      tmpPrice = gameData.generators[i].cost;
      bought = gameData.generators[i].buy();

      if (bought) {
        console.log("released button " + i);
        gameData.trees = gameData.trees - Math.round(tmpPrice);
        var tps = 0;
        let gens = 0;
        for (var i = 0; i < gameData.generators.length; i++) {
          tps += gameData.generators[i].productionPerSecond;
          if (gameData.generators[i].bought >= 1) {
            gens = i;
          }
        }
        gameData.treesPerSec = tps;
        gens++;
        console.log(gens);
        if(gens > gameData.visableGen){
          console.log(gens);
          gameData.generators[gens] = createGenerator(firstGen.name + gens, gens);
          buttons[gens] = new Button((width / 2) + 120, 90 + (50 * gens), 200, 40, gameData.generators[gens]);
          buttons[gens].display(gameData.generators[gens]);
          gameData.visableGen = gens;

        }
        
      }
    }
  }
}
