class card {
    
    constructor (ID){
        this.cardID = ID;
		this.name = "";
        this.classes="";
        this.cost=0;
        this.msg="";
        this.armor=0;
        this.originAtk=0;
        this.originDef=0;
        this.newAtk=this.originAtk;
        this.newDef= this.originDef;
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
            this.newDef-=target.newAtk;
            target.newDef-=this.newAtk;
            this.attackable=false;
            return true;
        }
        else{
             return false;
        }
    }
    battleCry(allay,enemy,target,Arr,ID){
        this.battlecayList.forEach(bci =>{
            bci.invoke(allay,enemy,target,Arr,ID);
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
    Deathrattle(allay,enemy,target,Arr,ID){
        this.DeathrattleList.forEach(dri=>{
            dri.invoke(allay,enemy,target,Arr,ID);
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
    heroPower(allay,enemy,target,Arr,ID){
        this.heroPowerList.forEach(hp=>{
            hp.invoke(allay,enemy,target,Arr,ID);
        })
    }
}
module.exports = card;