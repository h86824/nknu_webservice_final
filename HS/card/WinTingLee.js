var card=require("./card");
var myBattleCry = require("../skill/WinTingBattleCry");

class WinTingLee extends card{
    constructor(ID){
        super(ID);
        this.name = "溫聽力";
        this.race = "教授";
        this.cost = 1;
        this.originAtk=1;
        this.originDef=2;
        this.cardType="minion";
        this.newAtk=this.originAtk;
        this.newDef= this.originDef;
        this.battlecayList.push(new myBattleCry);
    }
}
module.exports = WinTingLee;