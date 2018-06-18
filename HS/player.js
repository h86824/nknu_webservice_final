
class player{
    
    constructor(socket,hero,mydeck){
        this.allayList=[7];
        this.cost=0;
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
            let temp =this.deck[ramdomInt];
            this.addhand(temp);
            this.cardNumbers--;
            this.deck[ramdomInt]=this.deck[this.cardNumbers];
            return {"cards":[temp]};
        }
        else{
            this.hero.originDef-=drawDamage;
            drawDamage++;
            return null;
        }
    }
    discard(card,position){
        let i;
        for(i=0;i<hand.length;i++){
            if(hand[i].cardID==card){
                let temp = this.hand[i];
                if(temp.cost<=this.cost){
                    this.cost-=temp.cost;
                    if(temp.cardType=="minion"){
                        this.minushand(i);
                        this.addallayList(temp,position);
                        return {"cards":temp};
                    }
                    else if(temp.cardType=="spell"){
                        this.minushand(i);
                        return {"cards":temp};
                    }
                }
            }
            else{
                return false;
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
    herodead(){
        if(hero.newDef<=0){
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
        let tempindex =playersList.indexOf(this.playorder[i]);
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