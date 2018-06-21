var card = require("./card")

class GAYA extends card {
    constructor(ID) {
        super(ID);
        this.name = "師哥";
        this.race = "同學";
        this.cost = 0;
        this.originAtk = 0;
        this.originDef = 20;
        this.cardType = "minion";
        this.msg = "耍廢";
        this.newAtk = this.originAtk;
        this.newDef = this.originDef;
    }
}
module.exports = GAYA;