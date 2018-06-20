var card=require("./card")
var myBattleCry = require("../skill/CPH.BattleCry");

class CPH extends card{
    constructor(ID){
        super(ID);
        this.name = "CPH";
        this.race = "教授";
        this.cost = 1;
        this.originAtk = 8;
        this.originDef = 7;
        this.cardType = "minion";
        this.newAtk = this.originAtk;
        this.newDef = this.originDef;
        this.msg = "戰吼:對一個隨機敵方手下造成8點傷害。";
        this.battlecayList.push(new myBattleCry());
    }

}
module.exports = CPH;