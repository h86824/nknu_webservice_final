class battleField {
    constructor (player1,player2){
        this.player1=player1;
        this.player2=player2;
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
        actionCard.beforeAtk(this,targetCard);
        actionCard.attack(this,targetCard);
        actionCard.afterAtk(this,targetCard);
    }
    BattlecryInvoke(player,card,target){
        let actionCard =player.getMinion (card);
        let targetCard = this.player1.getMinion(target);
        if(targetCard==null){
            targetCard = this.player2.getMinion(target);
        }
        actionCard.battleCry(this,targetCard);
    }
    DeathrattleInvoke(){
        let deadList1 = this.player1.deadyet();
        let deadList2 = this.player2.deadyet();
        if(deadList1.length>0){
            let i;
            for(i=0;i<deadList1.length;i++){
                deadList1[i].Deathrattle(this,null);
            }
        }
        if(deadList2.length>0){
            let j;
            for(j=0;j<deadList2.length;j++){
                deadList2[j].Deathrattle(this,null);
            }
        }
    }
    HeropowerInvoke(player,target){
        player.hero.heroPower(this,target);
    }
    EndTurnInvoke(player){
        let i;
        for(i=0;i<player.playorder.length;i++){
            player.playorder[i].endTurn(this,null);
        }
    }
    BeginTurnInvoke(player){
        let i;
        for(i=0;i<player.playorder.length;i++){
            player.playorder[i].beginTurn(this,null);
        }
    }
}


module.exports = battleField;