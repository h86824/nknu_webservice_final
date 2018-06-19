var card = require("./card")

class Yee extends card {
    constructor(ID) {
        super(ID);
        this.name = "文義";
        this.race = "學長";
        this.cost = 9;
        this.originAtk = 9;
        this.originDef = 9;
        this.cardType = "minion";
        this.newAtk = this.originAtk;
        this.newDef = this.originDef;
    }
}
module.exports = Yee;