class card {
    
    constructor (ID){
        this.cardID = ID;
        this.classes="";
        this.cost=0;
        this.armor=0;
        this.originAtk=0;
        this.originDef=0;
        this.newAtk=originAtk;
        this.newDef= originDef;
        this.StatusList = [];
        this.cardType="";
        this.race="";
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
    battleCry(bf,target,Arr){
        this.beforeAtkList.forEach(bci =>{
            bci.invoke(bf,target,Arr);
        })
    }
    reiki(bf,target,Arr){
        this.beforeAtkList.forEach(ri =>{
            bci.invoke(bf,target,Arr);
        })
    }
    afterAtk(bf,target,Arr){
        this.beforeAtkList.forEach( aTi => {
            attr.invoke(bf,target,Arr);
        })
    }
    beforeAtk(bf,target,Arr){
        this.beforeAtkList.forEach( attr => {
            attr.invoke(bf,target,Arr);
        })
    }
    Deathrattle(bf,target,Arr){
        this.DeathrattleList.forEach(dri=>{
            dri.invoke(bf,target,Arr);
        })
    }
    endTurn(bf,target,Arr){
        this.endTurnList.forEach(eti=>{
            dri.invoke(bf,target,Arr);
        })
    }
    beginTurn(bf,target,Arr){
        this.beginTurnList.forEach(bti=>{
            bti.invoke(bf,target,Arr);
        })
    }
    heroPower(bf,target,Arr){
        this.heroPowerList.forEach(hp=>{
            hp.invoke(bf,target,Arr);
        })
    }
}
module.exports = card;