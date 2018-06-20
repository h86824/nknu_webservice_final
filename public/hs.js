/*! webservicefinalproject 2018-06-20 */

this.HS = this.HS || {};

(function(){
    let socket;
    let battleField;
    let matchScreen;
    let stage;
    let playerId;
    var arrowsManager;
    
    function Core(){
        return {
            start: start
        };
    }

    function start(){
        socket = io('http://localhost:3000');
        stage = new createjs.Stage("battlefield");
        stage.enableMouseOver(10);
        createjs.Touch.enable(stage);
        
        let bgm = HS.BGM;
        bgm.start();

        socket.on('connect', function() {
            HS.MessageBox.hide();
        });

        socket.on('connect', function() {
            HS.MessageBox.hide();
        });
        
        socket.on('connect_error', function() {
            HS.MessageBox.show("連線中...");
        });

        socket.on('connecting', function() {
            HS.MessageBox.show("連線中...");
        });

        socket.on("disconnect", function(){
            HS.MessageBox.show("連線中斷");
            playerId = null;
            matchScreen.visible = true;
            battleField.visible = false;
        });

        socket.on('match', function (data) {
            handleAction(data);
        });
        
        battleField = new HS.BattleField();
        battleField.x = HS.Global.battleFieldX;
        battleField.y = HS.Global.battleFieldY;
        stage.addChild(battleField);
        battleField.visible = false;
        battleField.onendturn( ()=>{
            sendEndTurn();
        } );

        matchScreen = stage.addChild(new HS.MatchScreen());
        
        matchScreen.onmatch((deck) => {
            bgm.buttonClick();
            socket.emit("dual" , new HS.Action.Dual(deck.id));
            HS.MessageBox.show("配對中...");
        });
        socket.on('dual', function (data) {
            handleDualAction(data);
        });

        createjs.Ticker.addEventListener("tick", handleTick);
        createjs.Ticker.setFPS(63);
        createjs.Ticker.framerate = 63;

        fpsLabel = new createjs.Text("-- fps", "bold 18px Arial", "#0F0");
        stage.addChild(fpsLabel);
        fpsLabel.x = 10;
        fpsLabel.y = 10;

        arrowsManager = new HS.ArrowsManager();
        arrowsManager.handle(stage , battleField);
        arrowsManager.onassign( (from , to) => {
            console.log(new HS.Action.Attack( from.information.id , to.information.id) );
            socket.emit('match', new HS.Action.Attack( from.information.id , to.information.id) );
        });

        stage.addChild(HS.AlertBox);
        stage.addChild(HS.MessageBox);
    };

    HS.Core = Core;

    function handleTick(event) {
        stage.update();
        fpsLabel.text = "測試版 v0.2018061901\n"+
        "解析度 " + HS.Global.width + " x " + HS.Global.height + "\n"
        +Math.round(createjs.Ticker.getMeasuredFPS()) + " fps";
        if (!event.paused) {
        }
    }

    function handleDualAction(action){
        console.log(action);
        switch(action.type){
        case HS.Action.Type.Setting:
            HS.MessageBox.show("配對成功");
            playerId = action.player;
            matchScreen.visible = false;
            battleField.clear();
            battleField.visible = true;
            HS.MessageBox.hide();
            break;
        case HS.Action.Type.Disconnect:
            HS.Alert("對手離開");
            playerId = null;
            matchScreen.visible = true;
            battleField.visible = false;
            break;
        case HS.Action.Type.EndGame:
            if(action.player == playerId){
                HS.Anime.disappear(battleField.selfHero , () => {
                    HS.Alert("失敗");
                    setTimeout( () => {
                        playerId = null;
                        matchScreen.visible = true;
                        battleField.visible = false;
                    }, 1500);
                });
            }else{
                HS.Anime.disappear(battleField.opponentHero , () => {
                    HS.Alert("勝利");
                    setTimeout( () => {
                        playerId = null;
                        matchScreen.visible = true;
                        battleField.visible = false;
                    }, 1500);
                })
            }
            break;
        }
    }

    function handleAction(action){
        console.log(action);
        switch(action.type){
        case HS.Action.Type.Setting:
            handleSetting(action);
            break;
        case HS.Action.Type.Drainage:
            handleDrainage(action);
            break;
        case HS.Action.Type.Endturn:
            handleEndTurn(action);
            break;
        case HS.Action.Type.Discard:
            handleDiscard(action);
            break;
        case HS.Action.Type.Start:
            handleStart(action);
            break;
        case HS.Action.Type.Battlefield:
            handleAttack(action);
            break;
        case HS.Action.Type.Hero:
            handleHero(action);
            break;
        case HS.Action.Type.battleCry:
            handleBattleCry(action);
            break;
        }
    }

    function handleSetting(action){
        playerId = action.player;
    }

    let count = 0;
    function handleDrainage(action){
        count = action.id;
        if(playerId === action.player){
            if(!action.obj || !action.obj.cards){
                return;
            }
            HS.Alert("抽牌(" + action.obj.number  +")");
            
            action.obj.cards.forEach( cardInfo => {
                let card = HS.CardFactory.create(cardInfo.name, cardInfo.cardID );
                card.atk = cardInfo.originAtk;
                card.def = cardInfo.originDef;
                card.cost = cardInfo.cost;
                card.moveable = true;
                card.name = cardInfo.name;
                if(cardInfo.cost <= battleField.selfHero.crystal){
                    card.active = true;
                }
                battleField.selfHandArea.addCard(card);

                card.onmoving = function(event){
                    if(HS.Method.isSelfBattleArea(event.stageX , event.stageY)){
                        battleField.selfBattleArea.relocate(card.getStageX());
                    }else{
                        battleField.selfBattleArea.relocate();
                    }
                };

                card.onmoved = (function(event){
                    if(HS.Method.isSelfBattleArea(event.stageX , event.stageY)){
                        handleSelfDiscard(event);
                    }
                });
            })
            battleField.selfHero.rc = action.obj.rc;
            
        }else{
            HS.Alert("對方抽牌(" + action.obj.number  +")");
            for(let i =0 ; i < action.obj.number ; i++){
                let card = new HS.Card( -1 );
                card.isCardBack = true;
                battleField.opponentHandArea.addCard(card);
            }
            battleField.opponentHero.rc = action.obj.rc;
        }

    }

    function handleSelfDiscard(event){
        if(battleField.selfBattleArea.cards.length >= 7){
            battleField.selfBattleArea.relocate();
            return;
        }
        let card = event.currentTarget;
        
        /*battleField.selfHandArea.removeCard(card);
        battleField.selfBattleArea.addCard(card , battleField.selfBattleArea.getInsertIndex(event.stageX));
        card.moveable = false;
        card.assignable = true;*/
        console.log(new HS.Action.PlayCard(card.information.id , battleField.selfBattleArea.getInsertIndex(event.stageX)));
        socket.emit('match', new HS.Action.PlayCard(card.information.id , battleField.selfBattleArea.getInsertIndex(event.stageX)));
    }

    function handleDiscard(action){
        
        if(action.obj){
            let card = action.obj.card;

            if(action.player == playerId && card){
                let mycard = battleField.findCardWithId(card.cardID);
                battleField.selfHero.cristal = action.obj.crystal;
                if(mycard){
                    battleField.selfHandArea.removeCard(mycard);
                    battleField.selfBattleArea.addCard(mycard , action.obj.position);
                    mycard.cost = card.cost;
                    mycard.atk = card.newAtk;
                    mycard.def = card.newDef;
                    mycard.moveable = false;
                    mycard.assignable = true;
                    mycard.active = card.attackable;
                    mycard.yield();
                }
                battleField.selfHandArea.cards.forEach( card => {
                    if(card.cost <= battleField.selfHero.crystal){
                        card.active = true;
                    }else{
                        card.active = false;
                    }
                });
            }else if(action.player != playerId && card){
                let mycard = battleField.findCardWithId( -1 );
                battleField.opponentHandArea.removeCard(mycard);
                battleField.opponentHero.cristal = action.obj.crystal;
                if(mycard){
                    mycard = HS.CardFactory.create( card.name, card.cardID);
                    mycard.cost = card.cost;
                    mycard.atk = card.newAtk;
                    mycard.def = card.newDef;
                    mycard.name = card.name;
                    mycard.moveable = false;
                    mycard.assignable = false;
                    mycard.yield();
                    battleField.opponentBattleArea.addCard(mycard , card.position);
                }
            }
        }

    }

    function handleStart(action){
        if(action.player == playerId){
            HS.Alert("你的回合");
            battleField.btn.enable = true;
            battleField.selfHero.cristal = action.obj.crystal;
            battleField.setTimer( () => {
                sendEndTurn();
            } , 60);

            battleField.selfHandArea.cards.forEach( card => {
                if(card.cost <= battleField.selfHero.crystal){
                    card.active = true;
                }else{
                    card.active = false;
                }
            });
            battleField.selfBattleArea.cards.forEach( card => {
                card.active = true;
            });
        }else{
            HS.Alert("對方的回合");
            battleField.btn.enable = false;
            battleField.opponentHero.cristal = action.obj.crystal;
            battleField.selfHandArea.cards.forEach( card => {
                card.active = false;
            });
            battleField.selfBattleArea.cards.forEach( card => {
                card.active = false;
            });
        }
    }

    function handleEndTurn(event){
        console.log({type:HS.Action.endturn ,msg:"結束回合"});
        socket.emit('match',{type:HS.Action.endturn ,msg:"結束回合"})
    }

    function sendEndTurn(){
        socket.emit('match', new HS.Action.EndTurn() );
        battleField.stopTimer();
    }

    function handleAttack(action){
        if(action){
            let from = battleField.findCardWithId( action.from );
            let to = battleField.findCardWithId( action.to );
            if(from && to)
                HS.Anime.attack(from , to , () => {
                    action.obj.cards.forEach( item => {
                        let card = battleField.findCardWithId( item.cardID );
                        if(card){
                            if(item.newDef <= 0){
                                battleField.removeCard(card);
                            }
                        }
                    });
                    action.obj.cards.forEach( item => {
                        let card = battleField.findCardWithId( item.cardID );
                        if(card){
                            card.atk = item.newAtk;
                            card.def = item.newDef;
                            card.cost = item.cost;
                            card.active = item.attackable;
                        }
                    })
                });
            else{
                if(action.obj && action.obj.cards){
                    action.obj.cards.forEach( item => {
                        let card = battleField.findCardWithId( item.cardID );
                        if(card){
                            if(item.newDef <= 0){
                                battleField.removeCard(card);
                            }
                        }
                    });
                    action.obj.cards.forEach( item => {
                        let card = battleField.findCardWithId( item.cardID );
                        if(card){
                            card.atk = item.newAtk;
                            card.def = item.newDef;
                            card.cost = item.cost;
                            card.active = item.attackable;
                        }
                    });
                }
            }
        }
    }

    function handleHero(action){
        if(action.player == playerId){
            battleField.selfHero.information.id = action.obj.cardID;
            battleField.selfHero.hp = action.obj.newDef;
        }else if(action.player != playerId) {
            battleField.opponentHero.information.id = action.obj.cardID;
            battleField.opponentHero.hp = action.obj.newDef;
        }
    }

    function handleBattleCry(action){
        if(action.obj && action.obj.cards){
            let from = battleField.findCardWithId( action.from );
            
            action.obj.cards.forEach( item => {
                from.battleCry();
                let card = battleField.findCardWithId( item.cardID );
                let image = HS.Global.Source.getResult("FireBall");
                
                if(card){
                    HS.Anime.itemAttack(from , card , image , () => {
                        card.atk = item.newAtk;
                        card.def = item.newDef;
                        card.cost = item.cost;
                        card.active = item.attackable;
                        
                        if(card){
                            if(item.newDef <= 0){
                                battleField.removeCard(card);
                            }
                        }
                    });
                }
            });
/*
            action.obj.cards.forEach( item => {
                let card = battleField.findCardWithId( item.cardID );
                if(card){
                    if(item.newDef <= 0){
                        battleField.removeCard(card);
                    }
                }
            });*/
        }
    }

}());

