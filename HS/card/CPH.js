var card=require("./card")
var myBattleCry ;
class CPH extends card{
    constructor(ID){
        super(ID);
        this.cost = 8;
        this.originAtk=8;
        this.originDef=7;
        this.cardType="minion";
        this.newAtk=this.originAtk;
        this.newDef= this.originDef;
        this.battlecayList.push(myBattleCry);
    }
    
}
module.exports = CPH;