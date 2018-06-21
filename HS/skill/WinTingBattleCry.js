var skill = require("./skill");

class WinTingBattleCry{
    constructor(){}
    invoke(allayplayer,enemy,target,Array,ID){
        if(target==null){
            if( allayplayer.allayList.length>1){
                let ramdom = Math.floor(Math.random()* allayplayer.allayList.length);
                while(allayplayer.allayList[ramdom].cardID ==ID){
                    ramdom=Math.floor(Math.random()* allayplayer.allayList.length);
                }
                console.log("我方手下數量"+allayplayer.allayList.length);
                console.log("隨機數字"+ramdom);
                if(allayplayer.allayList[ramdom]!=undefined){
                    allayplayer.allayList[ramdom].newAtk+=1;
                    Array.push(allayplayer.allayList[ramdom]);
                }
            }
            allayplayer.draw(1,enemy.socket);
        }
    }
}
module.exports = WinTingBattleCry;