var card=require("./card");
var heropoert = require("../skill/MagicHeroPower");

class Magic extends card{
    constructor(ID){
        super(ID);
        this.cost = 0;
        this.originAtk=0;
        this.originDef=30;
        this.cardType="hero";
        this.newAtk=this.originAtk;
        this.newDef= this.originDef;
        this.heroPowerList.push(new heropoert());
    }
}
module.exports = Magic;