
class player{
    
    constructor(socket,hero,mydeck){
        this.allayList=[];
        this.cost=0;
        this.playorder = [];
        this.hand=[];
        this.deck=mydeck;
        this.cardNumbers=30;
        this.hero = hero;
        this.drawDamage;
        this.socket = socket;
        this.newCost;
    }
    addallayList(card,position){
        if(this.allayList.length<7){
            this.allayList.splice(position,0,card);
            this.playorder.push(card);
            return true;
        }
        else{
            return false;
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
    draw(numbers){
        let temp=[];
        for(let c = 0;c<numbers;c++){
            if(this.cardNumbers>0){
                let ramdomInt = Math.floor(Math.random()*this.cardNumbers);
                temp.push(this.deck[ramdomInt]);
                this.addhand(temp);
                this.deck[ramdomInt]=this.deck[this.cardNumbers];
                this.cardNumbers--;
            }
            else{
                this.hero.originDef-=drawDamage;
                drawDamage++;
            }
        }
        return {cards:temp,number:numbers};
    }
    discard(card,position){
        for(let i=0;i<this.hand.length;i++){
            if(this.hand[i].cardID==card){
                let temp = this.hand[i];
                if(temp.cost<=this.newCost){
                    this.newCost-=temp.cost;
                    
                    if(temp.cardType=="minion"){
                        this.minushand(temp);
                        this.addallayList(temp,position);
                        return {"cards":temp,"crystal":this.newCost,"position":position};
                    }
                    else if(temp.cardType=="spell"){
                        this.minushand(i);
                        return {"cards":temp,"crystal":this.newCost};
                    }
                    else{
                        return {"cards":null,"crystal":this.cost};
                    }
                }
            }
        }
    }
    getMinion(card){
        for(let i=0;i<this.allayList.length;i++){
            if(this.allayList[i].cardID==card){
                return this.allayList[i];
            }
            else if(this.hero.cardID==card){
                return this.hero;
            }
            else{
                return {};
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
                deadArr.push(this.playorder[i]);
             }
        }
        this.playorder.splice(i,1);
        let tempindex =this.playersList.indexOf(this.playorder[i]);
        this.allayList.splice(tempindex,1);
        return deadArr;
    }
    /*getdeck(mydeck){
        mydeck.forEach(element => {
            this.deck.push(element);
        });
    }*/
}
module.exports = player;