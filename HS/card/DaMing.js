var card = require("./card");
var myBattleCry = require("../skill/DaMing.BattleCry");

class DaMing extends card {
    constructor(ID) {
        super(ID);
        this.name = "高師許大銘";
        this.race = "屁孩";
        this.cost = 2;
        this.originAtk = 2;
        this.originDef = 2;
        this.cardType = "minion";
        this.newAtk = this.originAtk;
        this.newDef = this.originDef;
        this.battlecayList.push(new myBattleCry);
    }
}
module.exports = DaMing;


