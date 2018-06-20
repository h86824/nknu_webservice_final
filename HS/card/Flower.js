var card = require("./card")

class Flower extends card {
    constructor(ID) {
        super(ID);
        this.name = "花花";
        this.race = "同學";
        this.cost = 3;
        this.originAtk = 1;
        this.originDef = 7;
        this.cardType = "minion";
        this.newAtk = this.originAtk;
        this.newDef = this.originDef;
    }
}
module.exports = Flower;
