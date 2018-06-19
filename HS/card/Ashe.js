var card = require("./card")

class Ashe extends card {
    constructor(ID) {
        super(ID);
        this.name = "艾希";
        this.race = "射手";
        this.cost = 4;
        this.originAtk = 3;
        this.originDef = 5;
        this.cardType = "minion";
        this.newAtk = this.originAtk;
        this.newDef = this.originDef;
    }
}
module.exports = Ashe;