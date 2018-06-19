var card=require("./card")

class Magic extends card{
    constructor(ID){
        super(ID);
        this.cost = 0;
        this.originAtk=0;
        this.originDef=30;
        this.cardType="hero";
        this.newAtk=this.originAtk;
        this.newDef= this.originDef;
    }
}
module.exports = Magic;