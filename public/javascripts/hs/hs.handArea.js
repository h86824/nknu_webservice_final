
this.HS = this.HS || {};

(function(){
    let _hero;
    function HandArea(){
        createjs.Container.call(this);
        
        this.cards = [];
        let graphics = new createjs.Graphics().beginFill("#B39DDB").drawRect(0, 0, HS.Global.battleFieldWidth , HS.Global.handAreaHeight);
        let background = new createjs.Shape(graphics);


        this.addChild(background);
    }

    HandArea.prototype = {
        cards: undefined,
        addCard: addCard,
        removeCard: removeCard,
        relocate: relocate,
        set hero(value){
            _hero = value;
            value.x = HS.Global.handCardDistance * 5;
            value.y = 0;
            this.addChild(value);
        },
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
                this.cards.splice(index , 1);
                this.relocate();
                return true;
            }
        }
        return false;
    }

    function relocate(){
        for(let i = 0 ; i < this.cards.length ; i++){
            if(i >= 5){
                this.cards[i].x = HS.Global.handCardDistance * (i + 1.5) ;
            }else{
                this.cards[i].x = HS.Global.handCardDistance * i ;
            }
            this.cards[i].y = 0;
        }
    }

    extend(HandArea , createjs.Container)

    HS.HandArea = HandArea;
}())