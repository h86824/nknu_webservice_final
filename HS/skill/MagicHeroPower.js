var skill = require("./skill");

class MagicHeroPower{
    constructor(){}
    invoke(allayplayer,enemy,target,Array,ID){
        if(allayplayer.newCost>=2){
            if(target==null){
                let temp=[];
                temp.push(enemy.hero);
                for(let i=0;i<enemy.allayList.length;i++){
                     temp.push(enemy.allayList[i]);
                }
                let ramdom = Math.floor(Math.random()* temp.length);
                if(temp[ramdom]!=undefined){
                    temp[ramdom].newDef-=6;
                    Array.push(temp[ramdom]);
                }
            }
            else{
                let targetCard = enemy.getMinion(target);
                if(targetCard==undefined){
                    targetCard=allayplayer.getMinion(target);
                }
                targetCard.newDef-=1;
                Array.push(targetCard);
            }
            allayplayer.newCost-=2;
        }
    }
}
module.exports = MagicHeroPower;