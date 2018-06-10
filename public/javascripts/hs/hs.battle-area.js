
this.HS = this.HS || {};

(function(){

    function BattleArea(){
        createjs.Container.call(this);
        
        this.cards = [];
        let graphics = new createjs.Graphics().beginFill("#9575CD").drawRect(0, 0, HS.Global.battleFieldWidth , HS.Global.battleAreaHeight);
        let background = new createjs.Shape(graphics);

        this.addChild(background);
    }

    BattleArea.prototype = {
        cards: undefined,
        addCard: addCard,
        relocate: relocate,
    }

    function addCard(item){
        if(! item instanceof HS.Card){
            throw HS.Error.TypeError("HS.Card" , "item");
        }
        console.log(item);
        this.addChild(item);
        this.cards.push(item);

        this.relocate();
    }

    function relocate( blankX ){
        if(!blankX){
            let startX = HS.Global.handCardDistance * ( (10 - this.cards.length) / 2);

            for(let i = 0 ; i < this.cards.length ; i++){
                this.cards[i].x = startX + HS.Global.handCardDistance * i + 10;
                this.cards[i].y = 10;
            }
            return;
        }

        let startX = HS.Global.handCardDistance * ( (10 - this.cards.length) / 2);
        
        let threshMin = 0;
        let threshMax = startX;
        if(this.cards.length){
            threshMin = this.cards[0].getStageX();
            threshMax = this.cards[this.cards.length-1].getStageX();
        }

        if( blankX > threshMin && blankX < threshMax){
            for(let i = 0 ; i < this.cards.length ; i++){
                if(blankX < this.cards[i].getStageX()){
                    this.cards[i].x = startX + HS.Global.handCardDistance * ( i + 0.35 ) + 10;
                    this.cards[i].y = 10;
                }else{
                    this.cards[i].x = startX + HS.Global.handCardDistance * ( i - 0.35 ) + 10;
                    this.cards[i].y = 10;
                }
            }
        }else{
            for(let i = 0 ; i < this.cards.length ; i++){
                this.cards[i].x = startX + HS.Global.handCardDistance * i + 10;
                this.cards[i].y = 10;
            }
        }
        
    }

    extend(BattleArea , createjs.Container)

    HS.BattleArea = BattleArea;
}())