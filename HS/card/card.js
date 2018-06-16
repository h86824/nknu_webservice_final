class card {
    
    constructor (ID){
        this.cardID = ID;
        this.classes;
        this.cost;
        this.armor ;
        this.originAtk;
        this.originDef;
        this.newAtk=originAtk;
        this.newDef= originDef;
        this.StatusList = [];
        this.cardType;
        this.race;
        this.attackable = false;
        this.beforeAtkList = [];
        this.afterAtkList = [];
        this.ReikiList = [];
        this.battlecayList = [];
        this.DeathrattleList = [];
        this.endTurnList = [];
        this.beginTurnList = [];
        this.heroPowerList=[];
    }
    attack(target){
        if(this.attackable){        
            if(!this.DividShield){
                this.newDef-=target.newAtk;
                target.newDef-=this.newAtk;
            }
            else{
                target.newDef-=this.newAtk;
            }
        }
        else{
             return false;
        }
    }
    battleCry(bf,target){
        this.beforeAtkList.forEach(bci =>{
            bci.invoke(bf,target);
        })
    }
    reiki(bf,target){
        this.beforeAtkList.forEach(ri =>{
            bci.invoke(bf,target);
        })
    }
    afterAtk(bf,target){
        this.beforeAtkList.forEach( aTi => {
            attr.invoke(bf,target);
        })
    }
    beforeAtk(bf,target){
        this.beforeAtkList.forEach( attr => {
            attr.invoke(bf,target);
        })
    }
    Deathrattle(bf,target){
        this.DeathrattleList.forEach(dri=>{
            dri.invoke(bf,target);
        })
    }
    endTurn(bf,target){
        this.endTurnList.forEach(eti=>{
            dri.invoke(bf,target);
        })
    }
    beginTurn(bf,target){
        this.beginTurnList.forEach(bti=>{
            bti.invoke(bf,target);
        })
    }
    heroPower(bf,target){
        this.heroPowerList.forEach(hp=>{
            hp.invoke(bf,target);
        })
    }
}
module.exports = card;