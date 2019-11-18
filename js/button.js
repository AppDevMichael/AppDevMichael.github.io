function Button(tempX, tempY, tempW, tempH, tempObj) {
    // Button location and size
    this.x = tempX;
    this.y = tempY;
    this.w = tempW;
    this.h = tempH;
    this.title = tempObj.name;
    this.sub = "Own " + tempObj.bought;
    // Is the button on or off?
    // Button always starts as off
    this.on = false;

    this.click = function (mx, my) {
        // Check to see if a point is inside the rectangle
        if (mx > (this.x - (this.w / 2)) && mx < (this.x + (this.w / 2)) && my > (this.y - (this.h / 2)) && my < (this.y + (this.h / 2))) {
            this.on = !this.on;
            return (1);
        }
    };

    // Draw the rectangle
    this.display = function (genData) {
        this.sub = "Own " + genData.bought;
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
        textAlign(LEFT, BOTTOM);
        textSize(15);
        text(this.title, (this.x - (this.w / 2)) + 5, this.y);
        textSize(10);
        textAlign(LEFT, TOP);
        text(this.sub, (this.x - (this.w / 2)) + 5, this.y);
        textSize(10);
        textAlign(RIGHT, TOP);
        text(this.sub, (this.x + (this.w / 2)) - 5, this.y);
        textAlign(LEFT, CENTER);
    }
}