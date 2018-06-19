var card = require("./card")

class Kuo extends card {
    constructor(ID) {
        super(ID);
        this.name = "家旭";
        this.race = "教授";
        this.cost = 3;
        this.originAtk = 2;
        this.originDef = 4;
        this.cardType = "minion";
        this.newAtk = this.originAtk;
        this.newDef = this.originDef;
    }
}
module.exports = Kuo;