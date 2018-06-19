var card = require("./card")

class LiWei extends card {
    constructor(ID) {
        super(ID);
        this.name = "立偉";
        this.race = "教授";
        this.cost = 3;
        this.originAtk = 6;
        this.originDef = 2;
        this.cardType = "minion";
        this.newAtk = this.originAtk;
        this.newDef = this.originDef;
    }
}
module.exports = LiWei;