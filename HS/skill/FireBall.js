var skill = require("./skill");

class FireBall{
    constructor(){}
    invoke(allayplayer,enemy,target,Array,ID){
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
    }
}
module.exports = FireBall;