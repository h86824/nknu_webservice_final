var card = require("./card")

class Justin extends card {
    constructor(ID) {
        super(ID);
        this.name = "爆肝王";
        this.race = "同學";
        this.cost = 1;
        this.originAtk = 3;
        this.originDef = 1;
        this.cardType = "minion";
        this.newAtk = this.originAtk;
        this.newDef = this.originDef;
    }
}
module.exports = Justin;

