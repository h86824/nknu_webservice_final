
this.HS = this.HS || {};

(function(){

    function BattleArea(){
        createjs.Container.call(this);
        
        this.cards = [];
        let graphics = new createjs.Graphics().beginFill("#D1C4E9").drawRect(0, 0, HS.Global.battleFieldWidth , HS.Global.battleAreaHeight);
        let background = new createjs.Shape(graphics);

        this.addChild(background);
    }

    BattleArea.prototype = {
        cards: undefined,
        addCard: addCard,
        relocate: relocate,
        getInsertIndex: getInsertIndex,
        removeCard: removeCard,
    }

    function addCard(item , index){
        if(! item instanceof HS.Card){
            throw HS.Error.TypeError("HS.Card" , "item");
        }
        
        this.cards.splice(index , 0 , item);
        
        this.addChild(item);
        this.relocate();
    }

    function removeCard(item){
        let index = -1;

        for(let i = 0 ; i < this.cards.length ; i++){
            if(this.cards[i].information.id === item.information.id){
                index = i;
                this.cards.splice(index , 1);
                HS.Anime.disappear(item , () => {
                    this.removeChild(item);
                });
                this.relocate();
                return true;
            }
        }
        return false;

    }

    function relocate( blankX ){
        if(!blankX){
            let startX = HS.Global.battleAreaCardDistance * ( (10 - this.cards.length) / 2);

            for(let i = 0 ; i < this.cards.length ; i++){
                this.cards[i].x = startX + HS.Global.battleAreaCardDistance * i + 10;
                this.cards[i].y = 10;
            }
            return;
        }

        let startX = HS.Global.battleAreaCardDistance * ( (10 - this.cards.length) / 2);
        
        let threshMin = 0;
        let threshMax = startX;
        if(this.cards.length){
            threshMin = this.cards[0].getStageX();
            threshMax = this.cards[this.cards.length-1].getStageX();
        }

        if( blankX > threshMin && blankX < threshMax){
            for(let i = 0 ; i < this.cards.length ; i++){
                if(blankX < this.cards[i].getStageX()){
                    this.cards[i].x = startX + HS.Global.battleAreaCardDistance * ( i + 0.35 ) + 10;
                    this.cards[i].y = 10;
                }else{
                    this.cards[i].x = startX + HS.Global.battleAreaCardDistance * ( i - 0.35 ) + 10;
                    this.cards[i].y = 10;
                }
            }
        }else{
            for(let i = 0 ; i < this.cards.length ; i++){
                this.cards[i].x = startX + HS.Global.battleAreaCardDistance * i + 10;
                this.cards[i].y = 10;
            }
        }
        
    }

    function getInsertIndex(stageX){
        let index = 0;
        for(let i = 0 ; i < this.cards.length ; i++){
            if(stageX > this.cards[i].getStageX()){
                index++;
            }else{
                break;
            }
        }
        return index;
    }

    extend(BattleArea , createjs.Container)

    HS.BattleArea = BattleArea;
}())