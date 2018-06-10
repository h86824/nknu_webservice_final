class battleField {
    constructor (){
        this.player1;
        this.player2;

        
    }
    addplayer1List(card,position){
        if(this.player1List[position]==null){
            this.player1List[position]=card;
            return true;
        }
        else if(this.player1List.length==7){
            return false;
        }
       
    }
    addplayer2List(card,position){
        this.player2List[position] = card;
    }

}