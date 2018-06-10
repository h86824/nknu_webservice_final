
class player{
    
    constructor(hero){
        this.allayList=[];
        this.hand=[];
        this.deck=[30];
        this.cardNumbers=30;
        this.hero = hero;
        this.drawDamage;
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
    minushand(card,position){
        if(this.hand.length>0){
            this.hand.splice(position,1);
            return true;
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
    getdeck(mydeck){
        mydeck.forEach(element => {
            this.deck.push(element);
        });
    }
}