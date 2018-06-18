var WinTingLee = require("./card/WinTingLee");

    

class creatCard{
    constructor(){
        this.cardID =0;
    }
    creat(str) {
        let temp;
        switch(str){
            case 'WinTingLee':
                temp = new WinTingLee(this.cardID);
                this.cardID++;
        }
        return temp
    }
    creatDeck(id){
        let deckList=[];
        if(id==1){
            while(deckList.length<30){
                deckList.push(new WinTingLee(this.cardID));
                this.cardID++;
            }
        }
        return deckList;
    }
}
module.exports = creatCard;
