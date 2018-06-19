var card=require("./card")
var myBattleCry = require("../skill/CPH.BattleCry");

class CPH extends card{
    constructor(ID){
        super(ID);
        this.name = "CPH";
        this.race = "教授";
        this.cost = 8;
        this.originAtk = 8;
        this.originDef = 7;
        this.cardType = "minion";
        this.newAtk = this.originAtk;
        this.newDef = this.originDef;
        this.battlecayList.push(new myBattleCry());
    }

}
module.exports = CPH;