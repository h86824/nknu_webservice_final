var card = require("./card")

class Caitlyn extends card {
    constructor(ID) {
        super(ID);
        this.name = "凱特琳";
        this.race = "射手";
        this.cost = 7;
        this.originAtk = 7;
        this.originDef = 7;
        this.cardType = "minion";
        this.newAtk = this.originAtk;
        this.newDef = this.originDef;
    }
}
module.exports = Caitlyn;