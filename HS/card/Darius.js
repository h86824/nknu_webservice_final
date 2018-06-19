var card = require("./card")

class Darius extends card {
    constructor(ID) {
        super(ID);
        this.name = "達瑞斯";
        this.race = "鬥士";
        this.cost = 10;
        this.originAtk = 12;
        this.originDef = 12;
        this.cardType = "minion";
        this.newAtk = this.originAtk;
        this.newDef = this.originDef;
    }
}
module.exports = Darius;