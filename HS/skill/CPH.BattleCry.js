var skill = require("./skill");

class CPH_battleCry{
    constructor(){}
    invoke(allayplayer,enemy,target,Array){
        this.BF = bf;
        this.Target = target;
        this.ResultArr = Array;
        this.allay = allayplayer;
        this.enemy = enemy;
        if(target==null){
            let ramdom = Math.floor(Math.random()* this.enemy.allayList.lenght);
            this.enemy.allayList[ramdom].newDef-=87;
            this.ResultArr.push(this.enemy.allayList[ramdom]);
        }
        

    }
}
module.exports = CPH_battleCry;