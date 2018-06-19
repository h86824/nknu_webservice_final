
this.HS = this.HS || {};

(function(){
    function Card(id , sticker , matrix){
        createjs.Container.call(this);
        this.sticker = new createjs.Shape();
        this.information = {};
        this.information.id = id;
        
        image = HS.Global.Source.getResult(sticker);
        if(image){
            image.scaleX = HS.Global.ellipseStickerW / image.width ;
            image.scaleY = HS.Global.ellipseStickerH / image.height ;
            this.sticker.x = HS.Global.ellipseStickerX;
            this.sticker.y = HS.Global.ellipseStickerY;
            this.sticker.graphics.clear().beginBitmapFill(image, "no-repeat", matrix)
            .drawEllipse(0, 0, HS.Global.ellipseStickerW , HS.Global.ellipseStickerH );
        }else{
            this.sticker.x = HS.Global.ellipseStickerX;
            this.sticker.y = HS.Global.ellipseStickerY;
            this.sticker.graphics.clear().beginFill("#1565C0").drawEllipse(0, 0, HS.Global.ellipseStickerW , HS.Global.ellipseStickerH );
        }

        this.on("rollover" , (e) => { if(this.moveable && this.active) mouseOver(e) });
        this.on("rollout" , (e) => { if(this.moveable && this.active) mouseOut(e) });
        this.on("pressmove", (e) => { if(this.moveable && this.active) pressMove(e) });
        this.on("pressup", (e) => { if(this.moveable && this.active) pressUp(e) });
        this.on("mousedown" , (e) => { if(this.moveable && this.active) pressDown(e) });
        //this.snapToPixel = true;
        //this.cache(0, 0, image.width, image.height);

        let templateImg = HS.Global.Source.getResult("CardTemplate");
        this.template = new createjs.Shape(); 
        this.template.graphics.beginBitmapFill(templateImg, null, true, false).drawRect(0,0, templateImg.width, templateImg.height).endFill();
        this.template.scaleX = HS.Global.cardWidth / templateImg.width;
        this.template.scaleY = HS.Global.cardHeight / templateImg.height;

        this.costText = new createjs.Text("5", HS.Global.TextFontLarge, "#fff");
        this.costText.set({
            textAlign:"center",
            x: HS.Global.cardCostTextX,
            y: HS.Global.cardCostTextY,
            outline:false,
        });
        this.costTextOutline = new createjs.Text("5", HS.Global.TextFontLarge, "#20120c");
        this.costTextOutline.set({
            textAlign:"center",
            x: HS.Global.cardCostTextX,
            y: HS.Global.cardCostTextY,
            outline:HS.Global.outline,
        });

        this.atkText = new createjs.Text("15", HS.Global.TextFont, "#FFF");
        this.atkText.set({
            textAlign:"center",
            x: HS.Global.cardAtkTextX,
            y: HS.Global.cardAtkTextY
        });
        this.atkTextOutline = new createjs.Text("15", HS.Global.TextFont, "#20120c");
        this.atkTextOutline.set({
            textAlign:"center",
            x: HS.Global.cardAtkTextX,
            y: HS.Global.cardAtkTextY,
            outline:HS.Global.outline,
        });

        this.defText = new createjs.Text("15", HS.Global.TextFont, "#fff");
        this.defText.set({
            textAlign:"center",
            x: HS.Global.cardDefTextX,
            y: HS.Global.cardDefTextY,
            outline:false,
        });
        this.defTextOutline = new createjs.Text("15", HS.Global.TextFont, "#20120c");
        this.defTextOutline.set({
            textAlign:"center",
            x: HS.Global.cardDefTextX,
            y: HS.Global.cardDefTextY,
            outline:HS.Global.outline,
        });

        this.cardName = new createjs.Container();

        this.activeShape = new createjs.Shape();
        this.activeShape.graphics
        .setStrokeStyle(7)
        .beginStroke("#7CB342")
        .drawRoundRect(HS.Global.cardWidth * 0.05,  HS.Global.cardHeight * 0.1, HS.Global.cardWidth * 0.9 , HS.Global.cardHeight* 0.9 , 10);

        this.addChild(this.activeShape);
        this.addChild(this.sticker);
        this.addChild(this.template);
        this.addChild(this.costTextOutline);
        this.addChild(this.costText);
        this.addChild(this.atkTextOutline);
        this.addChild(this.atkText);
        this.addChild(this.defTextOutline);
        this.addChild(this.defText);
        //this.addChild(this.cardNameTextOutline);
        this.addChild(this.cardName);

        /*this.setAtk = setText(this.atkTextOutline , this.atkText);
        this.setDef = setText(this.defTextOutline , this.defText);
        this.setCost = setText(this.costTextOutline , this.costText);*/
        this.snapToPixel = true;
        //this.cache(0, 0, HS.Global.cardWidth , HS.Global.cardHeight);
        this.active = false;
    }

    Card.prototype = {
        moveable: true,
        onmoving: undefined,
        onmoved: undefined,
        fixX:0,
        fixY:0,
        information: undefined,
        getStageX : getStageX,
        getStageY : getStageY,
        set atk(value){
            setText(this , this.atkTextOutline , this.atkText)(value);
        } ,
        set cost(value){
            this._cost = value;
            setText(this , this.costTextOutline , this.costText)(value);
        } ,
        get cost(){
            return this._cost;
        },
        set def ( value ){
            setText(this , this.defTextOutline , this.defText)(value);
        },
        set name( value ){
            setName(this)(value);
        },
        set active(value){
            setActive(this)(value);
        },
        get active(){
            return this.isActive;
        },
        set isCardBack(value){
            this._isCardBack = value;
            if(this._isCardBack){
                let templateImg = HS.Global.Source.getResult("CardBack");
                this.active = false;
                this.sticker.visible = false;
                this.defTextOutline.visible = false;
                this.atkTextOutline.visible = false;
                if(templateImg){
                    this.template.graphics.clear().beginBitmapFill(templateImg, null, true, false).drawRect(0,0, templateImg.width, templateImg.height).endFill();
                    this.template.scaleX = HS.Global.cardWidth / templateImg.width ;
                    this.template.scaleY = HS.Global.cardHeight / templateImg.height ;
                }else{
                    this.sticker.graphics.beginFill("#1565C0").drawRoundRect(0 , 0 , HS.Global.cardWidth , HS.Global.cardHeight , 2);
                }
                this.setChildIndex( this.template , this.getNumChildren()-1);
            }
        },
        assignable: false,
    }

    function setText(self , ... targets){
        return function(value){
            targets.forEach( target =>
                target.text = value
            );
            //self.cache(0, 0, HS.Global.cardWidth , HS.Global.cardHeight);
        }
    }

    function pressMove( event ){
        let offsetX = getParent(event.currentTarget , "x");

        event.currentTarget.set({
            x: event.stageX - offsetX - HS.Global.cardWidth / 2,
            y: event.stageY - event.currentTarget.parent.y - HS.Global.cardHeight / 2
        });

        if(event.currentTarget.onmoving)
            event.currentTarget.onmoving(event);
    }

    function pressUp( event ){
        
        event.currentTarget.set({
            x: event.currentTarget.fixX,
            y: event.currentTarget.fixY,
            scaleX: 1,
            scaleY: 1,
        });

        if(event.currentTarget.onmoved){
            event.currentTarget.onmoved( event );
        }
    }

    function pressDown( event ) {
        event.currentTarget.fixX = event.currentTarget.x;
        event.currentTarget.fixY = event.currentTarget.y;
    }

    function getParent(item , property){
        if(!item.parent){
            return 0;
        }
        return item.parent[property] + getParent(item.parent , property);
    }

    function mouseOver(event){
        event.currentTarget.scaleX = event.currentTarget.scaleX * 1.045;
        event.currentTarget.scaleY = event.currentTarget.scaleY * 1.045;
        event.currentTarget.parent.setChildIndex(event.currentTarget , event.currentTarget.parent.getNumChildren()-1);
    }

    function mouseOut(event){
        event.currentTarget.scaleX = 1;
        event.currentTarget.scaleY = 1;
    }

    function getStageX(){
        return getParent(this , "x") + this.x;
    }

    function getStageY(){
        return getParent(this , "y") + this.y;
    }

    function setName(self){
        return function(name){
            if(name)
                for(let i = 0 ; i < name.length ; i++){
                    let locate = (name.length / 2 - i ) * 17 * HS.Global.cardNameScale;
                    let yOffset = - Math.sin(i * 0.4) * 6.5 * HS.Global.cardNameScale;

                    let cardNameText = new createjs.Text(name.charAt(i), HS.Global.TextFontSmall, "#fff");
                    cardNameText.set({
                        textAlign:"center",
                        x: HS.Global.cardNameTextX - locate,
                        y: HS.Global.cardNameTextY + yOffset,
                        outline:false,
                    });
                    let cardNameTextOutline = new createjs.Text(name.charAt(i), HS.Global.TextFontSmall, "#20120c");
                    cardNameTextOutline.set({
                        textAlign:"center",
                        x: HS.Global.cardNameTextX - locate,
                        y: HS.Global.cardNameTextY + yOffset,
                        outline:HS.Global.outline,
                    });
                    self.cardName.addChild(cardNameTextOutline , cardNameText );
                }
        }
    }

    function setActive(self){
        return function(value){
            self.isActive = value;
            if(self.isActive){
                self.activeShape.alpha = 0.85;
            }else{
                self.activeShape.alpha = 0;
            }
        }
    }

    extend(Card , createjs.Container);
    HS.Card = Card;
}());