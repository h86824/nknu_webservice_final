var card = require("./card")

class YYT extends card {
    constructor(ID) {
        super(ID);
        this.name = "遠澤";
        this.race = "教授";
        this.cost = 2;
        this.originAtk = 2;
        this.originDef = 3;
        this.cardType = "minion";
        this.newAtk = this.originAtk;
        this.newDef = this.originDef;
    }
}
module.exports = YYT;