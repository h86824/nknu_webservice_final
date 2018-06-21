var card = require("./card")
var YoDeath = require("../skill/YoDeathRattle");
class Yo extends card {
    constructor(ID) {
        super(ID);
        this.name = "Yo";
        this.race = "同學";
        this.cost = 1;
        this.originAtk = 2;
        this.originDef = 2;
        this.msg = "死亡之聲:雙方魔法陣受到2點傷害。";
        this.cardType = "minion";
        this.newAtk = this.originAtk;
        this.newDef = this.originDef;
        this.DeathrattleList.push(new YoDeath());
    }
}
module.exports = Yo;
