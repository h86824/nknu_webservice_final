var card = require("./card")

class Haru extends card {
    constructor(ID) {
        super(ID);
        this.name = "Haru";
        this.race = "宅";
        this.cost = 6;
        this.originAtk = 4;
        this.originDef = 8;
        this.cardType = "minion";
        this.newAtk = this.originAtk;
        this.newDef = this.originDef;
    }
}
module.exports = Haru;