class card {
    
    constructor (ID,classes,cost,armor,originAtk,originDef,cardType){
        this.cardID = ID;
        this.classes = classes;
        this.cost = cost;
        this.armor = armor;
        this.originAtk = originAtk;
        this.originDef = originDef;
        this.cardType = cardType;
        this.race = race;
        this.attackable = false;
        this.beforeAtkList = [];
        this.afterAtkList = [];
        this.ReikiList = [];
        this.battlecayList = [];
        this.DeathrattleList = [];
        this.endTurnList = [];
        this.beginTurnList = [];
        this.heroPowerList = [];
    }

    battleCry(target){
        this.beforeAtkList.forEach(bci =>{
            bci.invoke(target);
        })
    }
    reiki(target){
        this.beforeAtkList.forEach(ri =>{
            bci.invoke(target);
        })
    }
    afterAtk(target){
        this.beforeAtkList.forEach( aTi => {
            attr.invoke(target);
        })
    }
    beforeAtk(target){
        this.beforeAtkList.forEach( attr => {
            attr.invoke(target);
        })
    }
    Deathrattle(target){
        this.DeathrattleList.forEach(dri=>{
            dri.invoke(target);
        })
    }
    endTurn(target){
        this.endTurnList.forEach(eti=>{
            dri.invoke(target);
        })
    }
    beginTurn(target){
        this.beginTurnList.forEach(bti=>{
            bti.invoke(target);
        })
    }
    heroPower(target){
        this.heroPowerList.forEach(hp=>{
            hp.invoke(target);
        })
    }
}
module.exports = card;