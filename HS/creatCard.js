var WinTingLee = require("./card/WinTingLee")



const classes = {
    WinTingLee
};
class creatCard{
    constructor(){
        this.cardID =0;
    }
    creat(className) {
        let temp= new classes[className](cardID);
        this.cardID++;
        return temp;
    }
    creatDeck(id){
        let deckList=[];
        if(id==1){
            while(deckList.length<30){
                deckList.push(new classes[className](cardID));
                this.cardID++;
            }
        }
        return deckList;
    }
}
module.exports = creatCard;