function extend(child, supertype)
{
   child.prototype.__proto__ = supertype.prototype;
}

(function(){

    HS.Action = {
        setting: 0,
        drainage: 1,
        discard: 2,
        endturn:0
    };

}());;
this.HS = this.HS || {};

(function(){
    function Global(w , h){
        let width = w;
        let height = h;
        
        const cardWidth = width * 0.09;
        const cardHeight = height * 0.21;

        const percentBattleFieldWidth = 1;
        const percentBattleFieldHeight = 1;

        const percentHandArea = 0.45;
        const percentBattleArea = 0.55;

        const maxHandCard = 10;

        const battleFieldX = parseInt( width * ( 1 - percentBattleFieldWidth) );
        const battleFieldY = parseInt( height * ( 1 - percentBattleFieldHeight) );
        const battleFieldWidth = parseInt( width * percentBattleFieldWidth);
        const battleFieldHeight = parseInt( height * percentBattleFieldHeight);

        return {
            resize : function(w , h){
                HS.Global = Global(w,h);
                console.log(HS.Global);
            },

            focusing: undefined,
            
            width: width,
            height: height,

            battleFieldX: battleFieldX,
            battleFieldWidth: battleFieldWidth,

            battleFieldY: battleFieldY ,
            battleFieldHeight: battleFieldHeight,
            
            cardWidth: cardWidth,
            cardHeight: cardHeight,

            TextFontVerySmall: 85 * (width / 1920) + "% Warnock",
            TextFontSmall: 100 * (width / 1920) + "% Warnock",
            TextFont: 160 * (width / 1920) + "% Warnock",
            TextFontLarge: 180 * (width / 1920) + "% Warnock",
            TextFontVeryLarge: 210 * (width / 1920) + "% Warnock",
            TextFontHuge: 400    * (width / 1920) + "% Warnock",
            TextFontVeryHuge: 750 * (width / 1920) + "% Warnock",
            outline: 5 * (width / 1920),
            cardCostTextX: cardWidth * 0.15, 
            cardCostTextY: cardHeight * 0.115,
            cardAtkTextX: cardWidth * 0.15,
            cardAtkTextY: cardHeight * 0.89,
            cardDefTextX: cardWidth * 0.87,
            cardDefTextY: cardHeight * 0.89,
            cardNameTextX: cardWidth * 0.58,
            cardNameTextY: cardHeight * 0.53,
            cardNameScale: width / 1920,
            ellipseStickerX: cardWidth * 0.2,
            ellipseStickerY: cardHeight * 0.07,
            ellipseStickerW: cardWidth * 0.6 ,
            ellipseStickerH: cardHeight * 0.55 ,
            
            handCardDistance: parseInt( battleFieldWidth / 11.5) ,
            battleAreaCardDistance: parseInt( battleFieldWidth / 10) ,

            opponentHandAreaY: parseInt( battleFieldY  ),
            opponentBattleAreaY: parseInt( (percentHandArea / 2) * battleFieldHeight + battleFieldY  ),

            selfBattleAreaY:  parseInt( (percentHandArea / 2 + percentBattleArea / 2) * battleFieldHeight + battleFieldY  ),
            selfHandAreaY:  parseInt( (percentHandArea / 2 + percentBattleArea ) * battleFieldHeight + battleFieldY  ),

            handAreaWidth: battleFieldWidth,
            handAreaHeight: parseInt( height * percentHandArea / 2 ),

            battleAreaWidth: battleFieldWidth,
            battleAreaHeight: parseInt( height * percentBattleArea / 2 ),

            buttonWidth: width * 0.06,
            buttonHeight: width * 0.03,

            alertWidth: width * 0.4,
            alertHeight: height * 0.2,

            deckWidth: width * 0.07,
            deckHeight: height * 0.2,

            rate:  width/1920,
            imagePackageWidth: width * 0.05,
            imagePackageHeight: width * 0.05,
        }
    }

    HS.Global = Global(3840,2160);
}());;
this.HS = this.HS || {};

(function(){
    function Method(){
        return {
            isSelfBattleArea:isSelfBattleArea
        }
    };

    function isSelfBattleArea(x , y){
        return HS.Global.selfBattleAreaY < y 
            && HS.Global.selfHandAreaY > y 
            && HS.Global.battleFieldX < x 
            && HS.Global.width > x;
    }

    HS.Method = Method();
}());
this.HS = this.HS || {};

