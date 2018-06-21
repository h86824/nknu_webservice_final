class Lily_BattleCry{
    constructor(){}
    invoke(allayplayer,enemy,target,Array,ID){
        if(target==null){
            let isTrue=false;
            for(let i =0;i<allayplayer.hand.length;i++){
                    if(allayplayer.hand[i].race == "教授"){
                        isTrue=true;
                    }
            }
            if(isTrue){
                let temp = allayplayer.getMinion(ID);
                temp.newAtk+=4;
                temp.newDef+=1;
                temp.attackable=true;
                Array.push(temp);
            }
        }
    }
}
module.exports = Lily_BattleCry;