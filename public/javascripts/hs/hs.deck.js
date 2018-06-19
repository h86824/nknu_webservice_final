
this.HS = this.HS || {};

(function(){
    let deckArray = ["預設牌組1" , "預設牌組2" , "預設牌組3"];
    let _index = 0;

    function Deck(){
        createjs.Container.call(this);
        var deckCurrent = new createjs.Shape();
        deckCurrent.graphics.beginFill("orange").drawCircle(0 , 0 , HS.Global.deckWidth * 0.9);

        var deckNext = new createjs.Shape();
        deckNext.graphics.beginFill("#000").drawCircle(0 , 0 , HS.Global.deckWidth * 0.9);
        deckNext.x = HS.Global.deckWidth * 1.3;
        deckNext.alpha = 0.7;
        deckNext.addEventListener("click" , () => this.change(this.getNextIndex()));

        var deckPrevious = new createjs.Shape();
        deckPrevious.graphics.beginFill("#FFF").drawCircle(0 , 0 , HS.Global.deckWidth * 0.9);
        deckPrevious.x = - HS.Global.deckWidth * 1.3;
        deckPrevious.alpha = 0.7;
        deckPrevious.addEventListener("click" , () => this.change(this.getPreviousIndex()));
        
        this.deckText = new createjs.Text("", HS.Global.TextFontLarge, "#FFF");
        this.deckText.set({
            textAlign:"center",
            x: HS.Global.deckWidth * 0 ,
            y: HS.Global.deckHeight * 0.9
        });
        this.deckTextOutline = new createjs.Text("", HS.Global.TextFontLarge, "#20120c");
        this.deckTextOutline.set({
            textAlign:"center",
            x: HS.Global.deckWidth * 0 ,
            y: HS.Global.deckHeight * 0.9,
            outline:HS.Global.outline,
        });

        this.deckTextNext = new createjs.Text("", HS.Global.TextFontLarge, "#FFF");
        this.deckTextNext.set({
            textAlign:"center",
            x: HS.Global.deckWidth * 1.3 ,
            y: HS.Global.deckHeight * 0.9
        });
        this.deckTextNextOutline = new createjs.Text("", HS.Global.TextFontLarge, "#20120c");
        this.deckTextNextOutline.set({
            textAlign:"center",
            x: HS.Global.deckWidth * 1.3 ,
            y: HS.Global.deckHeight * 0.9,
            outline:HS.Global.outline,
        });

        this.deckTextPrevious = new createjs.Text("", HS.Global.TextFontLarge, "#FFF");
        this.deckTextPrevious.set({
            textAlign:"center",
            x: HS.Global.deckWidth * -1.3 ,
            y: HS.Global.deckHeight * 0.9
        });
        this.deckTextPreviousOutline = new createjs.Text("", HS.Global.TextFontLarge, "#20120c");
        this.deckTextPreviousOutline.set({
            textAlign:"center",
            x: HS.Global.deckWidth * -1.3 ,
            y: HS.Global.deckHeight * 0.9,
            outline:HS.Global.outline,
        });

        this.addChild(deckNext);
        this.addChild(deckPrevious);
        this.addChild(deckCurrent);
        this.addChild(this.deckTextOutline);
        this.addChild(this.deckText);
        this.addChild(this.deckTextNextOutline);
        this.addChild(this.deckTextNext);
        this.addChild(this.deckTextPreviousOutline);
        this.addChild(this.deckTextPrevious);
        
        this.change = (index) => {
            _index = index;
            this.deckText.text = this.deckTextOutline.text = deckArray[_index];
            this.deckTextPrevious.text = this.deckTextPreviousOutline.text = deckArray[this.getPreviousIndex()];
            this.deckTextNext.text = this.deckTextNextOutline.text = deckArray[this.getNextIndex()];
        }
        this.getNextIndex = () => {
            return  (_index + 1) % deckArray.length;
        }
        this.getPreviousIndex = () => {
            return _index - 1 < 0 ? deckArray.length - 1 : _index - 1;
        }
        this.change(0);
    }

    

    extend(Deck , createjs.Container);
    HS.Deck = Deck;
}());