(function(){
    
    function MatchScreen(){

        createjs.Container.call(this);

        let background = new createjs.Shape();
        background.graphics.beginFill("#5C6BC0").drawRect(0, 0, HS.Global.width, HS.Global.height);
        background.alpha = 0.95;

        let matchBackgroundImg = HS.Global.Source.getResult("MatchBackground");
        let matchBackground = new createjs.Shape();
        matchBackground.graphics.beginBitmapFill(matchBackgroundImg).drawRect(0, 0, matchBackgroundImg.width, matchBackgroundImg.height);
        matchBackground.regX = matchBackgroundImg.width / 2;
        matchBackground.regY = matchBackgroundImg.height / 2;
        matchBackground.x = HS.Global.width / 2;
        matchBackground.y = HS.Global.height / 2;
        matchBackground.scaleX = matchBackground.scaleY = HS.Global.width / matchBackgroundImg.width  * 0.5;

        let text = new createjs.Text("Heart Stone", HS.Global.TextFontVeryHuge, "#E8EAF6");
        text.set({
            textAlign: "center",
            x:HS.Global.width * 0.5,
            y:HS.Global.height * 0.1
        });
        let textOutLine = text.clone();
        textOutLine.set({
            textAlign: "center",
            color:"#616161",
            outline:HS.Global.outline + 5,
        });

        let btn = new Button("開始配對");
        let deck = new HS.Deck();
        btn.x = HS.Global.width / 2 - btn.width / 2;
        btn.y = HS.Global.height * 0.8;
        btn.addEventListener("click" , () => {
            if(this._onmatch)
                this._onmatch( deck.getSelected() );
        })

        deck.x = HS.Global.width / 2;
        deck.y = HS.Global.height * 0.5;

        this.addChild(matchBackground);
        this.addChild(background);
        star(this);
        this.addChild(textOutLine);
        this.addChild(text);
        this.addChild(deck);
        this.addChild(btn);

        HS.Alert("歡迎來到心の石的世界");

        createjs.Ticker.addEventListener("tick", (event) => {
            matchBackground.rotation += 0.05;
        });

        this.onmatch = (onmatch) => {
            this._onmatch = onmatch;
        }

    }

    function Button(content){
        createjs.Container.call(this);
        let width = HS.Global.width * 0.3;
        let height = HS.Global.height * 0.1;
        let color = "#3949AB";
        let colorPress = "#3F51B5";
        this.width = width;
        this.height = height;
        this.background = new createjs.Shape();
        this.background.graphics.beginFill(color).drawRoundRect(0, 0, width, height , 10);
        this.background.alpha = 0.9;
        
        let text = new createjs.Text(content, HS.Global.TextFontHuge, "#fff");
        text.set({
            textBaseline: "middle",
            textAlign: "center",
            x:width / 2,
            y:height / 2,
            alpha: 0.9,
        });
        let textOutLine = text.clone();
        textOutLine.set({
            color:"#616161",
            outline:HS.Global.outline + 3,
        });

        this.addChild(this.background);
        this.addChild(this.textOutLine);
        this.addChild(text);

        this.on("mousedown" , () => {
            if(this.enable)
                this.background.graphics.clear().beginFill(colorPress).drawRoundRect(0, 0, width, height , 10);
        });
        this.on("click" , () => {
            if(this.enable){
                this.background.graphics.clear().beginFill(color).drawRoundRect(0, 0, width, height, 10);
            }
        });
        this.on("mouseout" , () => {
            if(this.enable)
                this.background.graphics.clear().beginFill(color).drawRoundRect(0, 0, width, height, 10);
        });
        this.enable = true;
    }

    function star(container){
        let holder = new createjs.Container();
        holder.x = HS.Global.width / 2;
        holder.y = HS.Global.height / 2;
        container.addChild(holder);

        createjs.Ticker.addEventListener("tick", (event) => {
            holder.rotation += 0.03;
            holder.children.forEach( item => {
                
                item.y += item.ySpeed + Math.random() * 0.1;
                item.x += item.xSpeed + Math.random() * 0.1;
                item.alpha = Math.sin( (item.alpha * 360 + 5) * 0.017453293 ) * 0.2 + 0.25;
                if(-item.x > holder.x || -item.y > holder.x ||item.y > holder.x ||　item.x > holder.x || Math.random() < 0.0001){
                    item.y = 0;
                    item.x = 0;
                }

            });
            if(holder.children.length < 750){
                var shape = new createjs.Shape();
                shape.alpha = Math.random();
                shape.graphics.clear().beginFill("#FFF").drawCircle(0 , 0 , (Math.random() * 3 + 1) * HS.Global.rate );
                shape.x = (Math.random() - 0.5) * HS.Global.deckWidth;
                shape.y = (Math.random() - 0.5) * HS.Global.deckWidth;
                shape.xSpeed = (Math.random() - 0.5) * 0.5 * HS.Global.rate;
                shape.ySpeed = (Math.random() - 0.5) * 0.5 * HS.Global.rate;
                holder.addChild(shape);
            }
        });
    }
    
    extend(Button , createjs.Container);
    extend(MatchScreen , createjs.Container);
    HS.MatchScreen = MatchScreen;
}());;
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
        .setStrokeStyle(8 * HS.Global.rate)
        .beginStroke("#7CB342")
        .drawRoundRect(HS.Global.cardWidth * 0.05,  HS.Global.cardHeight * 0.1, HS.Global.cardWidth * 0.9 , HS.Global.cardHeight* 0.9 , 22);

        this.cardContent = new createjs.Container();

        this.addChild(this.activeShape);
        this.addChild(this.sticker);
        this.addChild(this.template);
        this.addChild(this.costTextOutline);
        this.addChild(this.costText);
        this.addChild(this.atkTextOutline);
        this.addChild(this.atkText);
        this.addChild(this.defTextOutline);
        this.addChild(this.defText);
        this.addChild(this.cardContent);
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
        toTop: function(){
            this.parent.parent.setChildIndex(this.parent , this.parent.parent.getNumChildren()-3);
            this.parent.setChildIndex(this , this.parent.getNumChildren()-1);
        },
        set content(text){
            let cardContentText = new createjs.Text(text, HS.Global.TextFontVerySmall, "#fff");
            cardContentText.set({
                textAlign:"left",
                x: HS.Global.cardWidth * 0.2,
                y: HS.Global.cardHeight * 0.7,
                outline:false,
                lineWidth: HS.Global.cardWidth * 0.63,
                maxWidth: HS.Global.cardWidth * 0.63,
            });
            let cardContentTextOutline = cardContentText.clone();
            cardContentTextOutline.set({
                color:"#20120c",
                outline:HS.Global.outline - 1,
            });

            this.cardContent.removeAllChildren();
            this.cardContent.addChild(cardContentTextOutline);
            this.cardContent.addChild(cardContentText);
        },
        battleCry: function(){
            HS.BGM.play("launcher");
        },
        yield: function(){
            HS.BGM.play("playcard");
        }
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
        //event.currentTarget.stage.setChildIndex(event.currentTarget , event.currentTarget.stage.getNumChildren()-1);
        event.currentTarget.toTop();
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
}());;
this.HS = this.HS || {};

