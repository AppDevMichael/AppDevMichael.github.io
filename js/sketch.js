var gameData = {
    trees: new Decimal(0),
    treesPerClick: 1,
    treesPerSec: new Decimal(0),
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
var notations = [
    ' thousand',
    ' million',
    ' billion',
    ' trillion',
    ' quadrillion',
    ' quintillion',
    ' sextillion',
    ' septillion',
    ' octillion',
    ' nonillion'
];
var prefixes = [
    '',
    'un',
    'duo',
    'tre',
    'quattuor',
    'quin',
    'sex',
    'septen',
    'octo',
    'novem'
];
var suffixes = [
    'decillion',
    'vigintillion',
    'trigintillion',
    'quadragintillion',
    'quinquagintillion',
    'sexagintillion',
    'septuagintillion',
    'octogintillion',
    'nonagintillion'
];
for (var k in suffixes) {
    for (var j in prefixes)
        notations.push(' ' + prefixes[j] + suffixes[k]);
}
//console.log(formatLong);

let tree;
let lBackground;
let tipBorder;
let buttons = new Array();
let tips;
var showTip = false;
var tipNum = 0;


var savegame = JSON.parse(localStorage.getItem("treeIdleSave"));

function preload() {
    if (savegame !== null) {
        gameData = savegame
        gameData.trees = new Decimal(savegame.trees);
        gameData.treesPerSec = new Decimal(savegame.treesPerSec);
        for (i in gameData.generators) {
            gameData.generators[i] = new Generator(gameData.generators[i]);
        }
        for (i in gameData.upgrades) {
            if (gameData.upgrades[i].bought == 1) {
                if (gameData.upgrades[i].background != "") {
                    lBackground = loadImage(gameData.upgrades[i].background);
                }
                else if (gameData.upgrades[i].tree != undefined) {
                    tree = loadImage(gameData.upgrades[i].tree);
                }
            }
        }
    }
    tips = loadStrings('assets/tips.txt');
    tipBorder = loadImage('images/popupbox.png');
    rBackground = loadImage('images/rightBG.png');
    if (tree == undefined) {
        tree = loadImage('images/trees/palmtree.png');
    }
    if (lBackground == undefined) {
        lBackground = loadImage('images/leftBG.png');
    }

}

function setup() {
    var cnv = createCanvas(1024, 640);
    //cnv = createCanvas(windowWidth, windowHeight);
    noSmooth();
    //Decimal.set({ precision: 1, defaults: true })

    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cnv.position(x, y);
    imageMode(CENTER);
    tree.resizeNN(200, 320);
    image(tree, width / 4, height / 2);
    if (savegame == null) {
        gameData.upgrades = upgrades;
        for (var i = 0; i <= gameData.visableGen; i++) {
            gameData.generators[i] = createGenerator(firstGen.name + i, i);
            gameData.genButtons[i] = new Button((width / 2) + 130, 120 + (54 * i), 240, 48, gameData.generators[i]);
        }
    }
    for (var i = 0; i <= gameData.visableGen; i++) {
        gameData.genButtons[i] = new Button((width / 2) + 130, 120 + (54 * i), 240, 48, gameData.generators[i]);
    }

}

setInterval(function () {
    gameData.trees = Decimal.add(gameData.trees, gameData.treesPerSec)
}, 1000);

setInterval(function () {
    showTip = !showTip;
    tipNum = random(tips);

}, 30000);

setInterval(function () {

    var tempData = Object.assign({}, gameData);
    tempData.genButtons = [];
    tempData.upButtons = [];
    localStorage.setItem('treeIdleSave', JSON.stringify(tempData));

}, 10000);




function draw() {
    //pixelDensity(2);
    background(100);
    rBackground.resizeNN(512, 640);
    lBackground.resizeNN(512, 640);
    image(rBackground, 3 * width / 4, height / 2);
    image(lBackground, width / 4, height / 2);
    fill(255);
    noStroke();
    tree.resizeNN(200, 320);
    image(tree, width / 4, height / 2);
    textSize(25);

    text("Your trees: " + numberFormat(Decimal.round(gameData.trees)), (width / 2) + 20, 40);
    textSize(12);
    text("Your trees per click: " + gameData.treesPerClick, (width / 2) + 20, 60);
    text("Your trees per second: " + Decimal.round(gameData.treesPerSec * 100) / 100, (width / 2) + 20, 74);
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
            if (x >= 4) {
                j++;
                x = 0;
            }
            if (gameData.upButtons[i] == undefined) {
                gameData.upgrades[i].visable = 0;
                gameData.upButtons[i] = new Button((width / 2) + 283 + (x * 54), 120 + (54 * j), 48, 48, gameData.upgrades[i]);
            }

            gameData.upButtons[i].displayUpgrade((width / 2) + 283 + (x * 54), 120 + (54 * j), gameData.upgrades[i]);
            x++;
        }

    }
    for (i in gameData.upButtons) {
        if (gameData.upgrades[i].visable <= gameData.trees && gameData.upgrades[i].bought == 0)
            gameData.upButtons[i].hover(mouseX, mouseY);
    }
    if (showTip == true) {

        drawTip(tipNum);

    }
}

