var card = require("./card");
var fire = require("../skill/FireBall");

class Flower extends card {
    constructor(ID) {
        super(ID);
        this.name = "火球術";
        this.race = "法術";
        this.cost = 4;
        this.originAtk = 0;
        this.originDef =0;
        this.cardType = "minion";
        this.newAtk = this.originAtk;
        this.newDef = this.originDef;
        this.battlecayList.push(new fire());
    }
}
module.exports = Flower;