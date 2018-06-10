class card {
    
    constructor (classes,cost,armor,originAtk,originDef,cardType){
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

    battleCry(bf){
        this.beforeAtkList.forEach(bci =>{
            bci.invoke(bf,target);
        })
    }
    reiki(bf){
        this.beforeAtkList.forEach(ri =>{
            bci.invoke(bf,target);
        })
    }
    afterAtk(bf){
        this.beforeAtkList.forEach( aTi => {
            attr.invoke(bf,target);
        })
    }
    beforeAtk(bf){
        this.beforeAtkList.forEach( attr => {
            attr.invoke(bf,target);
        })
    }
    Deathrattle(bf){
        this.DeathrattleList.forEach(dri=>{
            dri.invoke(bf,target);
        })
    }
    endTurn(bf){
        this.endTurnList.forEach(eti=>{
            dri.invoke(bf,target);
        })
    }
    beginTurn(bf){
        this.beginTurnList.forEach(bti=>{
            dri.invoke(bf,target);
        })
    }
    heroPower(bf){
        this.heroPowerList.forEach(hp=>{
            hp.invoke(bf,target);
        })
    }
}
module.exports = card;