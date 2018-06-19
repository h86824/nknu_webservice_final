var card = require("./card")

class Ahri extends card {
    constructor(ID) {
        super(ID);
        this.name = "阿璃";
        this.race = "法師";
        this.cost = 5;
        this.originAtk = 6;
        this.originDef = 5;
        this.cardType = "minion";
        this.newAtk = this.originAtk;
        this.newDef = this.originDef;
    }
}
module.exports = Ahri;