(function(){
    function Hero(){
        this._hp = 0;
        this.cristalList = [];
        this.information = {};
        createjs.Container.call(this);

        let template = new createjs.Shape();
        templateImage = HS.Global.Source.getResult("HeroTemplate");
        template.graphics.beginBitmapFill(templateImage, "no-repeat", true, false)
        .drawRect(0, 0, templateImage.width, templateImage.height);
        template.scaleY = template.scaleX = HS.Global.handCardDistance * 1.5 / templateImage.width;
        
        this.addChild(template);

        createjs.Ticker.addEventListener("tick", (event) => {
            if(!event.paused && this.cristalList.length){
                this.cristalList.forEach(cristal => {
                    cristal.rotation += 1 * (60 / createjs.Ticker.getMeasuredFPS());
                });
            }
        });

        this.hpText = new createjs.Text("HP: ", HS.Global.TextFont, "#E57373");
        this.hpText.set({
            textAlign:"left",
            x: HS.Global.handCardDistance * 0.55,
            y: HS.Global.handCardDistance * 0.50,
            outline:false,
        });
        this.hpTextOutLine = new createjs.Text("HP: ", HS.Global.TextFont, "#B71C1C");
        this.hpTextOutLine.set({
            textAlign:"left",
            x: HS.Global.handCardDistance * 0.55,
            y: HS.Global.handCardDistance * 0.50,
            outline:HS.Global.outline - 1,
        });

        this.mpText = new createjs.Text("MP: ", HS.Global.TextFont, "#64B5F6");
        this.mpText.set({
            textAlign:"left",
            x: HS.Global.handCardDistance * 0.55,
            y: HS.Global.handCardDistance * 0.70,
            outline:false,
        });
        this.mpTextOutLine = new createjs.Text("MP: ", HS.Global.TextFont, "#0D47A1");
        this.mpTextOutLine.set({
            textAlign:"left",
            x: HS.Global.handCardDistance * 0.55,
            y: HS.Global.handCardDistance * 0.70,
            outline:HS.Global.outline - 1,
        });

        this.rcText = new createjs.Text("RC: ", HS.Global.TextFont, "#BCAAA4");
        this.rcText.set({
            textAlign:"left",
            x: HS.Global.handCardDistance * 0.55,
            y: HS.Global.handCardDistance * 0.90,
            outline:false,
        });
        this.rcTextOutLine = new createjs.Text("RC: ", HS.Global.TextFont, "#0D47A1");
        this.rcTextOutLine.set({
            textAlign:"left",
            x: HS.Global.handCardDistance * 0.55,
            y: HS.Global.handCardDistance * 0.90,
            outline:HS.Global.outline - 1,
        });

        this.addChild(this.hpTextOutLine);
        this.addChild(this.hpText);
        this.addChild(this.mpTextOutLine);
        this.addChild(this.mpText);
        this.addChild(this.rcTextOutLine);
        this.addChild(this.rcText);
        this.cristal = 0;
        this.hp = 40;
    }

    Hero.prototype = {
        set hp(value){
            this._hp = value;
            this.hpTextOutLine.text = this.hpText.text = "HP: " + value;
        },
        set def(value){
            this.hp = value;
        },
        get def(){
            return this.hp;
        },
        set cristal(value){
            this._crystal = value;
            this.cristalList.forEach(cristal => {
                this.removeChild(cristal);
            })
            this.cristalList = [];
            this.mpTextOutLine.text = this.mpText.text = "MP: " + value;
            let centerX = HS.Global.handCardDistance * 1.5 / 2;
            let centerY = HS.Global.handCardDistance * 1.5 / 2;

            let rotation = 360 / value;
            for(let i = 0 ; i < value ; i++){
                let cristal = new createjs.Shape();
                cristal.graphics.beginFill("#0288D1").drawPolyStar(HS.Global.handCardDistance, HS.Global.handCardDistance, HS.Global.handCardDistance /4, 9, 0.3, 0);
                cristal.scaleX = 0.42;
                cristal.scaleY = 0.42;
                cristal.x = centerX;
                cristal.y = centerY;
                cristal.rotation = rotation * i;
                this.cristalList.push(cristal);
                this.addChild(cristal);
            }
            
        },
        get crystal(){
            return this._crystal;
        },
        set rc(value){
            this._rc = value;
            this.rcTextOutLine.text = this.rcText.text = "RC: " + value;
        },
    }
    
    extend(Hero , createjs.Container);
    HS.Hero = Hero;
}());;
this.HS = this.HS || {};

(function(){
    let stage;
    let backgroundContainer;

    function BattleField(){
        createjs.Container.call(this);
        
        backgroundContainer = new createjs.Container();
        this.addChild(backgroundContainer);
        setBackground();
        
        this.opponentHandArea = new HS.HandArea();
        this.opponentHandArea.alpha = 1;
        this.opponentHandArea.x = 0;
        this.opponentHandArea.y = HS.Global.opponentHandAreaY;
        this.addChild(this.opponentHandArea);

        this.opponentBattleArea = new HS.BattleArea();
        this.opponentBattleArea.x = 0;
        this.opponentBattleArea.y = HS.Global.opponentBattleAreaY;
        this.addChild(this.opponentBattleArea);

        this.selfBattleArea = new HS.BattleArea();
        this.selfBattleArea.x = 0;
        this.selfBattleArea.y = HS.Global.selfBattleAreaY;
        this.addChild(this.selfBattleArea);

        this.selfHandArea = new HS.HandArea();
        this.selfHandArea.x = 0;
        this.selfHandArea.y = HS.Global.selfHandAreaY;
        this.addChild(this.selfHandArea);

        this.opponentHandArea.alpha = this.selfHandArea.alpha = 0.98;
        this.selfBattleArea.alpha = this.opponentBattleArea.alpha = 0.95;

        this.opponentHero = new HS.Hero();
        this.opponentHandArea.hero = this.opponentHero ;

        this.selfHero = new HS.Hero();
        this.selfHandArea.hero = this.selfHero ;

        this.btn = new HS.Button("結束回合");
        this.btn.x = HS.Global.battleAreaWidth - HS.Global.buttonWidth;
        this.btn.y = HS.Global.selfBattleAreaY - HS.Global.buttonHeight / 2;
        this.addChild(this.btn);
        this.onendturn = ( cb ) => {
            this.btn.onclick( () => {
                cb();
            });
        };
        this.clear = clear;
        
        this.findCard = (target) => {
            for(let i = 0 ; i < this.selfBattleArea.cards.length ; i++){
                let pt = target.localToLocal( 0 , 0 , this.selfBattleArea.cards[i] );
                if( this.selfBattleArea.cards[i].hitTest(pt.x , pt.y) )
                    return this.selfBattleArea.cards[i];
            }
            for(let i = 0 ; i < this.opponentBattleArea.cards.length ; i++){
                let pt = target.localToLocal( 0 , 0 , this.opponentBattleArea.cards[i] );
                if( this.opponentBattleArea.cards[i].hitTest(pt.x , pt.y) )
                    return this.opponentBattleArea.cards[i];
            }
            let pt = target.localToLocal( 0 , 0 , this.opponentHero );
            if(this.opponentHero.hitTest(pt.x , pt.y)){
                return this.opponentHero;
            }
            pt = target.localToLocal( 0 , 0 , this.selfHero );
            if(this.selfHero.hitTest(pt.x , pt.y)){
                return this.selfHero;
            }
        }

        this.removeCard = ( card ) => {
            return this.selfBattleArea.removeCard(card) ||
             this.opponentBattleArea.removeCard(card) ||
             this.selfHandArea.removeCard(card) ||
             this.opponentHandArea.removeCard(card);
        }

        this.findCardWithId = ( id ) => {
            for(let i = 0 ; i < this.selfBattleArea.cards.length ; i++){
                if( this.selfBattleArea.cards[i].information.id == id )
                    return this.selfBattleArea.cards[i];
            }
            for(let i = 0 ; i < this.selfHandArea.cards.length ; i++){
                if( this.selfHandArea.cards[i].information.id == id )
                    return this.selfHandArea.cards[i];
            }
            for(let i = 0 ; i < this.opponentBattleArea.cards.length ; i++){
                if( this.opponentBattleArea.cards[i].information.id == id )
                    return this.opponentBattleArea.cards[i];
            }
            for(let i = 0 ; i < this.opponentHandArea.cards.length ; i++){
                if( this.opponentHandArea.cards[i].information.id == id )
                    return this.opponentHandArea.cards[i];
            }
            if(this.opponentHero.information.id == id){
                return this.opponentHero;
            }
            if(this.selfHero.information.id == id){
                return this.selfHero;
            }
        }

        let timerCircle = new createjs.Shape();
        timerCircle.x = this.btn.x - 38 * HS.Global.rate;
        timerCircle.y = this.btn.y + HS.Global.buttonHeight * 0.25 ;
        timerCircle.scaleX = HS.Global.rate;
        timerCircle.scaleY = HS.Global.rate;

        this.addChild(timerCircle);
        let listener;
        this.setTimer = ( ontime , sec ) => {
            sec = sec * 1000;
            now = new Date();
            timerCircle.visible = true;
            listener = createjs.Ticker.addEventListener("tick", () => {
                let time = new Date().getTime() - now.getTime();
                let angle = 360 - (time / sec * 360);
                timerCircle.graphics.clear().beginFill("#5C6BC0").arc(15, 15, 15, 0, angle * (Math.PI / 180), false).lineTo(15, 15).closePath();
                if(time > sec){
                    createjs.Ticker.removeEventListener( "tick" , listener );
                    timerCircle.visible = false;
                    if(ontime)
                        ontime();
                }
            });
        }

        this.stopTimer = () => {
            createjs.Ticker.removeEventListener( "tick" , listener );
            timerCircle.visible = false;
        }
    }

    function setBackground(){
        let backgroundImg = HS.Global.Source.getResult("Background");
        let background1_1 = new createjs.Shape(); 
        background1_1.graphics.beginBitmapFill(backgroundImg, null, true, false).drawRect(0,0, backgroundImg.width, backgroundImg.height).endFill();
        //background.template.scaleX = HS.Global.cardWidth / templateImg.width;
        background1_1.x = backgroundImg.width / 2;
        background1_1.scaleY = background1_1.scaleX = HS.Global.width * 0.33 / backgroundImg.width;
        background1_1.snapToPixel = true;
        background1_1.cache(0,0, backgroundImg.width, backgroundImg.height);
        background1_1.y = backgroundImg.height / 2;
        background1_1.regX = backgroundImg.width / 2;
        background1_1.regY = backgroundImg.height / 2;

        let background1_2 = background1_1.clone();
        background1_2.x = HS.Global.width - backgroundImg.width/2;
        background1_2.y = HS.Global.height - backgroundImg.height/2;
        
        backgroundImg = HS.Global.Source.getResult("Background2");
        let background2_1 = new createjs.Shape(); 
        background2_1.graphics.beginBitmapFill(backgroundImg, null, true, false).drawRect(0,0, backgroundImg.width, backgroundImg.height).endFill();
        background2_1.x = backgroundImg.width / 2;
        background2_1.scaleY = background2_1.scaleX = HS.Global.width * 0.25 / backgroundImg.width;
        background2_1.snapToPixel = true;
        background2_1.cache(0,0, backgroundImg.width, backgroundImg.height);
        background2_1.x = HS.Global.width * 0.6;
        background2_1.y = backgroundImg.height / 2.5;
        background2_1.regX = backgroundImg.width / 2;
        background2_1.regY = backgroundImg.height / 2;

        let background2_2 = background2_1.clone();
        background2_2.x = HS.Global.width * 0.4;
        background2_2.y = HS.Global.height - backgroundImg.height/2;

        backgroundImg = HS.Global.Source.getResult("Background3");
        let background3_1 = new createjs.Shape(); 
        background3_1.graphics.beginBitmapFill(backgroundImg, null, true, false).drawRect(0,0, backgroundImg.width, backgroundImg.height).endFill();
        background3_1.x = backgroundImg.width / 2;
        background3_1.scaleY = background3_1.scaleX = HS.Global.width * 0.25 / backgroundImg.width;
        background3_1.snapToPixel = true;
        background3_1.cache(0,0, backgroundImg.width, backgroundImg.height);
        background3_1.x = HS.Global.width;
        background3_1.y = backgroundImg.height / 2;
        background3_1.regX = backgroundImg.width / 2;
        background3_1.regY = backgroundImg.height / 2;

        let background3_2 = background3_1.clone();
        background3_2.x = 0;
        background3_2.y = HS.Global.height * 0.85;
        
        backgroundContainer.addChild(background1_1);
        backgroundContainer.addChild(background1_2);
        backgroundContainer.addChild(background2_1);
        backgroundContainer.addChild(background2_2);
        backgroundContainer.addChild(background3_1);
        backgroundContainer.addChild(background3_2);

        createjs.Ticker.addEventListener("tick", () => {
            let scale = (60 / createjs.Ticker.getMeasuredFPS());
            let rotation = 0.05 * scale;
            background1_1.rotation -= rotation;
            background1_2.rotation -= rotation;
            background2_1.rotation += rotation;
            background2_2.rotation += rotation;
            background3_1.rotation -= rotation;
            background3_2.rotation -= rotation;
        });
    }
    
    function clear(){
        this.opponentBattleArea.removeAllCard();
        this.selfBattleArea.removeAllCard();
        this.selfHandArea.removeAllCard();
        this.opponentHandArea.removeAllCard();

        this.opponentBattleArea.relocate();
        this.selfBattleArea.relocate();
        this.selfHandArea.relocate();
        this.opponentHandArea.relocate();

        HS.Anime.appear(this.opponentHero , () => {
            this.opponentHero.cristal = 0;
        });
        HS.Anime.appear(this.selfHero , () => {
            this.opponentHero.cristal = 0;
        });
    }

    BattleField.prototype = {
        opponentHandArea: undefined,
        selfHandArea: undefined,
        findCard:undefined,
        clear:undefined,
    }


    extend(BattleField , createjs.Container);
    HS.BattleField = BattleField;
}());;
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
        removeAllCard: removeAllCard
    }

    function addCard(item){
        if(! item instanceof HS.Card){
            throw HS.Error.TypeError("HS.Card" , "item");
        }
        this.addChild(item);
        this.cards.push(item);
        item.alpha = 0;
        this.relocate();
        HS.Anime.appear(item , ()=>{});
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

    function removeAllCard(){
        for(let i = 0 ; i < this.cards.length ; i++){
            this.removeChild(this.cards[i]);
        }
        this.cards.length = 0;
        this.relocate();
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
}());
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
        removeAllCard: removeAllCard
    }

    function addCard(item , index){
        if(! item instanceof HS.Card){
            throw HS.Error.TypeError("HS.Card" , "item");
        }
        
        this.cards.splice(index , 0 , item);
        
        this.addChild(item);
        item.alpha = 0;
        this.relocate();
        HS.Anime.appear(item , ()=>{});
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

    function removeAllCard(){
        for(let i = 0 ; i < this.cards.length ; i++){
            this.removeChild(this.cards[i]);
        }
        this.cards.length = 0;
        this.relocate();
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
}());
this.HS = this.HS || {};

