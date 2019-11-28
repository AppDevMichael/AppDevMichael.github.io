class Generator {

    constructor(props) {
        this.name = props.name
        this.cost = props.cost
        this.mult = props.mult
        this.amount = props.amount
        this.bought = props.bought
        this.tier = props.tier
        this.baseCost = props.cost

    }

    get canBuy() {
        return this.cost <= gameData.trees
    }

    buy() {

        if (!this.canBuy) return (false);
        if (this.cost < 2) {
            this.cost = 5
        }
        this.cost = Math.round(this.baseCost * Math.pow(1.15, this.amount));
        this.amount += 1;
        this.bought += 1;
        if (this.bought % 100 == 0) {
            this.mult *= 5;
        }
        else if (this.bought % 25 == 0) {
            this.mult *= 1.5;
        }
        return (true);
    }

    get productionPerSecond() {
        let ret = this.amount * this.mult;
        ret /= 10
        return ret
    }

}



function createGenerator(name, index) {

    const g = {
        name: name,
        cost: Math.pow(10, index + 1),
        mult: Math.pow(8, index) / 2,
        amount: 0,
        bought: 0,
        tier: index
    }

    return new Generator(g)
}