
class player{
    
    constructor(socket,hero,mydeck){
        this.allayList=[7];
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
            this.allayList.splice(position,0,card)
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
    discard(card){
        let i;
        for(i=0;i<hand.length;i++){
            if(hand[i].cardID==card){
                let temp = this.hand[i];
                if(temp.cardType=="minion"){
                    this.minushand(i);
                    this.addallayList(temp,i);
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
            if(hand[i].cardID==card){
                return this.addallayList[i];
            }
            else{
                return null;
            }
        }

    }
    /*getdeck(mydeck){
        mydeck.forEach(element => {
            this.deck.push(element);
        });
    }*/
}
module.exports = player;