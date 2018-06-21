var card = require("./card")

class Yo extends card {
    constructor(ID) {
        super(ID);
        this.name = "Yo";
        this.race = "同學";
        this.cost = 1;
        this.originAtk = 2;
        this.originDef = 2;
        this.cardType = "minion";
        this.newAtk = this.originAtk;
        this.newDef = this.originDef;
    }
}
module.exports = Yo;
