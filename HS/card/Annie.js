var card = require("./card")

class Annie extends card {
    constructor(ID) {
        super(ID);
        this.name = "安妮";
        this.race = "法師";
        this.cost = 3;
        this.originAtk = 5;
        this.originDef = 1;
        this.cardType = "minion";
        this.newAtk = this.originAtk;
        this.newDef = this.originDef;
    }
}
module.exports = Annie;