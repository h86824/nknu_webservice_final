
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
        timerCircle.x = this.btn.x - 40;
        timerCircle.y = this.btn.y + HS.Global.buttonHeight * 0.25 ;

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
    }

    BattleField.prototype = {
        opponentHandArea: undefined,
        selfHandArea: undefined,
        findCard:undefined,
        clear:undefined,
    }


    extend(BattleField , createjs.Container);
    HS.BattleField = BattleField;
}());