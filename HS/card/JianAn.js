var card = require("./card")
var myBattleBry = require("../skill/JianAn.BattleCry");
class JianAn extends card {
    constructor(ID) {
        super(ID);
        this.name = "建安";
        this.race = "同學";
        this.cost = 4;
        this.originAtk = 4;
        this.originDef = 4;
        this.msg = "學雞叫:全部手下受到三點傷害";
        this.cardType = "minion";
        this.newAtk = this.originAtk;
        this.newDef = this.originDef;
        this.battlecayList.push(new myBattleBry());
    }
}
module.exports = JianAn;