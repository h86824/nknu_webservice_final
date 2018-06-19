var card = require("./card")

class Poo extends card {
    constructor(ID) {
        super(ID);
        this.name = "大便";
        this.race = "學長";
        this.cost = 8;
        this.originAtk = 8;
        this.originDef = 7;
        this.cardType = "minion";
        this.newAtk = this.originAtk;
        this.newDef = this.originDef;
    }
}
module.exports = Poo;