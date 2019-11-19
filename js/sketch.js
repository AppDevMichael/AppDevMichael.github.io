
var gameData = {
  trees: 0,
  treesPerClick: 1,
  treesPerSec: 0,
  visableGen: 1,
  generators: [],
  genButtons: [],
  upgrades: [],
  upButtons: [],
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

  //upgrades.up;
  img = loadImage('https://image.shutterstock.com/image-vector/green-tree-cartoon-260nw-317936303.jpg');
}

function setup() {
  var cnv = createCanvas(1024, 640);
  gameData.upgrades = upgrades;
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
  imageMode(CENTER);
  image(img, width / 4, height / 2);
  console.log(upgrades);

  for (var i = 0; i <= gameData.visableGen; i++) {
    gameData.generators[i] = createGenerator(firstGen.name + i, i);
    gameData.genButtons[i] = new Button((width / 2) + 130, 90 + (54 * i), 240, 48, gameData.generators[i]);
  }
}

setInterval(function () {
  gameData.trees += gameData.treesPerSec;
}, 1000);

function draw() {

  background(100);
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
    gameData.genButtons[i].displayGen(gameData.generators[i]);
  }
  let j = 0;
  let x = 0;
  for (i in gameData.upgrades) {
    //console.log(i);
    if (gameData.upgrades[i].visable <= gameData.trees && gameData.upgrades[i].bought == 0) {
      if (x >= 5) {
        j++;
        x = 0;
      }
      if (gameData.upButtons[i] == undefined) {
        gameData.upButtons[i] = new Button(795 + (x * 50), 90 + (54 * j), 48, 48, gameData.upgrades[i]);
      }

      gameData.upButtons[i].displayUpgrade(795 + (x * 50), 90 + (54 * j), gameData.upgrades[i]);
      gameData.upButtons[i].hover(mouseX, mouseY);
      x++;
    }

  }
}

function mousePressed() {
  if (mouseX < (width / 2)) {
    gameData.trees += gameData.treesPerClick;
  }
  for (var i = 0; i < gameData.visableGen; i++) {
    var clicked = gameData.genButtons[i].click(mouseX, mouseY);
    if (clicked) {
    }
  }
}

function mouseReleased() {
  for (var i = 0; i < gameData.genButtons.length; i++) {
    var clicked = gameData.genButtons[i].click(mouseX, mouseY);
    gameData.genButtons[i].on = false;
    if (clicked) {
      tmpPrice = gameData.generators[i].cost;
      bought = gameData.generators[i].buy();

      if (bought) {
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
        if (gens > gameData.visableGen) {
          gameData.generators[gens] = createGenerator(firstGen.name + gens, gens);
          gameData.genButtons[gens] = new Button((width / 2) + 130, 90 + (54 * gens), 240, 48, gameData.generators[gens]);

          gameData.genButtons[gens].displayGen(gameData.generators[gens]);
          gameData.visableGen = gens;

        }

      }
    }
  }
}
