class Button {

    constructor(tempX, tempY, tempW, tempH, tempObj) {
        // Button location and size
        this.x = tempX;
        this.y = tempY;
        this.w = tempW;
        this.h = tempH;
        this.title = tempObj.name;
        this.sub = "Own " + tempObj.bought;
        this.cost = "Cost " + tempObj.cost;
        // Is the button on or off?
        // Button always starts as off
        this.on = false;
        this.icon = loadImage("images/generators.png");
        this.icon.resizeNN(240,48);
        if (tempObj.image != undefined) {
            this.icon = loadImage(tempObj.image);
            this.icon.resizeNN(24,24);
        }
        this.hoverImage = loadImage("images/thinBorderDescBox.png");
        
    }


    click(mx, my) {
        // Check to see if a point is inside the rectangle
        if (mx > (this.x - (this.w / 2)) && mx < (this.x + (this.w / 2)) && my > (this.y - (this.h / 2)) && my < (this.y + (this.h / 2))) {
            this.on = !this.on;
            return (1);
        }
    };

    // Draw the rectangle
    displayGen(genData) {
        this.sub = "Own " + genData.bought;
        this.cost = "Cost " + genData.cost;
        rectMode(CENTER);

        noStroke();
        // The colours changes based on the state of the button
        if (this.on) {
            fill(175);
            rect(this.x, this.y, this.w, this.h);
            fill(0);
        } else {
            fill(0);
            rect(this.x, this.y, this.w, this.h);
            fill(255);
        }
        this.icon.resizeNN(240,48);
        image(this.icon, this.x, this.y);
        textAlign(LEFT, BOTTOM);
        textSize(15);
        text(this.title, (this.x - (this.w / 2)) + 10, this.y);
        textSize(10);
        textAlign(LEFT, TOP);
        text(this.sub, (this.x - (this.w / 2)) + 10, this.y);
        textSize(10);
        textAlign(RIGHT, TOP);
        text(this.cost, (this.x + (this.w / 2)) - 10, this.y);
        textAlign(LEFT, CENTER);
    }

    displayUpgrade(tempX, tempY,data) {

        rectMode(CENTER);
        this.x = tempX;
        this.y = tempY;

        noStroke();
        // The colours changes based on the state of the button
        //console.log("image local" + data.image);
        
        this.icon.resizeNN(48,48);
        if (this.on) {
            fill(175);
            rect(this.x, this.y, this.w, this.h);
            fill(0);
        } else {
            fill(0);
            rect(this.x, this.y, this.w, this.h);
            fill(255);
        }
        this.icon.resize(this.w,this.w);
        image(this.icon, this.x, this.y);

    }
    
    hover(mx, my) {
        // Check to see if a point is inside the rectangle
        if (mx > (this.x - (this.w / 2)) && mx < (this.x + (this.w / 2)) && my > (this.y - (this.h / 2)) && my < (this.y + (this.h / 2))) {
            this.hoverImage.resizeNN(300,144);
            //rect(this.x-100, this.y, 200, 100);
            image(this.hoverImage, this.x-150, this.y);
            
        }
    };
}
