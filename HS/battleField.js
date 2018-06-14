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
        actionCard.attack(targetCard);
    }
    BattlecryInvoke(player,card,target){
        let actionCard =player.getMinion (card);
        let targetCard = this.player1.getMinion(target);
        if(targetCard==null){
            targetCard = this.player2.getMinion(target);
        }
        actionCard.battleCry(targetCard);
    }
}


module.exports = battleField;