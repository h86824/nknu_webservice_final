
this.HS = this.HS || {};

(function(){
    let deckArray = [
        {id: 1 ,name:"預設牌組1" , cover:"DeckCover0"} , 
        {id: 2 ,name:"預設牌組2" , cover:"DeckCover1"} , 
        /*{name:"預設牌組3" , cover:"DeckCover1"}*/];
    let _index = 0;

    function Deck(){
        createjs.Container.call(this);
        var deckCurrent = new createjs.Shape();
        deckCurrent.alpha = 0.99;
        let alpha = 0.35;

        var deckNext = new createjs.Shape();
        deckNext.graphics.beginFill("#000").drawCircle(0 , 0 , HS.Global.deckWidth * 0.9);
        deckNext.x = HS.Global.deckWidth * 1.3;
        deckNext.alpha = alpha;
        deckNext.addEventListener("click" , () => this.change(this.getNextIndex()));

        var deckPrevious = new createjs.Shape();
        deckPrevious.graphics.beginFill("#FFF").drawCircle(0 , 0 , HS.Global.deckWidth * 0.9);
        deckPrevious.x = - HS.Global.deckWidth * 1.3;
        deckPrevious.alpha = alpha;
        deckPrevious.addEventListener("click" , () => this.change(this.getPreviousIndex()));
        
        this.deckText = new createjs.Text("", HS.Global.TextFontVeryLarge, "#FFF");
        this.deckText.set({
            textAlign:"center",
            x: HS.Global.deckWidth * 0 ,
            y: HS.Global.deckHeight * 0.9
        });
        this.deckTextOutline = new createjs.Text("", HS.Global.TextFontVeryLarge, "#20120c");
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
            y: HS.Global.deckHeight * 0.9,
            alpha:alpha
        });
        this.deckTextNextOutline = new createjs.Text("", HS.Global.TextFontLarge, "#20120c");
        this.deckTextNextOutline.set({
            textAlign:"center",
            x: HS.Global.deckWidth * 1.3 ,
            y: HS.Global.deckHeight * 0.9,
            outline:HS.Global.outline,
            alpha:alpha
        });

        this.deckTextPrevious = new createjs.Text("", HS.Global.TextFontLarge, "#FFF");
        this.deckTextPrevious.set({
            textAlign:"center",
            x: HS.Global.deckWidth * -1.3 ,
            y: HS.Global.deckHeight * 0.9,
            alpha:alpha
        });
        this.deckTextPreviousOutline = new createjs.Text("", HS.Global.TextFontLarge, "#20120c");
        this.deckTextPreviousOutline.set({
            textAlign:"center",
            x: HS.Global.deckWidth * -1.3 ,
            y: HS.Global.deckHeight * 0.9,
            outline:HS.Global.outline,
            alpha:alpha
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
            this.deckText.text = this.deckTextOutline.text = deckArray[_index].name;
            this.deckTextPrevious.text = this.deckTextPreviousOutline.text = deckArray[this.getPreviousIndex()].name;
            this.deckTextNext.text = this.deckTextNextOutline.text = deckArray[this.getNextIndex()].name;

            showCover(deckNext , deckArray[this.getNextIndex()] , 1);
            showCover(deckPrevious , deckArray[this.getPreviousIndex()] , 1);
            showCover(deckCurrent , deckArray[_index] , 1.2);
        }
        this.getNextIndex = () => {
            return  (_index + 1) % deckArray.length;
        }
        this.getPreviousIndex = () => {
            return _index - 1 < 0 ? deckArray.length - 1 : _index - 1;
        }
        this.change(0);

        function showCover(target , deck , rate){
            
            let image = HS.Global.Source.getResult(deck.cover);
            if(image){
                image.scaleX =  image.width / HS.Global.deckWidth ;
                image.scaleY =  image.height  / HS.Global.deckWidth ;
                target.graphics.clear().beginBitmapFill(image , "no-repeat" , new createjs.Matrix2D(image.scaleX,0,0,image.scaleY,-image.width/2*image.scaleX,-image.height/2*image.scaleY)).drawCircle(0 , 0 , HS.Global.deckWidth * rate );
            }else{
                target.graphics.clear().beginFill("orange").drawCircle(0 , 0 , HS.Global.deckWidth );
            }
        }

        this.getSelected = () => {
            return deckArray[_index];
        }
    }

    

    extend(Deck , createjs.Container);
    HS.Deck = Deck;
}());