
this.HS = this.HS || {};

(function(){

    function HandArea(){
        createjs.Container.call(this);
        
        this.cards = [];
        let graphics = new createjs.Graphics().beginFill("#D1C4E9").drawRect(0, 0, HS.Global.battleFieldWidth , HS.Global.handAreaHeight);
        let background = new createjs.Shape(graphics);

        this.addChild(background);
    }

    HandArea.prototype = {
        cards: undefined,
        addCard: addCard,
        removeCard: removeCard,
        relocate: relocate,
    }

    function addCard(item){
        if(! item instanceof HS.Card){
            throw HS.Error.TypeError("HS.Card" , "item");
        }
        this.addChild(item);
        this.cards.push(item);

        this.relocate();
    }

    function removeCard(item){
        let index = -1;

        for(let i = 0 ; i < this.cards.length ; i++){
            if(this.cards[i].id === item.id){
                index = i;
                break;
            }
        }
        this.cards.splice(index , 1);

        this.relocate();
    }

    function relocate(){
        for(let i = 0 ; i < this.cards.length ; i++){
            this.cards[i].x = HS.Global.handCardDistance * i + 10;
            this.cards[i].y = 10;
        }
    }

    extend(HandArea , createjs.Container)

    HS.HandArea = HandArea;
}())