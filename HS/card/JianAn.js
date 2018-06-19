var card = require("./card")

class JianAn extends card {
    constructor(ID) {
        super(ID);
        this.name = "建安";
        this.race = "同學";
        this.cost = 5;
        this.originAtk = 5;
        this.originDef = 6;
        this.cardType = "minion";
        this.newAtk = this.originAtk;
        this.newDef = this.originDef;
    }
}
module.exports = JianAn;