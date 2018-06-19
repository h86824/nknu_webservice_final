var card = require("./card")

class JiungHan extends card {
    constructor(ID) {
        super(ID);
        this.name = "煞氣a屁孩";
        this.race = "屁孩";
        this.cost = 1;
        this.originAtk = 1;
        this.originDef = 1;
        this.cardType = "minion";
        this.newAtk = this.originAtk;
        this.newDef = this.originDef;
    }
}
module.exports = JiungHan;



