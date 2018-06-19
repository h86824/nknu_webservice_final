var card = require("./card")

class DyMing extends card {
    constructor(ID) {
        super(ID);
        this.name = "葉師傅";
        this.race = "教授";
        this.cost = 8;
        this.originAtk = 9;
        this.originDef = 8;
        this.cardType = "minion";
        this.newAtk = this.originAtk;
        this.newDef = this.originDef;
    }
}
module.exports = DyMing;