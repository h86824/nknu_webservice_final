class battleField {
    constructor (player1,player2){
        this.player1=player1;
        this.player2=player2;
    }
    getplayer1Minion(position){
        let tempArr1 = this.player1.allayList;
        return tempArr1[position];
    }
    getplayer2Minion(position){
        let tempArr2 = this.player2.allayList;
        return tempArr2[position];
    }
    getplay1(){
        return this.player1.hero;
    }
    getplay2(){
        return this.player2.hero;
    }
}