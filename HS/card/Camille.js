var card = require("./card")

class Camille extends card {
    constructor(ID) {
        super(ID);
        this.name = "卡蜜兒";
        this.race = "鬥士";
        this.cost = 9;
        this.originAtk = 10;
        this.originDef = 7;
        this.cardType = "minion";
        this.newAtk = this.originAtk;
        this.newDef = this.originDef;
    }
}
module.exports = Camille;