var card=require("./card")

class WinTingLee extends card{
    constructor(ID){
        super(ID);
        this.name = "溫聽力";
        this.race = "教授";
        this.cost = 1;
        this.originAtk=15;
        this.originDef=15;
        this.cardType="minion";
        this.newAtk=this.originAtk;
        this.newDef= this.originDef;
    }
}
module.exports = WinTingLee;