function mousePressed() {
    if (mouseX < (width / 2)) {
        gameData.trees = Decimal.add(gameData.trees, gameData.treesPerClick)
    }
    for (var i = 0; i < gameData.genButtons.length; i++) {
        var clicked = gameData.genButtons[i].click(mouseX, mouseY);
        if (clicked) { gameData.genButtons[i].on = true; }
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
                gameData.trees = gameData.trees.sub(Math.round(tmpPrice));
                var tps = 0;
                let gens = 0;
                for (var i = 0; i < gameData.generators.length; i++) {
                    tps += gameData.generators[i].productionPerSecond;
                    if (gameData.generators[i].bought >= 1) {
                        gens = i;
                    }
                }
                gameData.treesPerSec = new Decimal(tps);
                gens++;
                if (gens > gameData.visableGen) {
                    gameData.generators[gens] = createGenerator(firstGen.name + gens, gens);
                    gameData.genButtons[gens] = new Button((width / 2) + 130, 120 + (54 * gens), 240, 48, gameData.generators[gens]);

                    gameData.genButtons[gens].displayGen(gameData.generators[gens]);
                    gameData.visableGen = gens;

                }

            }
        }
    }


    for (var i = 0; i < gameData.upgrades.length; i++) {
        if (gameData.upButtons[i] != undefined) {
            var clicked = gameData.upButtons[i].click(mouseX, mouseY);
            if (clicked) {
                if (gameData.upgrades[i].visable <= gameData.trees && gameData.upgrades[i].bought == 0 && gameData.upgrades[i].cost <= gameData.trees) {
                    if (gameData.upgrades[i].background != "") {
                        lBackground = gameData.upButtons[i].bg;
                        gameData.upgrades[i].bought = 1;
                        gameData.trees -= gameData.upgrades[i].cost;
                    }
                    else if (gameData.upgrades[i].tpc != undefined) {
                        gameData.upgrades[i].bought = 1;
                        gameData.trees -= gameData.upgrades[i].cost;
                        gameData.treesPerClick += gameData.upgrades[i].tpc;
                    }
                    else if (gameData.upgrades[i].tree != undefined) {
                        gameData.upgrades[i].bought = 1;
                        gameData.trees -= gameData.upgrades[i].cost;
                        tree = gameData.upButtons[i].tree;
                    }
                }
            }
        }
    }
}

function drawTip(msg) {
    tipBorder.resizeNN(240, 240);
    image(tipBorder, width - 120, height - 120);
    fill(255);
    textSize(15);
    text(msg, width - 120, height - 120, 220, 220);
    //console.log(msg);
}

function numberFormat(number) {
    var base = 0,
        notationValue = '';
    if (number.greaterThanOrEqualTo(1000000)) {
        number = Decimal.div(number, 1000)
        while ((number.round()).greaterThanOrEqualTo(1000)) {
            number = Decimal.div(number, 1000);
            base++;
        }
        if (base >= notations.length) {
            return 'Infinity';
        } else {
            notationValue = notations[base];
        }
    }
    if (number.greaterThanOrEqualTo(1000)) {
        remain = Decimal.mod(number, 1000).toString();
        Decimal.rounding = Decimal.ROUND_DOWN;
        remain = "0000" + remain;
        remain = remain.substr(remain.length - 3);
        outNum = Decimal.round(number.div(1000)).toString();
        Decimal.rounding = Decimal.ROUND_HALF_UP;
        output = outNum + "," + remain + notationValue;
        return output;

    }

    return (Decimal.round(number.mul(1000)).div(1000)).toString() + notationValue;
}

