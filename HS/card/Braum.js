var card = require("./card")

class Braum extends card {
    constructor(ID) {
        super(ID);
        this.name = "布郎姆";
        this.race = "輔助";
        this.cost = 8;
        this.originAtk = 8;
        this.originDef = 8;
        this.cardType = "minion";
        this.newAtk = this.originAtk;
        this.newDef = this.originDef;
    }
}
module.exports = Braum;