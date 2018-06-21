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
var Maple = require("./card/Maple");
var Poo = require("./card/Poo");
var Yee = require("./card/Yee");
var Yo = require("./card/Yo");
var YYT = require("./card/YYT");
var CCLin = require("./card/CCLin");
var DaMing = require("./card/DaMing");
var DyMing = require("./card/DyMing");
var Flower = require("./card/Flower");
var Ahri = require("./card/Ahri");
var Annie = require("./card/Annie");
var Ashe = require("./card/Ashe");
var Azir = require("./card/Azir");
var Blitzcrank = require("./card//Blitzcrank");
var Braum = require("./card/Braum");
var Caitlyn = require("./card/Caitlyn");
var HauShiang = require("./card/HauShiang");
var FireBall = require("./card/FireBall");

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
            for(let i=0;i<2;i++){
                deckList.push(new CPH(this.cardID));
                this.cardID++;
            }
            for(let j=0;j<2;j++){
                deckList.push(new WinTingLee(this.cardID));
                this.cardID++;
            }
            for(let k=0;k<2;k++){
                deckList.push(new CPH(this.cardID));
                this.cardID++;
            }
            for(let i =0;i<2;i++){
                deckList.push(new JianAn(this.cardID));
                this.cardID++;
            }
            for(let j=0;j<2;j++){
                deckList.push(new JiungHan(this.cardID));
                this.cardID++;
            }
            for(let j=0;j<2;j++){
                deckList.push(new Justin(this.cardID));
                this.cardID++;
            }
            for(let j=0;j<2;j++){
                deckList.push(new FireBall(this.cardID));
                this.cardID++;
            }
            for(let j=0;j<2;j++){
                deckList.push(new Lily(this.cardID));
                this.cardID++;
            }
            for(let j=0;j<2;j++){
                deckList.push(new LiWei(this.cardID));
                this.cardID++;
            }
            for(let j=0;j<2;j++){
                deckList.push(new FireBall(this.cardID));
                this.cardID++;
            }
            for(let j=0;j<2;j++){
                deckList.push(new Poo(this.cardID));
                this.cardID++;
            }
            for(let j=0;j<2;j++){
                deckList.push(new Flower(this.cardID));
                this.cardID++;
            }
            for(let j=0;j<2;j++){
                deckList.push(new Yo(this.cardID));
                this.cardID++;
            }
            for(let j=0;j<2;j++){
                deckList.push(new Ahri(this.cardID));
                this.cardID++;
            }
            for(let j=0;j<2;j++){
                deckList.push(new CCLin(this.cardID));
                this.cardID++;
            }
        }
        else if(id==2){
            for(let i=0;i<2;i++){
                deckList.push(new CPH(this.cardID));
                this.cardID++;
            }
            for(let j=0;j<2;j++){
                deckList.push(new WinTingLee(this.cardID));
                this.cardID++;
            }
            for(let k=0;k<2;k++){
                deckList.push(new DaMing(this.cardID));
                this.cardID++;
            }
            for(let i =0;i<2;i++){
                deckList.push(new JianAn(this.cardID));
                this.cardID++;
            }
            for(let j=0;j<2;j++){
                deckList.push(new JiungHan(this.cardID));
                this.cardID++;
            }
            for(let j=0;j<2;j++){
                deckList.push(new Justin(this.cardID));
                this.cardID++;
            }
            for(let j=0;j<2;j++){
                deckList.push(new FireBall(this.cardID));
                this.cardID++;
            }
            for(let j=0;j<2;j++){
                deckList.push(new Caitlyn(this.cardID));
                this.cardID++;
            }
            for(let j=0;j<2;j++){
                deckList.push(new Azir(this.cardID));
                this.cardID++;
            }
            for(let j=0;j<2;j++){
                deckList.push(new Maple(this.cardID));
                this.cardID++;
            }
            for(let j=0;j<2;j++){
                deckList.push(new Poo(this.cardID));
                this.cardID++;
            }
            for(let j=0;j<2;j++){
                deckList.push(new Blitzcrank(this.cardID));
                this.cardID++;
            }
            for(let j=0;j<2;j++){
                deckList.push(new FireBall(this.cardID));
                this.cardID++;
            }
            for(let j=0;j<2;j++){
                deckList.push(new YYT(this.cardID));
                this.cardID++;
            }
            for(let j=0;j<1;j++){
                deckList.push(new Annie(this.cardID));
                this.cardID++;
            }
            for(let j=0;j<1;j++){
                deckList.push(new HauShiang(this.cardID));
                this.cardID++;
            }
        }
        return deckList;
    }
}
module.exports = creatCard;
