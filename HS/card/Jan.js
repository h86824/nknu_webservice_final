var card = require("./card")

class Jan extends card {
    constructor(ID) {
        super(ID);
        this.name = "小詹";
        this.race = "同學";
        this.cost = 4;
        this.originAtk = 6;
        this.originDef = 1;
        this.cardType = "minion";
        this.newAtk = this.originAtk;
        this.newDef = this.originDef;
    }
}
module.exports = Jan;