var card = require("./card");
var BattleCry = require("../skill/Lily.BattleCry");

class Lily extends card {
    constructor(ID) {
        super(ID);
        this.name = "oo黑魔導oo";
        this.race = "黑";
        this.cost = 7;
        this.originAtk = 3;
        this.originDef = 5;
        this.msg="若你手中有教授，則獲得+4/+1及衝鋒。";
        this.cardType = "minion";
        this.newAtk = this.originAtk;
        this.newDef = this.originDef;
        this.battlecayList.push(new BattleCry());
    }
}
module.exports = Lily;