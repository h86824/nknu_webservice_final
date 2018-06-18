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
        actionCard.attack(targetCard);
        attArr.push(actionCard);
        attArr.push(targetCard);
        //actionCard.afterAtk(this,targetCard,attArr);
        return {"cards":attArr};
    }
    BattlecryInvoke(player,card,target){
        let actionCard =player.getMinion (card);
        let targetCard = this.player1.getMinion(target);
        let BattleArr = [];
        if(targetCard==null){
            targetCard = this.player2.getMinion(target);
        }
        actionCard.battleCry(this,targetCard,BattleArr);
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