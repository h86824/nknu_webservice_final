var WinTingLee = require("./card/WinTingLee");
var CPH = require("./card/CPH");
var GAYA = require("./card/GAYA");
var Magic = require("./card/card.magic");
    

class creatCard{
    constructor(){
        this.cardID =0;
    }
    creat(str) {
        let temp;
        switch(str){
            case 'WinTingLee':
                temp = new Magic(this.cardID);
                this.cardID++;
                break;
        }
        return temp;
    }
    creatDeck(id){
        let deckList=[];
        if(id==1){
            for(let i=0;i<15;i++){
                deckList.push(new GAYA(this.cardID));
                this.cardID++;
            }
            for(let j=0;j<15;j++){
                deckList.push(new WinTingLee(this.cardID));
                this.cardID++;
            }
            
        }
        return deckList;
    }
}
module.exports = creatCard;
