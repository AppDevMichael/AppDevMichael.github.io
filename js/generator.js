class Generator {

    constructor(props) {
        this.name = props.name
        this.cost = props.cost
        this.mult = props.mult
        this.amount = props.amount
        this.bought = props.bought
        this.tier = props.tier
        
    }

    get canBuy() {
        return this.cost <= gameData.trees
    }

    buy() {
        
        if (!this.canBuy) return(false);
        //gameData.tress -= this.cost;
        console.log("gameData.tree " + gameData.trees);
        this.cost *= 1 + (this.tier + 1) * 0.25;
        this.amount += 1;
        this.bought += 1;
        if (this.bought % 100 == 0) {
            this.mult *= 5;
        }
        else if (this.bought % 25 == 0) {
            this.mult *= 3;
        }
        return(true);
    }

    get productionPerSecond() {
        let ret = this.amount * this.mult;
        if (this.tier !== 0) ret /= 5
        return ret
    }
    
}



function createGenerator(name,index) {

    const g = {
        name: name,
        cost: Math.pow(10, index),
        mult: 1,
        amount: 0,
        bought: 0,
        tier: index
    }

    return new Generator(g)
}