(function(){
    let color = "#3949AB";
    let colorPress = "#3F51B5";

    function Button(content){
        createjs.Container.call(this);
        
        this.background = new createjs.Shape();
        this.background.graphics.beginFill(color).drawRoundRect(0, 0, HS.Global.buttonWidth, HS.Global.buttonHeight , 10);
        
        let text = new createjs.Text(content, HS.Global.TextFont, "#fff");
        text.set({
            textAlign: "center",
            x:HS.Global.buttonWidth / 2 * 1.05,
            y:HS.Global.buttonHeight / 2 * 0.6
        });
        this.textOutLine = new createjs.Text(content, HS.Global.TextFont, "#616161");
        this.textOutLine.set({
            textAlign: "center",
            x:HS.Global.buttonWidth / 2 * 1.05,
            y:HS.Global.buttonHeight / 2 * 0.6,
            outline:HS.Global.outline,
        });

        this.addChild(this.background);
        this.addChild(this.textOutLine);
        this.addChild(text);

        this.on("mousedown" , () => {
            if(this.enable)
                this.background.graphics.clear().beginFill(colorPress).drawRoundRect(0, 0, HS.Global.buttonWidth, HS.Global.buttonHeight , 10);
        });
        this.on("click" , () => {
            if(this.enable){
                HS.BGM.buttonClick();
                this.background.graphics.clear().beginFill(color).drawRoundRect(0, 0, HS.Global.buttonWidth, HS.Global.buttonHeight , 10);
                if(this._onclick)
                    this._onclick();
            }
                
        });
        this.on("mouseout" , () => {
            if(this.enable)
                this.background.graphics.clear().beginFill(color).drawRoundRect(0, 0, HS.Global.buttonWidth, HS.Global.buttonHeight , 10);
        });
        this.enable = true;
        this.onclick = (cb) => {
            this._onclick = cb;
        };
    }

    Button.prototype = {
        set enable(value){
            this._enable = value;
            if(value){
                this.textOutLine.color = "#20120c";
                this.background.graphics.clear().beginFill(color).drawRoundRect(0, 0, HS.Global.buttonWidth, HS.Global.buttonHeight , 10);
            }else{
                this.textOutLine.color = "#616161";
                this.background.graphics.clear().beginFill(colorPress).drawRoundRect(0, 0, HS.Global.buttonWidth, HS.Global.buttonHeight , 10);
            }
        },
        get enable(){
            return this._enable;
        }
    }

    extend(Button , createjs.Container);
    this.HS.Button = Button;
}());;
this.HS = this.HS || {};

