var card = require("./card")

class HauShiang extends card {
    constructor(ID) {
        super(ID);
        this.name = "浩翔";
        this.race = "同學";
        this.cost = 3;
        this.originAtk = 4;
        this.originDef = 3;
        this.cardType = "minion";
        this.newAtk = this.originAtk;
        this.newDef = this.originDef;
    }
}
module.exports = HauShiang;


