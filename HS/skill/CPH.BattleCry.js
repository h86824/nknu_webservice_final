var skill = require("./skill");

class CPH_battleCry{
    constructor(){}
    invoke(allayplayer,enemy,target,Array,ID){
        if(target==null){
            if( enemy.allayList.length>0){
                let ramdom = Math.floor(Math.random()* enemy.allayList.length);
            
                console.log("對手手下樹目"+enemy.allayList.length);
                console.log("隨機數字"+ramdom);
                console.log("目標"+enemy.allayList[ramdom].cardID+"血量:"+enemy.allayList[ramdom].newDef);
                if(enemy.allayList[ramdom]!=undefined){
                    enemy.allayList[ramdom].newDef-=8;
                    Array.push(enemy.allayList[ramdom]);
                }
            }
        }
    }
}
module.exports = CPH_battleCry;