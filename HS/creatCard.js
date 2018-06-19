var WinTingLee = require("./card/WinTingLee");
var CPH = require("./card/CPH");
var GAYA = require("./card/GAYA");
var Magic = require("./card/card.magic");
var JianAn = require("./card/JianAn");
var JiungHan = require("./card/JiungHan");
var Justin = require("./card/Justin");
var Kuo = require("./card/Kuo");
var Lily = require("./card/Lily");
var LiWei = require("./card/LiWei");

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
            for(let i=0;i<10;i++){
                deckList.push(new GAYA(this.cardID));
                this.cardID++;
            }
            for(let j=0;j<10;j++){
                deckList.push(new WinTingLee(this.cardID));
                this.cardID++;
            }
            for(let k=0;k<10;k++){
                deckList.push(new CPH(this.cardID));
                this.cardID++;
            }
            
        }
        return deckList;
    }
}
module.exports = creatCard;
