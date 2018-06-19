var card = require("./card")

class Lily extends card {
    constructor(ID) {
        super(ID);
        this.name = "oo黑魔導oo";
        this.race = "黑";
        this.cost = 8;
        this.originAtk = 9;
        this.originDef = 8;
        this.cardType = "minion";
        this.newAtk = this.originAtk;
        this.newDef = this.originDef;
    }
}
module.exports = Lily;