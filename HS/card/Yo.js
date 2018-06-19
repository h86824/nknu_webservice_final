var card = require("./card")

class Yo extends card {
    constructor(ID) {
        super(ID);
        this.name = "Yo";
        this.race = "同學";
        this.cost = 6;
        this.originAtk = 6;
        this.originDef = 6;
        this.cardType = "minion";
        this.newAtk = this.originAtk;
        this.newDef = this.originDef;
    }
}
module.exports = Yo;
