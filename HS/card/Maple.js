var card = require("./card")

class Maple extends card {
    constructor(ID) {
        super(ID);
        this.name = "張晉";
        this.race = "學長";
        this.cost = 5;
        this.originAtk = 2;
        this.originDef = 6;
        this.cardType = "minion";
        this.newAtk = this.originAtk;
        this.newDef = this.originDef;
    }
}
module.exports = Maple;