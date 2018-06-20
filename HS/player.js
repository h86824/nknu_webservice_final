var Drainage = require("./action/action.drainage");

class player{
    
    constructor(socket,hero,mydeck){
        this.allayList=[];
        this.cost=0;
        this.playorder = [];
        this.hand=[];
        this.deck=mydeck;
        this.cardNumbers=30;
        this.hero = hero;
        this.drawDamage=0;
        this.socket = socket;
        this.newCost;
    }
    addallayList(card,position){
        if(this.allayList.length<7){
            this.allayList.splice(position,0,card);
            this.playorder.push(card);
            for(let x = 0;x<this.allayList.length;x++){
                console.log("這是場上小兵:"+this.allayList[x].cardID);
            }
            return true;
        }
    }
    
    addhand(card){
        if(this.hand.length<10){
            this.hand.push(card)
            return true;
        }
        else{
            return false;
        }
    }
    minushand(card){
        if(this.hand.length>0){
            for(let i=0;i<this.hand.length;i++){
                if(this.hand[i].cardID==card.cardID){
                    this.hand.splice(i,1);
                    return true;
                }
            }

        }
    }
    draw(numbers,enemy){
        let temp=[];
        let returnNumber = numbers;
        console.log(this.socket);
        console.log(enemy);
        for(let c = 0;c<numbers;c++){
            if(this.cardNumbers>0){
                let ramdomInt = Math.floor(Math.random()*this.cardNumbers);
                if(this.deck[ramdomInt]!=null){
                    temp.push(this.deck[ramdomInt]);
                    this.addhand(this.deck[ramdomInt]);
                    this.cardNumbers--;
                    this.deck[ramdomInt]=this.deck[this.cardNumbers];

                }
                else{
                    temp = [];
                }
            }
            else{
                returnNumber=0;
                temp=[];
                this.hero.originDef-=drawDamage;
                drawDamage++;
            }
        }
        this.socket.emit("match" , new Drainage(this.actionCount++,this.socket,{cards:temp,number:returnNumber,rc:this.cardNumbers}));
        enemy.emit("match", new Drainage(this.actionCount++ ,this.socket , {cards:[],number:numbers,rc:this.cardNumbers}));
    }
    discard(card,position){
        for(let i=0;i<this.hand.length;i++){
            if(this.hand[i].cardID==card){
                let temp1 = this.hand[i];
                if(temp1.cost<=this.newCost){
                    this.newCost-=temp1.cost;
                    if(temp1.cardType=="minion"){
                        this.minushand(temp1);
                        this.addallayList(temp1,position);
                        console.log("卡片"+temp1.cardID);
                        return {"card":temp1,"crystal":this.newCost,"position":position};
                    }
                    else if(temp.cardType=="spell"){
                        this.minushand(i);
                        return {"card":temp1,"crystal":this.newCost};
                    }
                }
                else{
                    return {"card":null,"crystal":this.cost};
                }
            }
        }
    }
    getMinion(card){
        if(this.hero.cardID==card){
            return this.hero;
        }
        else{
            for(let i=0;i<this.allayList.length;i++){
                if(this.allayList[i].cardID==card){
                    return this.allayList[i];
                }
            }
        }
    }
    herodead(){
        if(this.hero.newDef<=0){
            return true;
        }
        else{
            return false;
        }
    }
    deadyet(){
        let i;
        let deadArr = [];
        for(i=0;i<this.playorder.length;i++){
            if(this.playorder[i].newDef<=0){
                console.log(this.playorder[i].cardID+"死了");
                deadArr.push(this.playorder[i]);
                let tempindex =this.allayList.indexOf(this.playorder[i]);
                this.playorder.splice(i,1);
                this.allayList.splice(tempindex,1);
                console.log(this.allayList);
                
             }
        }
        return deadArr;
    }
    /*getdeck(mydeck){
        mydeck.forEach(element => {
            this.deck.push(element);
        });
    }*/
}
module.exports = player;