(function(){

    function ArrowsManager(){
        let color = "#B71C1C";

        let arrowLine = new createjs.Shape();
        arrowLine.dash = arrowLine.graphics.sd([2,10], 0).command;
        arrowLine.graphics.ss(6,"round").s(color);
        arrowLine.start = arrowLine.graphics.mt(0,0).command;
        arrowLine.end = arrowLine.graphics.lt(100,100).command;

        let arrowHead = new createjs.Shape().set({rotation: 45});
        arrowHead.graphics.f(color).drawPolyStar(0,0,20,3);
        
        let stage;

        this.handle = (istage , battleField) => {
            stage = istage;
            let isDragging;

            stage.on("mousedown" , (event) =>{
                let item = event.target.parent;
                if(item instanceof HS.Card && item.active && item.assignable){
                    showArrow(item.getStageX() + HS.Global.cardWidth * 0.55 , item.getStageY() + HS.Global.cardHeight * 0.55);
                    isDragging = item;
                }

            });

            stage.on("pressmove" , (event) => {
                let item = event.target.parent;
                if(isDragging){
                    moveArrow(event.stageX , event.stageY);
                }
                else if(item instanceof HS.Card && item.active && item.assignable){
                    showArrow(item.getStageX() + HS.Global.cardWidth * 0.55 , item.getStageY() + HS.Global.cardHeight * 0.55);
                    isDragging = item;
                }

            });

            stage.on("pressup" , (event) => {
                if(isDragging){
                    removeArrow(event.stageX , event.stageY);
                    let target = battleField.findCard( arrowHead );
                    if(target){
                        this._onassign(isDragging , target);
                    }
                    isDragging = null;
                }
            });

            stage.on("mousemove" , (event) => {
                if(isDragging){
                    moveArrow(event.stageX , event.stageY);
                }
            });

            stage.on("click" , (event) => {
                if(isDragging){
                    removeArrow(event.stageX , event.stageY);
                    isDragging = null;
                    let target = battleField.findCard( arrowHead);
                    if(target){
                        this._onassign(isDragging , target);
                    }
                }
            });

            createjs.Ticker.on("tick", () => {
                if(isDragging){
                    arrowLine.dash.offset++;
                }
            });

            this.setArrow = (target) =>{
                isDragging = target;
            }
        }

        let showArrow = (x , y) => {
            arrowLine.start.x = arrowLine.end.x = x;
            arrowLine.start.y = arrowLine.end.y = y;
            moveArrow(x , y);
            stage.addChild(arrowLine,arrowHead);
        }

        let moveArrow = ( x , y ) => {
            arrowHead.x = arrowLine.end.x = x;
            arrowHead.y = arrowLine.end.y = y;
            
            let difX = arrowLine.end.x - arrowLine.start.x;
            let difY = arrowLine.end.y - arrowLine.start.y;
            arrowHead.rotation = Math.atan2(difY, difX) * 180/Math.PI;
        }

        let removeArrow = () => {
            stage.removeChild(arrowLine, arrowHead);
        }

        this.onassign = (assign) => {
            this._onassign = assign;
        }

    }

    HS.ArrowsManager = ArrowsManager;
}());
this.HS = this.HS || {};

(function(){
    let msgQueue = [];
    let _this;
    let runItem;

    function Alert(){
        createjs.Container.call(this);
        _this = this;
        
        let template1 = new createjs.Shape();
        template1.graphics.beginFill('#1A237E');
        template1.alpha = 1;
        template1.graphics.drawRoundRect(0, 0, HS.Global.alertWidth, HS.Global.alertHeight , 10);
        template1.graphics.endFill();

        let template2 = new createjs.Shape();
        template2.graphics.beginFill('#7986CB');
        template2.alpha = 1;
        template2.graphics.drawRoundRect(HS.Global.alertWidth * 0.01 , HS.Global.alertHeight * 0.02 , HS.Global.alertWidth * 0.98 , HS.Global.alertHeight * 0.96, 10);
        template2.graphics.endFill();

        let centerX = HS.Global.alertWidth / 2;
        let centerY = HS.Global.alertHeight / 2;

        this.messageText = new createjs.Text("", HS.Global.TextFontVeryLarge, "#FFF");
        this.messageText.set({
            textAlign:"center",
            textBaseline: "middle",
            x: centerX,
            y: centerY
        });
        this.messageOutline = new createjs.Text("", HS.Global.TextFontVeryLarge, "#20120c");
        this.messageOutline.set({
            textAlign:"center",
            textBaseline: "middle",
            x: centerX,
            y: centerY,
            outline:HS.Global.outline,
        });

        this.x = HS.Global.width / 2 - HS.Global.alertWidth / 2;
        this.y = HS.Global.height / 2 - HS.Global.alertHeight / 2;

        this.addChild(template1);
        this.addChild(template2);
        this.addChild(this.messageOutline);
        this.addChild(this.messageText);

        this.alpha = 0;
        //createjs.Tween.get(this).to({alpha:1}, 300).wait(1200).to({alpha:0}, 300).call(handleComplete);

        this.addMessage = addMessage;
    }

    function MessageBox(){
        createjs.Container.call(this);

        let template1 = new createjs.Shape();
        template1.graphics.beginFill('#1A237E');
        template1.alpha = 1;
        template1.graphics.drawRoundRect(0, 0, HS.Global.alertWidth, HS.Global.alertHeight , 10);
        template1.graphics.endFill();

        let template2 = new createjs.Shape();
        template2.graphics.beginFill('#7986CB');
        template2.alpha = 1;
        template2.graphics.drawRoundRect(HS.Global.alertWidth * 0.01 , HS.Global.alertHeight * 0.02 , HS.Global.alertWidth * 0.98 , HS.Global.alertHeight * 0.96, 10);
        template2.graphics.endFill();

        let centerX = HS.Global.alertWidth / 2;
        let centerY = HS.Global.alertHeight / 2;

        this.messageText = new createjs.Text("123", HS.Global.TextFontVeryLarge, "#FFF");
        this.messageText.set({
            textAlign:"center",
            textBaseline: "middle",
            x: centerX,
            y: centerY
        });
        this.messageText = new createjs.Container();
        this.messageOutline = new createjs.Text("123", HS.Global.TextFontVeryLarge, "#20120c");
        this.messageOutline.set({
            textAlign:"center",
            textBaseline: "middle",
            x: centerX,
            y: centerY,
            outline:HS.Global.outline,
        });

        this.x = HS.Global.width / 2 - HS.Global.alertWidth / 2;
        this.y = HS.Global.height / 2 - HS.Global.alertHeight / 2;
        this.addChild(template1);
        this.addChild(template2);
        //this.addChild(this.messageOutline);
        this.addChild(this.messageText);
        this.alpha = 0;
        this.false = true;
        this.show = (msg) => {
            this.messageText.removeAllChildren();
            let startX = HS.Global.alertWidth / 2 - HS.Global.alertWidth * 0.05 * (msg.length / 2);
            for(let i = 0 ; i < msg.length ; i++){
                let cardNameTextConatiner = new createjs.Container();

                cardNameTextConatiner.set({
                    x: startX + HS.Global.alertWidth * 0.05 * (i + 0.5),
                    y:HS.Global.alertHeight * 0.5
                });
                let cardNameText = new createjs.Text(msg.charAt(i), HS.Global.TextFontVeryLarge, "#fff");
                cardNameText.set({
                    textAlign:"center",
                    textBaseline:"middle",
                    outline:false,
                });
                let cardNameTextOutline = new createjs.Text(msg.charAt(i), HS.Global.TextFontVeryLarge, "#20120c");
                cardNameTextOutline.set({
                    textAlign:"center",
                    textBaseline:"middle",
                    outline:HS.Global.outline,
                });
                cardNameTextConatiner.addChild(cardNameTextOutline , cardNameText )
                this.messageText.addChild( cardNameTextConatiner );
            }
            let count = 0;
            createjs.Ticker.addEventListener("tick", (event) => {
                count = (count + 5) % 360;
                let temp = count;
                this.messageText.children.forEach( child => {
                    temp = (temp += 330) % 360;
                    let scale = 0.5 + Math.cos( temp * 0.017453293 ) * 0.03;
                    child.y = HS.Global.alertHeight * scale;
                });
            });

            this.visible = true;
            HS.BGM.message();
            createjs.Tween.get(this).to({alpha:0.8}, 300);
        }
        this.hide = () => {
            createjs.Tween.get(this).to({alpha:0 , visible: false}, 300);
        }
    }

    addMessage = ( msg ) => {
        msgQueue.push(msg);
        if(!runItem){
            runItem = setTimeout( () => handleComplete(), 0);
        }

    }

    function showMessage(msg){
        _this.messageText.text = msg;
        _this.messageOutline.text = msg;
        HS.BGM.alert();
        createjs.Tween.get(_this).to({alpha:1}, 300).wait(1200).to({alpha:0}, 300).call(handleComplete);
    }

    function handleComplete(){
        if(msgQueue.length){
            let msg = msgQueue[0];
            msgQueue.splice(0,1);
            showMessage(msg);
        }else{
            runItem = null;
        }
    }

    extend(Alert , createjs.Container);
    extend(MessageBox , createjs.Container);

    HS.AlertBox = new Alert();
    HS.Alert = HS.AlertBox.addMessage;
    HS.MessageBox = new MessageBox();
}());;
this.HS = this.HS || {};

