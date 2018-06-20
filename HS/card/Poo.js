var card = require("./card");
var Poo1 = require("../skill/PooBattleCry");


class Poo extends card {
    constructor(ID) {
        super(ID);
        this.name = "大便";
        this.race = "學長";
        this.cost = 8;
        this.originAtk = 6;
        this.originDef = 5;
        this.msg = "戰吼:友方手下改為3攻擊力，敵方手下改為2攻擊力。";
        this.cardType = "minion";
        this.newAtk = this.originAtk;
        this.newDef = this.originDef;
        this.battlecayList.push(new Poo1());
    }
}
module.exports = Poo;