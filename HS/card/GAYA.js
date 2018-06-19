var card=require("./card")

class GAYA extends card{
    constructor(ID){
        super(ID);
        this.cost = 0;
        this.originAtk=0;
        this.originDef=20;
        this.cardType="minion";
        this.newAtk=this.originAtk;
        this.newDef= this.originDef;
    }
}
module.exports = WinTingLee;