(function(){

    function BGM(){
        let now = 1;
        let instance;
        let volume = 0.3;
        this.start = () => {
            this.play("sound2");
        }

        this.handleComplete = (event) => {
            now = Math.floor((Math.random() * 9) + 1);
            this.play("sound" + now);
        }

        this.play = (id) => {
            instance = createjs.Sound.play(id);  // play using id.  Could also use full sourcepath or event.src.
            instance.on("complete", this.handleComplete, this);
            instance.volume = volume;
        }

        this.buttonClick = () => {
            instance = createjs.Sound.play("buttonClick");
            instance.volume = 1;
        }

        this.alert = () => {
            instance = createjs.Sound.play("alert");
            instance.volume = 0.7;
        }

        this.message = () => {
            createjs.Sound.play("message");
        }

        this.attack = () => {
            createjs.Sound.play("attack");
        }

        this.play = (id) =>{
            createjs.Sound.play(id);
        }
        
    }

    HS.BGM = new BGM();
}());
this.HS = this.HS || {};

(function(){
    createjs.MotionGuidePlugin.install();
    function Anime(){
        this.attack = ( from , to , cb ) => {
            if(!from instanceof HS.Card){
                throw new HS.Error.TypeError("attacker" , "HS.Card");
            }
            if(!to instanceof HS.Card){
                throw new HS.Error.TypeError("defensor" , "HS.Card");
            }
            let fromTp = from.localToGlobal(from.x , from.y);
            let toTp = to.localToGlobal(to.x , to.y);

            let distanceX = fromTp.x - toTp.x;
            let distanceY = fromTp.y - toTp.y;

            let offset = from.globalToLocal( -distanceX + fromTp.x ,  - distanceY + fromTp.y);
            from.toTop();
            createjs.Tween.get(from, {override:true}).to({
                x: from.x,
                y: offset.y * 0.5
            } , 100).to({
                x: offset.x ,
                y: offset.y
            } , 50).call( HS.BGM.attack )
            .to({
                x: from.x ,
                y: from.y
            } , 150).call(cb);
        }

        this.disappear = ( target , cb ) => {
            if(!target instanceof HS.Card){
                throw new HS.Error.TypeError("attacker" , "HS.Card");
            }
            
            createjs.Tween.get(target, {override:true}).to({
                alpha:0
            } , 300).call(cb);
        }

        this.appear = ( target , cb ) => {
            if(!target instanceof HS.Card){
                throw new HS.Error.TypeError("attacker" , "HS.Card");
            }
            
            createjs.Tween.get(target, {override:true}).to({
                alpha:1
            } , 700).call(cb);
        }

        this.itemAttack = (from , to , item , cb) => {
            item = new HS.ImagePackage(item);
            if(!from instanceof HS.Card){
                throw new HS.Error.TypeError("attacker" , "HS.Card");
            }
            if(!to instanceof HS.Card){
                throw new HS.Error.TypeError("defensor" , "HS.Card");
            }
            let fromTp = from.localToGlobal(0 , 0);
            let toTp = to.localToGlobal(0 , 0);
            item.set({
                x: fromTp.x + HS.Global.cardWidth / 4,
                y: fromTp.y + HS.Global.cardHeight / 4
            })
            item.visibel = true;
            from.stage.addChild(item);
            let distanceX = fromTp.x - toTp.x;
            let distanceY = fromTp.y - toTp.y;

            let offset = {x: -distanceX + fromTp.x , y:  - distanceY + fromTp.y};

            createjs.Tween.get(item, {override:true}).to({
                x: offset.x + HS.Global.cardWidth / 4,
                y: offset.y + HS.Global.cardHeight / 4
            } , 300).wait(150).call(() => {
                HS.BGM.play("explosion");
                item.stage.removeChild(item);
            }).call(cb);
        }
    }

    HS.Anime = new Anime();
}());
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
}());;
this.HS = this.HS || {};

(function(){
    function ImagePackage(image){
        createjs.Shape.call(this);
        this.graphics.clear().beginBitmapFill(image, "no-repeat").drawRect(0,0,image.width , image.height);
        this.scaleX = HS.Global.imagePackageWidth / image.width;
        this.scaleY = HS.Global.imagePackageHeight / image.height;
    }

    extend(ImagePackage , createjs.Shape);

    HS.ImagePackage = ImagePackage;
}());this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function Ahri(id){
        HS.Card.call(this , id , 'CardAhri' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    Ahri.prototype = {
        
    }
    extend(Ahri , HS.Card);

        HS.Card.Ahri = Ahri;
    }());;this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function Annie(id){
        HS.Card.call(this , id , 'CardAnnie' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    Annie.prototype = {
        
    }
    extend(Annie , HS.Card);

        HS.Card.Annie = Annie;
    }());;this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function Ashe(id){
        HS.Card.call(this , id , 'CardAshe' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    Ashe.prototype = {
        
    }
    extend(Ashe , HS.Card);

        HS.Card.Ashe = Ashe;
    }());;this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function Azir(id){
        HS.Card.call(this , id , 'CardAzir' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    Azir.prototype = {
        
    }
    extend(Azir , HS.Card);

        HS.Card.Azir = Azir;
    }());;this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function Blitzcrank(id){
        HS.Card.call(this , id , 'CardBlitzcrank' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    Blitzcrank.prototype = {
        
    }
    extend(Blitzcrank , HS.Card);

        HS.Card.Blitzcrank = Blitzcrank;
    }());;this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function Braum(id){
        HS.Card.call(this , id , 'CardBraum' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    Braum.prototype = {
        
    }
    extend(Braum , HS.Card);

        HS.Card.Braum = Braum;
    }());;this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function Caitlyn(id){
        HS.Card.call(this , id , 'CardCaitlyn' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    Caitlyn.prototype = {
        
    }
    extend(Caitlyn , HS.Card);

        HS.Card.Caitlyn = Caitlyn;
    }());;this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function Camille(id){
        HS.Card.call(this , id , 'CardCamille' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    Camille.prototype = {
        
    }
    extend(Camille , HS.Card);

        HS.Card.Camille = Camille;
    }());;this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function CCLin(id){
        HS.Card.call(this , id , 'CardCCLin' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    CCLin.prototype = {
        
    }
    extend(CCLin , HS.Card);

        HS.Card.CCLin = CCLin;
    }());;this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function CPH(id){
        HS.Card.call(this , id , 'CardCPH' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    CPH.prototype = {
        
    }
    extend(CPH , HS.Card);

        HS.Card.CPH = CPH;
    }());;this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function DaMing(id){
        HS.Card.call(this , id , 'CardDaMing' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    DaMing.prototype = {
        
    }
    extend(DaMing , HS.Card);

        HS.Card.DaMing = DaMing;
    }());;this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function Darius(id){
        HS.Card.call(this , id , 'CardDarius' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    Darius.prototype = {
        
    }
    extend(Darius , HS.Card);

        HS.Card.Darius = Darius;
    }());;this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function DyMing(id){
        HS.Card.call(this , id , 'CardDyMing' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    DyMing.prototype = {
        
    }
    extend(DyMing , HS.Card);

        HS.Card.DyMing = DyMing;
    }());;this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function Flower(id){
        HS.Card.call(this , id , 'CardFlower' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    Flower.prototype = {
        
    }
    extend(Flower , HS.Card);

        HS.Card.Flower = Flower;
    }());;this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function GAYA(id){
        HS.Card.call(this , id , 'CardGAYA' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    GAYA.prototype = {
        
    }
    extend(GAYA , HS.Card);

        HS.Card.GAYA = GAYA;
    }());;this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function Haru(id){
        HS.Card.call(this , id , 'CardHaru' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    Haru.prototype = {
        
    }
    extend(Haru , HS.Card);

        HS.Card.Haru = Haru;
    }());;this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function HauShiang(id){
        HS.Card.call(this , id , 'CardHauShiang' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    HauShiang.prototype = {
        
    }
    extend(HauShiang , HS.Card);

        HS.Card.HauShiang = HauShiang;
    }());;this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function Jan(id){
        HS.Card.call(this , id , 'CardJan' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    Jan.prototype = {
        
    }
    extend(Jan , HS.Card);

        HS.Card.Jan = Jan;
    }());;this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function JianAn(id){
        HS.Card.call(this , id , 'CardJianAn' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    JianAn.prototype = {
        
    }
    extend(JianAn , HS.Card);

        HS.Card.JianAn = JianAn;
    }());;this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function JiungHan(id){
        HS.Card.call(this , id , 'CardJiungHan' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    JiungHan.prototype = {
        
    }
    extend(JiungHan , HS.Card);

        HS.Card.JiungHan = JiungHan;
    }());;this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function Justin(id){
        HS.Card.call(this , id , 'CardJustin' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    Justin.prototype = {
        
    }
    extend(Justin , HS.Card);

        HS.Card.Justin = Justin;
    }());;this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function Kuo(id){
        HS.Card.call(this , id , 'CardKuo' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    Kuo.prototype = {
        
    }
    extend(Kuo , HS.Card);

        HS.Card.Kuo = Kuo;
    }());;this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function Lily(id){
        HS.Card.call(this , id , 'CardLily' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    Lily.prototype = {
        
    }
    extend(Lily , HS.Card);

        HS.Card.Lily = Lily;
    }());;this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function LiWei(id){
        HS.Card.call(this , id , 'CardLiWei' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    LiWei.prototype = {
        
    }
    extend(LiWei , HS.Card);

        HS.Card.LiWei = LiWei;
    }());;this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function Maple(id){
        HS.Card.call(this , id , 'CardMaple' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    Maple.prototype = {
        
    }
    extend(Maple , HS.Card);

        HS.Card.Maple = Maple;
    }());;this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function Poo(id){
        HS.Card.call(this , id , 'CardPoo' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    Poo.prototype = {
        
    }
    extend(Poo , HS.Card);

        HS.Card.Poo = Poo;
    }());;this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function WinTingLee(id){
        HS.Card.call(this , id , 'CardWinTingLee' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    WinTingLee.prototype = {
        
    }
    extend(WinTingLee , HS.Card);

        HS.Card.WinTingLee = WinTingLee;
    }());;this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function Yee(id){
        HS.Card.call(this , id , 'CardYee' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    Yee.prototype = {
        
    }
    extend(Yee , HS.Card);

        HS.Card.Yee = Yee;
    }());;this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function Yo(id){
        HS.Card.call(this , id , 'CardYo' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    Yo.prototype = {
        
    }
    extend(Yo , HS.Card);

        HS.Card.Yo = Yo;
    }());;this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function YYT(id){
        HS.Card.call(this , id , 'CardYYT' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    YYT.prototype = {
        
    }
    extend(YYT , HS.Card);

        HS.Card.YYT = YYT;
    }());;
