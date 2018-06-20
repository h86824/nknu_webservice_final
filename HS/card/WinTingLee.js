var card=require("./card")

class WinTingLee extends card{
    constructor(ID){
        super(ID);
        this.name = "溫聽力";
        this.race = "教授";
        this.cost = 1;
        this.originAtk=1;
        this.originDef=3;
        this.cardType="minion";
        this.newAtk=this.originAtk;
        this.newDef= this.originDef;
    }
}
module.exports = WinTingLee;