require("./card")

class WinTingLee{
    constructor(ID){
        this.cardID = ID;
        this.cost = 1;
        this.originAtk=15;
        this.originDef=15;
        this.cardType="minion";
    }
}
module.exports = WinTingLee;