this.HS = this.HS || {};
this.HS.Action = this.HS.Action || {};

(function(){

    function Action(){

    }

    Action.prototype = {
        id : null,
        type : null,
        msg : null,
        obj : null,
        player : null,
        from : null,
        to : null,
    }

    let type = {
        Setting: 0,
        Drainage: 1,
        Discard:2,
        Endturn:3,
        Battlefield:4,
        Attack:5,
        Heropower:11,
        Hero:7,
        Dual:8,
        Start:9,
        Disconnect:10,
        EndGame:6,
        battleCry:12
    };    

    HS.Action.Action = Action;
    HS.Action.Type = type;
}());
this.HS = this.HS || {};
this.HS.Action = this.HS.Action || {};

(function(){
    function Dual( deckID ){
        HS.Action.Action.call(this);
        
        this.type = HS.Action.Type.Dual;
        this.obj={hero:'WinTingLee',deckID:deckID};
    }

    Dual.prototype = {
        
    }

    extend(Dual , HS.Action.Action);

    HS.Action.Dual = Dual;
}());;
this.HS = this.HS || {};
this.HS.Action = this.HS.Action || {};

(function(){
    function EndTurn(id ){
        HS.Action.Action.call(this);
        this.type = HS.Action.Type.Endturn;
    }

    EndTurn.prototype = {
        
    }

    extend(EndTurn , HS.Action.Action);

    HS.Action.EndTurn = EndTurn;
}());;
this.HS = this.HS || {};
this.HS.Action = this.HS.Action || {};

(function(){
    function PlayCard(id , position){
        HS.Action.Action.call(this);
        this.type = HS.Action.Type.Discard;
        this.obj = {
            cardID : id,
            position : position,
        };
    }

    PlayCard.prototype = {
        
    }

    extend(PlayCard , HS.Action.Action);

    HS.Action.PlayCard = PlayCard;
}());;this.HS = this.HS || {};
this.HS.Action = this.HS.Action || {};

(function(){
    function Attack(from,to){
        HS.Action.Action.call(this);
        
        this.type = HS.Action.Type.Attack;
        this.from=from;
        this.to=to;
    }

    Attack.prototype = {
        
    }

    extend(Attack , HS.Action.Action);

    HS.Action.Attack = Attack;
}());;
this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};

(function(){
    function TinLee(id){
        HS.Card.call(this , id , "CardSticker");
        
    }

    TinLee.prototype = {

    }

    extend(TinLee , HS.Card);

    HS.Card.TinLee = TinLee;
}());
;this.HS = this.HS || {};
this.HS.Card = this.HS.Card || {};
(function(){
    function CCLin(id){
        HS.Card.call(this , id , 'CardCCLin' , new createjs.Matrix2D(1,0,0,1,20,0));
    }
    CCLin.prototype = {
        
    }
    extend(CCLin , HS.Card);

        HS.Card.CCLin = CCLin;
    }());;
this.HS = this.HS || {};

this.HS.Error = this.HS.Error || {};

(function(){

    function HsTypeError(type , name){
        return new TypeError(name + " is not instance of " + type);
    }

    this.HS.Error.TypeError = HsTypeError;

}())
;
this.HS = this.HS || {};

(function(){
    function CardFactory(){
        this.create = (name , id) => {
            if(cardMap[name]){
                return new cardMap[name].class(id);
            }else{
                return new HS.Card(id);
            }
        }
    }

    let cardMap = 
        {
        阿璃:{name:"阿璃", class:HS.Card.Ahri},
        安妮:{name:"安妮", class:HS.Card.Annie},
        艾希:{name:"艾希", class:HS.Card.Ashe},
        阿祈爾:{name:"阿祈爾", class:HS.Card.Azir},
        布里茨:{name:"布里茨", class:HS.Card.Blitzcrank},
        布郎姆:{name:"布郎姆", class:HS.Card.Braum},
        凱特琳:{name:"凱特琳", class:HS.Card.Caitlyn},
        卡蜜兒:{name:"卡蜜兒", class:HS.Card.Camille},
        哲正:{name:"哲正", class:HS.Card.CCLin},
        CPH:{name:"CPH", class:HS.Card.CPH},
        高師許大銘:{name:"高師許大銘", class:HS.Card.DaMing},
        達瑞斯:{name:"達瑞斯", class:HS.Card.Darius},
        葉師傅:{name:"葉師傅", class:HS.Card.DyMing},
        花花:{name:"花花", class:HS.Card.Flower},
        師哥:{name:"師哥", class:HS.Card.GAYA},
        Haru:{name:"Haru", class:HS.Card.Haru},
        浩翔:{name:"浩翔", class:HS.Card.HauShiang},
        小詹:{name:"小詹", class:HS.Card.Jan},
        建安:{name:"建安", class:HS.Card.JianAn},
        煞氣a屁孩:{name:"煞氣a屁孩", class:HS.Card.JiungHan},
        爆肝王:{name:"爆肝王", class:HS.Card.Justin},
        家旭:{name:"家旭", class:HS.Card.Kuo},
        oo黑魔導oo:{name:"oo黑魔導oo", class:HS.Card.Lily},
        立偉:{name:"立偉", class:HS.Card.LiWei},
        張晉:{name:"張晉", class:HS.Card.Maple},
        大便:{name:"大便", class:HS.Card.Poo},
        溫聽力:{name:"溫聽力", class:HS.Card.WinTingLee},
        文義:{name:"文義", class:HS.Card.Yee},
        Yo:{name:"Yo", class:HS.Card.Yo},
        遠澤:{name:"遠澤", class:HS.Card.YYT},
    };

    extend(CardFactory , createjs.Shape);

    HS.CardFactory = new CardFactory();
}())
