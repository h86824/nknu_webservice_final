class battleField {
    constructor (player1,player2){
        this.player1=player1;
        this.player2=player2;
    }
    Endyet(){
        if(player1.herodead()){
            return [player2,player1];
        }
        else if(player2.herodead()){
            return [player1,player2];
        }
        else{
            return false;
        }
    }
    getplayerMinion(currentplayer,position){
        let tempArr1 = currentplayer.allayList;
        return tempArr1[position];
    }
    getplayer(currentplayer){
        return currentplayer.hero;
    }

    attackInvoke(player,opponent,card,target){
        let actionCard = player.getMinion(card);
        let targetCard = opponent.getMinion(target);
        let attArr = [];
        //actionCard.beforeAtk(this,targetCard,attArr);
        console.log("發動攻擊的卡:"+actionCard.cardID);
        if(actionCard!=undefined){
            if(actionCard.attack(targetCard)){
                attArr.push(actionCard);
                attArr.push(targetCard);
                if(actionCard.newDef<=0){
                    let cardtemp = player.allayList.indexOf(actionCard);
                    player.allayList.splice(cardtemp,1);
                }
                if(targetCard.newDef<=0){
                    let cardtemp2 = opponent.allayList.indexOf(targetCard);
                    opponent.allayList.splice(cardtemp2,1);
                }
            }
        }
        //actionCard.afterAtk(this,targetCard,attArr);
        return {"cards":attArr};
    }
    isWin(){
        if(this.player1.hero.newDef<=0){
            console.log("結束了");
            return this.player1.socket;
        }
        else if(this.player2.hero.newDef<=0){
            console.log("結束了");
            return this.player2.socket;
        }
        else{
            console.log("沒結束 A:"+this.player1.hero.newDef+"，B:"+this.player2.hero.newDef);
            return "";
        }
    }
    BattlecryInvoke(allayplayer,enemy,card){
        let actionCard =player.getMinion (card);
        let BattleArr = [];
        actionCard.battleCry(allayplayer,enemy,null,BattleArr);
        return {"cards":BattleArr};
    }
    DeathrattleInvoke(){
        let deadList1 = this.player1.deadyet();
        let deadList2 = this.player2.deadyet();
        let DeathArr = [];
        if(deadList1.length>0){
            let i;
            for(i=0;i<deadList1.length;i++){
                deadList1[i].Deathrattle(this,null,DeathArr);
            }
        }
        if(deadList2.length>0){
            let j;
            for(j=0;j<deadList2.length;j++){
                deadList2[j].Deathrattle(this,null,DeathArr);
            }
        }
        return {"cards":DeathArr};
    }
    HeropowerInvoke(player,target){
        player.hero.heroPower(this,target);
    }
    EndTurnInvoke(player){
        let endArr = [];
        for(let i=0;i<player.playorder.length;i++){
            player.playorder[i].endTurn(this,null,endArr);
        }
        return {"cards":endArr};
    }
    BeginTurnInvoke(player){
        let i;
        let StartArr = [];
        for(i=0;i<player.playorder.length;i++){
            player.playorder[i].beginTurn(this,null,StartArr);
        }
        return {"cards":StartArr};
    }
}


module.exports = battleField;