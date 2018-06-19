var card = require("./card")

class Azir extends card {
    constructor(ID) {
        super(ID);
        this.name = "阿祈爾";
        this.race = "法師";
        this.cost = 2;
        this.originAtk = 1;
        this.originDef = 3;
        this.cardType = "minion";
        this.newAtk = this.originAtk;
        this.newDef = this.originDef;
    }
}
module.exports = Azir;