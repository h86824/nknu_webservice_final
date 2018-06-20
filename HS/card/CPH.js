var card=require("./card")
var myBattleCry = require("../skill/CPH.BattleCry");

class CPH extends card{
    constructor(ID){
        super(ID);
        this.name = "CPH";
        this.race = "教授";
        this.cost = 1;
        this.originAtk = 1;
        this.originDef = 1;
        this.cardType = "minion";
        this.newAtk = this.originAtk;
        this.newDef = this.originDef;
        this.battlecayList.push(new myBattleCry());
        console.log("戰吼柱列:"+this.battlecayList);
    }

}
module.exports = CPH;