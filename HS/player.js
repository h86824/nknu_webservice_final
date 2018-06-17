
class player{
    
    constructor(socket,hero,mydeck){
        this.allayList=[7];
        this.playorder = [7];
        this.hand=[10];
        this.deck=mydeck;
        this.cardNumbers=30;
        this.hero = hero;
        this.drawDamage;
        this.socket = socket;
    }
    get allayList(){
        return this.addallayList;
    }
    get hero(){
        return hero;
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
            let i;
            for(i=0;i<hand.length;i++){
                if(hand[i].cardID==card){
                    this.hand.splice(i,1);
                    return true;
                }
            }

        }
    }
    draw(){
        if(deck.length>0){
            let ramdomInt = Math.floor(Math.random()*cardNumbers);
            this.addhand(this.deck[ramdomInt]);
            this.cardNumbers--;
            this.deck[ramdomInt]=this.deck[this.cardNumbers];
        }
        else{
            this.hero.originDef-=drawDamage;
            drawDamage++;
        }
    }
    discard(card,position){
        let i;
        for(i=0;i<hand.length;i++){
            if(hand[i].cardID==card){
                let temp = this.hand[i];
                if(temp.cardType=="minion"){
                    this.minushand(i);
                    this.addallayList(temp,position);
                    return true;
                }
                else if(temp.cardType=="spell"){
                    this.minushand(i);
                    return true;
                }
                else{
                    return false;
                }
            }
        }
    }
    getMinion(card){
        let i;
        for(i=0;i<allayList.length;i++){
            if(this.allayList[i].cardID==card){
                this.addallayList.splice(i,1);
                return this.addallayList[i];
            }
            else if(this.hero.cardID==card){
                return this.hero;
            }
            else{
                return null;
            }
        }

    }
    deadyet(){
        let i;
        let deadArr = [];
        for(i=0;i<this.playorder.length;i++){
            if(this.playorder[i].newDef<=0){
                deadArr.push(this.playorder[i]);
                let j;
                for(j=0;j<this.allayList.length;j++){
                    if(this.allayList[j]===this.playorder[i]){
                        this.allayList.splice(j,1);
                    }
                }
                this.playorder.splice(i,1);
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