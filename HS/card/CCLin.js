var card = require("./card")

class CCLin extends card {
    constructor(ID) {
        super(ID);
        this.name = "哲正";
        this.race = "教授";
        this.cost = 5;
        this.originAtk = 7;
        this.originDef = 4;
        this.cardType = "minion";
        this.newAtk = this.originAtk;
        this.newDef = this.originDef;
    }
}
module.exports = CCLin;


