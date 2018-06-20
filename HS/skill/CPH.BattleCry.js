var skill = require("./skill");

class CPH_battleCry{
    constructor(){}
    invoke(allayplayer,enemy,target,Array){
        if(target==null){
            let ramdom = Math.floor(Math.random()* enemy.allayList.length);
            console.log(enemy.allayList.length);
            if(enemy.allayList[ramdom]!=undefined){
                enemy.allayList[ramdom].newDef-=8;
                Array.push(enemy.allayList[ramdom]);
            }
        }
    }
}
module.exports = CPH_battleCry;